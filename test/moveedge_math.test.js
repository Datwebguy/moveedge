// Fixtures below are small hand-made chains used only to check the math. They are not market data.
const test = require('node:test');
const assert = require('node:assert');
const m = require('../src/moveedge_math');

const chain = {
  underlyingSymbolQuote: { lastPrice: 100 },
  resultByStrike: {
    90: { P: { l: 0.4, iv: 0.34, oi: 500, gg: 0.02 } },
    95: { C: { l: 5.4, iv: 0.26, oi: 300, gg: 0.04 }, P: { l: 0.9, iv: 0.3, oi: 1200, gg: 0.04 } },
    100: { C: { l: 2.0, iv: 0.25, oi: 2000, gg: 0.06 }, P: { l: 2.0, iv: 0.25, oi: 2500, gg: 0.06 } },
    105: { C: { l: 0.7, iv: 0.24, oi: 800, gg: 0.04 }, P: { l: 5.6, iv: 0.27, oi: 100, gg: 0.04 } },
    110: { C: { l: 0.3, iv: 0.24, oi: 400, gg: 0.02 } },
  },
};

test('straddle move uses nearest strike with both legs', () => {
  const r = m.expectedMoveFromStraddle(chain, 100.4);
  assert.strictEqual(r.strike, 100);
  assert.strictEqual(r.straddle, 4);
  assert.ok(Math.abs(r.move - 3.4) < 1e-9);
});

test('straddle skips strikes missing a leg', () => {
  assert.strictEqual(m.expectedMoveFromStraddle(chain, 110).strike, 105);
});

test('returns null when no strike has both legs', () => {
  const thin = { resultByStrike: { 100: { C: { l: 1 } } } };
  assert.strictEqual(m.expectedMoveFromStraddle(thin, 100), null);
  assert.strictEqual(m.expectedMoveFromStraddle({}, 100), null);
  assert.strictEqual(m.expectedMoveFromStraddle(null, 100), null);
});

test('iv-based move', () => {
  const r = m.expectedMoveFromIv(100, 0.25, 30);
  assert.ok(Math.abs(r - 100 * 0.25 * Math.sqrt(30 / 365)) < 1e-9);
  assert.strictEqual(m.expectedMoveFromIv(100, 0, 30), null);
});

test('skew is positive when puts are richer', () => {
  const s = m.skewScore(chain, 100, 0.05);
  assert.ok(s > 0);
  assert.strictEqual(m.leanFromSkew(s).lean, 'down');
});

test('lean is neutral and low on null or small skew', () => {
  assert.deepStrictEqual(m.leanFromSkew(null), { lean: 'neutral', conviction: 'low' });
  assert.strictEqual(m.leanFromSkew(0.01).lean, 'neutral');
  assert.strictEqual(m.leanFromSkew(-0.3).lean, 'up');
});

test('intensity strikes ranked inside the band only', () => {
  const r = m.intensityStrikes(chain, 95, 105, 2);
  assert.strictEqual(r.length, 2);
  assert.strictEqual(r[0].strike, 100);
  assert.ok(r.every((x) => x.strike >= 95 && x.strike <= 105));
});

test('agreement and confidence', () => {
  assert.strictEqual(m.agreement(3, 3), 1);
  assert.strictEqual(m.agreement(null, 3), null);
  assert.strictEqual(m.confidenceLabel(0.95, true), 'high');
  assert.strictEqual(m.confidenceLabel(0.8, true), 'medium');
  assert.strictEqual(m.confidenceLabel(0.95, false), 'low');
});
