# TrendSpider 2026 Developer Hackathon — Complete Reference

All information verified from official sources (trendspider.com/hackathon, official X posts, Google Forms, judging PDF link, Store). No invented details.

## Overview
- Official page: https://trendspider.com/hackathon
- Hashtag: #TSBuild26
- Total prizes: $25,000 in cash & prizes
- Sponsored by Clear Street (per Store collection)
- Build with Sidekick AI or your own JavaScript Custom JS. Publish public free indicator to TrendSpider Store.
- Discord: https://discord.gg/nsDgjRHCWY
- Contact for questions: adam@trendspider.net

## Schedule (as of latest official posts)
- Registration opens: September 1, 2026
- Registration closes: September 16, 2026
- Submission deadline: October 26, 2026 (extended; original was October 5)
- Winners announced: November 4, 2026 (live on X)
- Top 4 winners featured on Nasdaq Tower

## Tracks / Categories (identical prizes in each)
Enter once per category. Each script can only be submitted to one category.

1. **Best Buy/Sell Signal Indicator**  
   For indicators designed to generate clear buy and/or sell signals based on price action, momentum, trend, volume, or other technical inputs.

2. **Most Unique Options Indicator**  
   For indicators built specifically around options markets, options data, or options-derived metrics and plotted on the underlying asset’s chart.

3. **Best Fundamental Analysis Indicator**  
   For indicators that analyze company fundamental, financial, and economic data to help evaluate value, quality, growth, and risk in their businesses.

4. **Most Beautiful On-Chart Indicator**  
   For indicators that deliver a visually stunning, impressive, creative, and engaging experience for traders on their charts.

## Prizes (same for every track)
- **1st**: $1,500 cash + TrendSpider Enhanced (12 months, ~$1,600 value) + SignalStack Premium (12 months, ~$1,000 value)
- **2nd**: $750 cash + TrendSpider Premium (12 months, ~$1,200 value)
- **3rd**: $250 cash + TrendSpider Standard (12 months, ~$750 value)

## Entry Requirements
- Entries must be newly published. Previously published work outside of TrendSpider is allowed if republished fresh for this event.
- Include #TSBuild26 in the indicator’s description when publishing.
- All indicators must be public and free to apply in the TrendSpider Store (open source / published source code).
- Submit using the official competition form.
- One script, one entry (one category only).
- Registration form: https://docs.google.com/forms/d/e/1FAIpQLSdKGZF4WPaKkzArwxCkIQlrCHrIUEQMEKosfBfB5Rcqd0eCRw/viewform
- Submission form: https://docs.google.com/forms/d/e/1FAIpQLSdOi84k_GXCS3h-YxDqruye0uGAi6cqteRWK-QUoYx3VmItTA/viewform

## Judging
All entries reviewed by an internal panel. Top submissions selected by aggregate score; ties resolved by final internal vote.

**General criteria** (from official page):
- Visual Clarity: Is the idea easy to understand at a glance?
- Utility: Would this be genuinely useful in a real-market scenario?
- Execution: Does it function properly and run smoothly?
- Presentation: Is it clearly described and documented in the Marketplace?

**Detailed judging PDF**: https://drt8s3xkrl8yg.cloudfront.net/1/assets/pdf/hackathon/2026_How_You_Are_Judged.pdf

From available PDF content and category notes:
- Scoring: criteria scored 0–3, weighted, averaged across judges.
- **Best Buy/Sell Signal Indicator**:
  - Performance 70% (measured, not judged — same backtest, ranked on risk-adjusted return)
  - Signal Quality & Usability 30% (could a trader open the chart and act without asking what it means?)
  - Requirements: Long only. No short entries. Signals must alternate (buy, sell, buy, sell). No scaling. Must be runnable as a strategy. Register one buy and one sell signal using register_signal(), clearly named.
- **Most Unique Options Indicator**:
  - Options Insight 60% (does this reveal something genuinely useful about the options market, and is it novel?)
  - Execution 40% (is it clear, well built, and easy to read on a live chart?)
- Other tracks have their own weights (Fundamental and Beautiful follow similar clarity/utility focus).

## Tools Allowed
- TrendSpider Custom JS scripting (JavaScript)
- Sidekick AI (agentic coding, indicator building, chart awareness, etc.)
- Native data: price, options (request.options_* functions), fundamentals, alternative data, etc.
- No external dependencies required for core idea.

## Store Collection
- Hackathon entries: https://trendspider.com/trading-tools-store/collection/hackathon26/
- Official options examples already in Store: Expected Move from Options, Put/Call Ratio (use native options functions)

## Key Platform Resources
- Custom JS docs: https://charts.trendspider.com/scripting/docs/ and https://platform-docs.trendspider.com/scripting/docs/api.md
- Options functions: request.options_schedule(), request.options_data_for_expiration(), request.options_data_for_all_expirations(), options.compute_greeks(), options.compute_option_price()
- register_signal() for scanner/alerts/Strategy Tester
- Sidekick docs: https://help.trendspider.com/kb/sidekick-ai/trendspider-sidekick
- Options data note: Real-time OPRA requires paid add-on ($9.50/mo non-professional); functions are native.

## Our Target Track
**Most Unique Options Indicator** — Move Edge (options chain as live prediction proxy → band + bias + registered signals).
