# Move Edge — Product Spec (for internal use)

## What it is
Custom JS indicator for the Most Unique Options Indicator track.

It treats the live options chain as a prediction of where price is expected to move. It draws an expected-move band (and optional high-intensity strikes) on the underlying chart, states a simple bias, and registers Buy/Sell signals via register_signal() so the same logic works in the Market Scanner, Alerts, and Strategy Tester.

## Why this idea
Mapped from the pattern in the prediction-market winners (Synthedge, Pyx, Precognition, Cobot, Capitola): take probabilistic/multi-source data → clearer edge or range → something the user can execute.

On TrendSpider the native options functions are the equivalent probabilistic source. register_signal() is the execution primitive.

## Smallest version that proves the full journey
1. Fetch front options data with request.options_schedule + request.options_data_for_all_expirations (or for_expiration).
2. Compute a simple expected-move band from ATM straddle or near-the-money strikes.
3. Overlay the band on the chart with paint / color_cloud.
4. Define a clear condition (e.g. price outside band + intensity supports bias).
5. register_signal() for bullish and bearish.
6. Confirm it appears in scanner and Strategy Tester.

## Requirements alignment
- Track: Most Unique Options Indicator
- Submission: public free indicator with #TSBuild26, official form
- Judging: Visual Clarity (band + bias) + Utility (registered signals) + Execution
- Tools: only native request.options_* and register_signal()
- No external APIs, no hard-coded data

## What we will not do
- Reference any of the inspiration products
- Use external data sources
- Build pure visual without signals
- Invent metrics or backtest numbers

## Next
Run the minimal data-fetch test on liquid names, then the signal test. If both pass, polish visual and Store description.
