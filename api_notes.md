# TrendSpider Custom JS — API Notes for Move Edge

Read from platform-docs.trendspider.com (api.md and limitations.md). Items marked (unconfirmed) were not stated in the docs and must be tested in TrendSpider.

## Structure
- Start with `describe_indicator(name, [type], metainfo)`; type is `'price'` (default, drawn on the chart) or `'lower'`. Move Edge is a `'price'` indicator.
- `input(title, default, options)` returns a number or string. Options are `{min, max}` or an array of choices. Boolean pattern: `input('Show strikes', 'Yes', ['Yes','No']) == 'Yes'`. The input name `offset` is reserved and shifts all lines forward.
- Every `request.*` function returns a Promise: use `await`. Results are the data or `{ error }`, so check `.error`.
- Same number of `paint()` calls on every execution. Do not call `paint()` in a loop unless the loop count is a hard-coded constant. Plan a fixed set of series (for example 2 expirations x 4 band lines plus 3 strike lines).

## Drawing
- `paint(series, params)` returns a line reference; params is an object (`style`: line, column, dotted, ladder, candles, bubble).
- `horizontal_line(value, fromIndex, toIndex)` makes a constant level; `series_of(value)` is a constant series.
- `fill(seriesId1, seriesId2, [color], [opacity], [title])` fills between two painted lines.
- `color_cloud(series1, series2, color1, color2, name1, name2, opacity)` fills between two series; color1 applies when series1 is above series2. Opacity defaults to 0.33.
- `paint_label_at_line(lineId, atIndex, text, attributes)` puts text on a painted line (attributes: color, background_color, border_*, halo, vertical_align). Not usable on `labels_above` / `labels_below` lines. This is the way to show "Lean: up (medium)" as a label.
- `paint_projection(values, params)` paints into future bars; maximum 100 values. This is the likely way to project the band forward if options data is a snapshot.
- `shift(series, offset)` moves a series forward (positive) or back (negative).

## Options data
- `request.options_schedule(ticker)`: list of expirations; each has `expiration.{day, month, year, code, dte, timestamp, schedule}` and `strikes`. No prices or open interest.
- `request.options_data_for_expiration(ticker, expiration, metrics)`: `expiration` is the YYMMDD code from the schedule. Returns `underlyingSymbolQuote` (example shows `lastPrice`) and `resultByStrike` with `C` and/or `P`. Strikes with no trading activity are omitted.
- `request.options_data_for_all_expirations(ticker, strikes, metrics, optionTypes)`: `strikes` = number above and below price (max 40); `optionTypes` is `C`, `P` or `all`. Preferred for 2 or more expirations. Returns `resultByExpiration` keyed by YYMMDD; whole expirations or strikes can be missing.
- Metrics: `l`, `b`, `a`, `bs`, `as`, `oi`, `oic`, `dvol`, `iv`, `gd`, `gg`, `gv`, `gt`, `gr`, `chg`, `chgp`. `dvol`, `oic` and `chg` are relative to the current trading day, which suggests current-session values.
- `options.compute_greeks(option_price, underlying_price, strike, days_to_expiration, option_type, [risk_free_rate])` returns `{iv, delta, gamma, vega, theta, rho}`; `option_type` is `'put'` or `'call'`; risk-free rate defaults to 0.04.
- Whether options data exists per historical bar is NOT documented (unconfirmed). Step 1 of `sidekick_prompts.md` tests it.

## Limits
- At most 6 `request.*` calls per script other than `request.history()` (16 for `request.history()` on chart indicators; 12 total combined). `request.http()` is capped at 6.
- At most 70 output series.
- A script runs once per chart plus one on Apply and on Save.
- A lower indicator with only color clouds cannot be painted (not relevant to a price-pane indicator).
- Execution time limits are not stated (unconfirmed).
- Design consequence: use `options_data_for_all_expirations` once (one call) instead of one call per expiration.

## Signals
- `register_signal(signal, name)`: `signal` is a series of truthy/falsy per candle; the series is never painted. Returns undefined.

## Move Edge design decisions that follow from this
- One `options_data_for_all_expirations` call (strikes ~15 each side, metrics `l`, `iv`, `oi`, `gg`) feeds everything.
- Pure math lives in `src/moveedge_math.js` and is tested offline with `npm test`. It is written so it can be pasted into the indicator. It follows the documented `resultByStrike` shape but has not run inside TrendSpider.
- Straddle-to-1-sigma factor 0.85 is a common rule of thumb, not a TrendSpider figure; state it in the description.

## Additions from the builder pack links (painting, additional series, examples)
Sources: the docs pages for painting, additional series and examples (all on TrendSpider's own docs site). The two builder-pack blog posts (AI coding of custom indicators; publishing to the Store) returned only titles when fetched, so their contents are unread: the owner should read them in the browser.

- `paint` styles also include `area`, `arearange`/`columnrange` (points `{high, low}`), `histogram`, `labels_above`/`labels_below` (strings or numbers, sparse with `null`; `fontSize` 10–25, `backgroundColor`, `backgroundOpacity`, `verticalOffset`). `arearange` with `{high, low}` points is a candidate for drawing the band as one series.
- `paint` takes a single color or an array of per-point colors; any CSS color works. `hidden: true` hides a painted line used only for `fill`.
- Offsets: `input('offset', n)` shifts all lines; `input('<linename>__offset', n)` shifts one line.
- `paint_projection(values, params)` or `paint_projection(lineId, values)` paints values after the last candle; the second form inherits that line's style. This is the planned way to project the band forward.
- Data that is not a time series (such as an options snapshot) must be placed onto candles yourself: `land_points_onto_series(times, values, time)` and `interpolate_sparse_series(...)`.
- Independent requests can run in parallel with `Promise.all`.
- Official example #10 ("UO volume at strike") paints horizontal levels at option strikes from `request.unusual_options(constants.ticker)`, thickness by contract volume. The page itself warns that `paint()` inside a loop is a poor approach and recommends painting a fixed number of the closest strikes. Move Edge's key-strike lines follow that advice (fixed top-N).
- Existing in the official docs, so not novel by itself: strike-level lines weighted by volume. Move Edge must differ through the band, the skew lean, the agreement/confidence reading and the signals.
