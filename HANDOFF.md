# Move Edge — Handoff

Read this first if you are an agent picking up this repo.

## Identity and git rules (non-negotiable)
- The only author and contributor of this project is **datwebguy** (`princeabel2000@gmail.com`). Local git config in this repo is already set to that name and email.
- Do **not** add Claude (or any AI) as author or co-author. No `Co-Authored-By` or session-link trailers in commits, and no AI attribution in PR descriptions or in any file.
- Do not include a model name or identifier in commits, PRs or code comments.
- Develop and push on branch `ccr-8ca81067-wkzrz0`. Do not open a PR unless asked.

## What this is
**Move Edge** (one word pair, never "Expected Move Edge") is a TrendSpider Custom JS indicator for the TrendSpider 2026 Developer Hackathon (#TSBuild26), track **Most Unique Options Indicator**. It reads the live options chain and shows expected-move bands, an options-skew lean, and key open-interest/gamma strikes on the underlying's chart, and registers bullish/bearish signals with `register_signal`.

Judging for this track: Options Insight 60% (useful and novel; "barely different from what already exists" scores 1) and Execution 40% (clear, well built, easy to read). Entries must be public, free, open source, with `#TSBuild26` in the description, submitted through the official form.

## State (as of 2026-10-26)
- Registration form submitted by the owner; waiting for the builder pack by email (may confirm dates, rules and participant access).
- Docs written: `hackathon_reference.md`, `product_spec.md`, `agents.md`, `resources.md`, `inspiration_products.md`, `improvements.md`, `api_notes.md`, `sidekick_prompts.md`, `store_description_draft.md`.
- Offline math: `src/moveedge_math.js` with tests in `test/` (`npm test`, 8 passing). Uses hand-made fixtures only, not market data. Not yet run inside TrendSpider.
- **No indicator has been built or tested in TrendSpider yet.** Nothing is published.
- The owner has not confirmed whether they have a TrendSpider subscription or trial. Paid items: the platform (14-day trial exists), the real-time options data add-on, and Sidekick credits.

## Open questions (resolve by testing in TrendSpider)
1. Is options data a current snapshot or per-bar history? (`sidekick_prompts.md` Step 1.) This decides whether the band is a right-edge projection or a historical series.
2. Signal direction: mean reversion versus breakout. Define once, then test both in the Strategy Tester.
3. Real submission deadline and winner date. The judging PDF says Oct 5 / Oct 14; other sources say Oct 26 / Nov 4. The owner says the timeframe is not a concern.

## What you can and cannot do
- You can edit docs and the offline math, and keep them consistent.
- The TrendSpider indicator must be built by the owner inside TrendSpider (Sidekick or the Custom JS editor). Give them prompts and review what they paste back.
- Never state or invent performance or backtest numbers. Never copy code from other projects (the SynthEdge repo is source-available, non-commercial; ideas only, and no inspiration product may be referenced in the indicator or Store text).
- Nothing outward-facing (submitting forms, publishing to the Store, posting) without the owner's explicit say-so.

## Next steps
1. Owner reads the builder pack and settles access/pricing.
2. Owner runs Step 1 of `sidekick_prompts.md` on SPY, QQQ, AAPL, NVDA and reports the result.
3. Update the design in `improvements.md` and `api_notes.md` from that result.
4. Build Step 2 (bands, skew lean, strikes), then Step 3 (signals), reusing `src/moveedge_math.js`.
5. Finish `store_description_draft.md`, publish, submit.
