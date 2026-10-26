# Agents for TrendSpider Hackathon

This file covers the agents and AI tools available inside TrendSpider that can be used to build, test, and refine entries for the 2026 hackathon (#TSBuild26).

Primary agent: **Sidekick**.

---

## Sidekick AI

Sidekick is TrendSpider’s built-in agent. It is not a general chatbot. It has access to TrendSpider’s data, charts, scanners, Strategy Tester, alerts, and Custom JS editor.

### Core capabilities relevant to the hackathon

- **Agentic coding** (most important for this event)
  - Takes control of the Custom JS indicator editor.
  - Breaks a natural-language request into steps.
  - Writes code, runs the indicator on a live chart, inspects the rendered output and logs, then self-corrects until the result matches the request.
  - Recommended model: Claude. Gemini and OpenAI models are also available.
  - Uses credits. Simple edits should stay on the free AI coding assistant.
  - Only works inside TrendSpider. Open the indicator in the Custom JS editor first if you want to edit an existing one.

- **Data access**
  - Price data across asset classes.
  - Options data (real-time OPRA where available).
  - Fundamentals, SEC filings, earnings transcripts, unusual options activity, seasonality, and more.
  - User charts, watchlists, and backtest results when requested.
  - No internet access. No external data unless pulled through Custom JS `request.http` or native options functions.

- **Automation**
  - Create and run scans.
  - Build and iterate strategies in the Strategy Tester.
  - Create alerts.
  - Manage watchlists.
  - Add basic chart annotations.
  - Deep Research mode: spawns sub-agents for multi-source questions.

- **Indicator support**
  - Can write full Custom JS indicators.
  - Can explain any indicator (right-click → explain).
  - Sees the live chart while coding, which is the main advantage over external coding agents.

### Official links

- Agentic coding overview: https://trendspider.com/blog/sidekick-agentic-coding/
- Sidekick help: https://help.trendspider.com/kb/sidekick-ai/trendspider-sidekick
- Prompting guide: https://help.trendspider.com/kb/sidekick-ai/sidekick-prompting-guide-1
- Product page: https://trendspider.com/product/sidekick-ai-trading-assistant/

---

## How to use Sidekick for the Expected-Move Edge indicator

Recommended workflow:

1. Open a new Custom JS indicator in TrendSpider.
2. Prompt Sidekick with a clear, step-by-step description that includes:
   - Use of native options functions (`request.options_schedule`, `request.options_data_for_all_expirations` or `request.options_data_for_expiration`).
   - Expected-move calculation method (ATM straddle or IV-based).
   - Visual output (cloud or band on chart).
   - `register_signal` so the result works in the scanner and Strategy Tester.
   - Include `#TSBuild26` in the description.
3. Let Sidekick build, render, and self-correct.
4. Test on liquid names (SPY, QQQ, AAPL, NVDA, etc.).
5. Manually refine if needed using the free AI coding assistant or direct edits.
6. Publish publicly to the TrendSpider Store.

Example prompt structure (adapt as needed):

```
Build a Custom JS indicator named "Move Edge".
Use request.options_schedule and request.options_data_for_all_expirations to compute the expected move from the nearest ATM straddle for the next 1–3 expirations.
Paint a cloud or band around price showing the expected move.
Register a signal when price is outside the expected-move band.
Make the description include #TSBuild26.
Test it on SPY and show the result.
```

---

## Other relevant tools

- **Free AI coding assistant** — For small edits and quick fixes. No credits. Use after Sidekick finishes the main build.
- **Strategy Tester** — Sidekick can build and iterate strategies that use the registered signal from the indicator.
- **Market Scanner** — Same registered signal can be used as a condition.
- **Options Map / Options Chain** — Native panels for manual inspection of the same data the indicator will use.

---

## Constraints and notes

- Sidekick agentic coding consumes credits. Plan usage.
- Options data requires the OPRA add-on for real-time access on many tickers.
- Native options functions (`request.options_*`) are preferred over external HTTP calls for reliability and speed.
- All entries must be public free indicators on the Store with `#TSBuild26` in the description.
- One script per entry, one entry per category.

Last updated: 2026-10-26. All information drawn from public TrendSpider documentation and blog posts. No invented capabilities.
