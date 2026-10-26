# Move Edge — Improvements and Lessons

Internal planning notes. Closes the gaps found when checking the Move Edge idea against the hackathon requirements. Do not reference any inspiration product in the indicator, its description, or the Store listing.

## Scoring recap (Most Unique Options Indicator)
- Options Insight 60%: reveals something genuinely useful about the options market, and is novel. A score of 1 means "barely different from what already exists".
- Execution 40%: clear, well built, easy to read on a live chart.

## Gap 1 — Novelty (biggest risk)
The Store already has an official Expected Move from Options indicator, and TradingView has several GEX / expected-move level scripts. Most of those are fed by pasted data or computed off-platform. Move Edge computes everything natively from the live chain.

A plain ATM-straddle band is not enough. Move Edge must add:
1. **Chain-implied distribution, not a single number.** Show the 1-sigma band plus an outer band, per expiration (nearest 1–3), instead of one straddle value.
2. **Skew-derived bias.** Compare put and call IV at equidistant strikes (or delta-matched wings) to state a simple lean: up, down, or neutral. Skew is the chain's own "which side is priced as riskier" signal.
3. **Open-interest / gamma intensity strikes.** Mark the strikes with the heaviest `oi` and `gg` inside the band as magnets or walls. Use only metrics the API exposes (`oi`, `gg`, `iv`, `l`).
4. **Band-versus-price state.** Classify where price sits relative to the band (inside, near edge, outside) and how much of the expected move has already been used.
5. **Confidence.** Show how much the chain agrees with itself across expirations (do the bands nest consistently, is skew consistent). Hide the bias when the chain is thin.

## Gap 2 — Historical data unknown (test first)
The API docs do not say whether options data is available per bar or only as a current snapshot. Test on SPY, QQQ, AAPL, NVDA before designing around it.
- If snapshot only: draw the band as a forward-looking projection from the last bar (right edge), keep the bias and strike markers as chart-edge labels, and register signals only from values that exist on every candle (for example, price versus the current band) so `register_signal` never lacks a value.
- If per-bar data exists: draw a full historical band and make signals backtestable.
- The docs require the same number of `paint()` calls on every run. Fix the number of plotted series up front.

## Gap 3 — Signal logic (decide once)
Define each signal in one sentence before coding:
- Bullish: price is at or beyond the lower band edge, skew bias is up, and intensity strikes sit above price (mean-reversion into support).
- Bearish: the mirror image.
- Confirm direction (breakout versus mean reversion) by testing both in the Strategy Tester and keeping the one that is clearer to explain. Do not publish or quote any backtest numbers.

## Gap 4 — Robustness
- Handle missing data: strikes with no activity are omitted, either side (call or put) can be absent, whole expirations can be missing. Fall back gracefully, and show a short on-chart message when options data is unavailable (no OPRA add-on, no listed options).
- `strikes` max is 40 per side. Use only as many as needed.
- Inputs: expiration count, sigma multiple, show/hide strikes, colors. Keep defaults good enough that zero configuration looks right.
- Judges may lack the real-time OPRA add-on. The indicator must still load and explain itself.

## Gap 5 — Presentation (judged as clarity)
- The Store description should open with what the band means in plain language, then the bias, then the strikes, then how to use the signals. Include `#TSBuild26`.
- One screenshot on a liquid name showing band, bias label, and strikes.
- Never claim performance.

## What the study of prediction-market winners suggests
Studied from public repos and docs. Ideas only; their code is under a non-commercial source-available license and must not be copied.
- Show a **distribution, not a point estimate.** Percentile-style cones and explicit skew and tail metrics made the winners legible. Move Edge's equivalent is an inner and outer band built from the chain, with skew read from put/call IV.
- Reduce a distribution to a few **derived numbers a trader can act on**: a skew score ((upside − downside) / (upside + downside) of the band), a width relative to price, and a simple regime tag (tight, normal, wide). These are cheap to compute from chain data.
- **Conviction should be separate from direction.** Report a lean and how strongly the data supports it, and stay neutral when it doesn't.
- **Close the loop to action.** Winners paired every view with something executable. For Move Edge that is `register_signal` feeding the scanner, alerts and Strategy Tester.
- Keep a **plain-language label on the chart** (for example "Lean: up, conviction medium") so the idea is clear at a glance.

## Build order
1. Data-fetch test on liquid names (per-bar versus snapshot).
2. Band from straddle per expiration, plotted with `color_cloud`.
3. Skew bias and intensity strikes.
4. Signals, then check them in scanner and Strategy Tester.
5. Edge cases, defaults, Store description.
