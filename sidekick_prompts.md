# Move Edge — Sidekick Prompts

Run these in order inside TrendSpider. Open a new Custom JS indicator first, then open Sidekick (agentic coding, Claude model recommended). Do not publish anything until Step 4.

## Step 1 — Data-fetch test (answers: per-bar or snapshot?)
Test on SPY first, then QQQ, AAPL, NVDA.

```
Build a throwaway Custom JS indicator named "Move Edge Data Test". It is a test only, not for publishing.

1. Call request.options_schedule for the chart's ticker and log the first 3 expirations (code and dte).
2. Call request.options_data_for_all_expirations with 5 strikes above and below price, optionTypes "all", metrics ["l","iv","oi","gd","gg"].
3. For the nearest expiration, find the ATM call and ATM put, and log their last price (l) and iv, and the ATM straddle price (call l + put l).
4. Log the shape of what comes back: is it a single snapshot for right now, or a value per candle? Check whether anything changes if I scroll back to older bars or change timeframe.
5. Draw one horizontal band on the chart at price +/- the ATM straddle, using color_cloud, and paint a label with the straddle value.
6. If any piece of data is missing (no ATM strike, missing call or put, no expiration), log which piece instead of erroring.

Tell me at the end, in plain words: was the options data a current snapshot or per-bar history, and which parts worked or failed.
```

Write down the answer. It decides the design:
- Snapshot only: the band projects forward from the last bar. Signals use price versus the current band.
- Per-bar: a full historical band is possible.

## Constraints to tell Sidekick (from api_notes.md)
- Start with describe_indicator(name) as a price-pane indicator.
- Every request.* call must be awaited, and the result checked for an error.
- Use one request.options_data_for_all_expirations call, not one per expiration (max 6 request calls per script).
- Use a fixed number of paint() calls on every run, never a variable-length loop.
- Use paint_label_at_line for the "Lean" label and paint_projection (max 100 values) to project forward if data is a snapshot.

## Step 2 — Move Edge core (band + skew + strikes)
Paste after Step 1 passes. Adjust the first paragraph to match what Step 1 found.

```
Build a Custom JS indicator named "Move Edge" using only native request.options_* functions (no external data).

For the nearest 1 to 3 expirations (input, default 2):
- Compute the expected move from the ATM straddle. Draw an inner band (1 sigma) and an outer band (input multiple, default 2) with color_cloud.
- Compute skew: put IV minus call IV at equidistant strikes from price. Show a plain label on the chart: "Lean: up / down / neutral" plus a conviction word (low / medium / high). Stay neutral when data is thin.
- Mark the strikes inside the band with the highest open interest and gamma as thin horizontal lines (input to show or hide).
- Keep the same number of paint() calls on every run.
- If options data is missing or unavailable, show a short on-chart message instead of erroring.
- Include sensible defaults so it looks right with zero configuration.
Test on SPY and show me the result.
```

## Step 3 — Signals
```
Add register_signal for Move Edge.
- Bullish: price at or beyond the lower band edge, lean is up, and heavy strikes sit above price.
- Bearish: the mirror image.
- Name them clearly ("Move Edge Bullish", "Move Edge Bearish").
- Make sure they produce a value on every candle.
Then show me the bullish signal working as a condition in the Market Scanner and in the Strategy Tester. Do not report or quote performance numbers.
```

## Step 4 — Publish
- Description: plain-language meaning of the band, then the lean, then the strikes, then how to use the signals. Include `#TSBuild26`.
- Publish publicly and free, with source code visible.
- Submit with the official submission form, choosing Most Unique Options Indicator.
