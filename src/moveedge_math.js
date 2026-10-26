// Move Edge: pure option-chain math, no TrendSpider calls.
// Input chain shape follows request.options_data_for_expiration:
//   { underlyingSymbolQuote: { lastPrice }, resultByStrike: { "<strike>": { C: {l, iv, oi, gg, ...}, P: {...} } } }
// Either side of a strike can be absent. Every function returns null when data is too thin.

const STRADDLE_TO_1SD = 0.85; // common rule of thumb: 1-sigma move ~ 0.85 x ATM straddle

function strikesOf(chain) {
  if (!chain || !chain.resultByStrike) return [];
  return Object.keys(chain.resultByStrike)
    .map(Number)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
}

function nearestStrike(strikes, target, predicate) {
  let best = null;
  for (const k of strikes) {
    if (predicate && !predicate(k)) continue;
    if (best === null || Math.abs(k - target) < Math.abs(best - target)) best = k;
  }
  return best;
}

const has = (leg, field) => leg && typeof leg[field] === 'number' && Number.isFinite(leg[field]) && leg[field] > 0;

// ATM straddle price and the 1-sigma move derived from it.
function expectedMoveFromStraddle(chain, spot) {
  const strikes = strikesOf(chain);
  const both = (k) => {
    const row = chain.resultByStrike[String(k)];
    return row && has(row.C, 'l') && has(row.P, 'l');
  };
  const k = nearestStrike(strikes, spot, both);
  if (k === null) return null;
  const row = chain.resultByStrike[String(k)];
  const straddle = row.C.l + row.P.l;
  return { strike: k, straddle, move: straddle * STRADDLE_TO_1SD };
}

// Cross-check: 1-sigma move from ATM implied vol and days to expiration.
function expectedMoveFromIv(spot, atmIv, dte) {
  if (!(spot > 0) || !(atmIv > 0) || !(dte > 0)) return null;
  return spot * atmIv * Math.sqrt(dte / 365);
}

function atmIv(chain, spot) {
  const strikes = strikesOf(chain);
  const k = nearestStrike(strikes, spot, (s) => {
    const row = chain.resultByStrike[String(s)];
    return row && (has(row.C, 'iv') || has(row.P, 'iv'));
  });
  if (k === null) return null;
  const row = chain.resultByStrike[String(k)];
  const ivs = [row.C, row.P].filter((leg) => has(leg, 'iv')).map((leg) => leg.iv);
  return ivs.reduce((a, b) => a + b, 0) / ivs.length;
}

// Put IV minus call IV at equal moneyness distance, scaled by ATM IV.
// Positive = puts priced richer (downside priced as riskier).
function skewScore(chain, spot, wing = 0.05) {
  const strikes = strikesOf(chain);
  const base = atmIv(chain, spot);
  if (!base) return null;
  const putK = nearestStrike(strikes, spot * (1 - wing), (k) => k < spot && has(chain.resultByStrike[String(k)].P, 'iv'));
  const callK = nearestStrike(strikes, spot * (1 + wing), (k) => k > spot && has(chain.resultByStrike[String(k)].C, 'iv'));
  if (putK === null || callK === null) return null;
  const putIv = chain.resultByStrike[String(putK)].P.iv;
  const callIv = chain.resultByStrike[String(callK)].C.iv;
  return (putIv - callIv) / base;
}

function leanFromSkew(score, threshold = 0.05) {
  if (score === null || score === undefined) return { lean: 'neutral', conviction: 'low' };
  const mag = Math.abs(score);
  if (mag < threshold) return { lean: 'neutral', conviction: 'low' };
  const lean = score > 0 ? 'down' : 'up';
  return { lean, conviction: mag > threshold * 3 ? 'high' : mag > threshold * 2 ? 'medium' : 'low' };
}

// Strikes inside [lo, hi] ranked by combined open interest weighted by gamma.
function intensityStrikes(chain, lo, hi, topN = 3) {
  const out = [];
  for (const k of strikesOf(chain)) {
    if (k < lo || k > hi) continue;
    const row = chain.resultByStrike[String(k)];
    let score = 0;
    for (const leg of [row.C, row.P]) {
      if (has(leg, 'oi')) score += leg.oi * (has(leg, 'gg') ? leg.gg : 1);
    }
    if (score > 0) out.push({ strike: k, score });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, topN);
}

// 1.0 = both estimates agree; falls toward 0 as they diverge. Null if either is missing.
function agreement(a, b) {
  if (!(a > 0) || !(b > 0)) return null;
  return Math.min(a, b) / Math.max(a, b);
}

function confidenceLabel(agree, skewKnown) {
  if (agree === null || !skewKnown) return 'low';
  return agree > 0.9 ? 'high' : agree > 0.75 ? 'medium' : 'low';
}

module.exports = {
  STRADDLE_TO_1SD,
  expectedMoveFromStraddle,
  expectedMoveFromIv,
  atmIv,
  skewScore,
  leanFromSkew,
  intensityStrikes,
  agreement,
  confidenceLabel,
};
