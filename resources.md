# Resources, Tools, and Platform Primitives

Verified links and capabilities only. No mock data.

## Official Hackathon
- Main page: https://trendspider.com/hackathon
- Judging PDF: https://drt8s3xkrl8yg.cloudfront.net/1/assets/pdf/hackathon/2026_How_You_Are_Judged.pdf
- Discord: https://discord.gg/nsDgjRHCWY
- Registration form: https://docs.google.com/forms/d/e/1FAIpQLSdKGZF4WPaKkzArwxCkIQlrCHrIUEQMEKosfBfB5Rcqd0eCRw/viewform
- Submission form: https://docs.google.com/forms/d/e/1FAIpQLSdOi84k_GXCS3h-YxDqruye0uGAi6cqteRWK-QUoYx3VmItTA/viewform
- Store hackathon collection: https://trendspider.com/trading-tools-store/collection/hackathon26/

## Custom JS Scripting
- Intro / docs: https://charts.trendspider.com/scripting/docs/
- Full API: https://platform-docs.trendspider.com/scripting/docs/api.md
- Limitations: https://charts.trendspider.com/scripting/docs/limitations.md
- Help: https://help.trendspider.com/kb/indicators/custom-indicators-js-scripting
- Capabilities: https://trendspider.com/developers/capabilities/
- Examples: https://trendspider.com/developers/examples/

### Key functions for our idea
- request.options_schedule(ticker)
- request.options_data_for_expiration(ticker, expiration, metrics)
- request.options_data_for_all_expirations(ticker, strikes, metrics, optionTypes) — max strikes 40
- options.compute_greeks(...)
- options.compute_option_price(...)
- register_signal(series, name)
- paint(), color_cloud(), input(), etc.

Supported metrics example: oi, l, iv, gd (delta), gg (gamma), etc.

## Sidekick AI
- Help: https://help.trendspider.com/kb/sidekick-ai/trendspider-sidekick
- Prompting guide: https://help.trendspider.com/kb/sidekick-ai/sidekick-prompting-guide-1
- Product page: https://trendspider.com/product/sidekick-ai-trading-assistant/
- Prompt bank: https://trendspider.com/sidekick-prompt-bank/
- Agentic coding: Sidekick can open the editor, build step-by-step, render, and self-correct.
- Can build custom indicators, scanners, strategies, alerts. Sees chart, data, backtests.

## Options Data
- Official blog / announcement: real-time options data inside TrendSpider (OPRA).
- Store examples already using it: Expected Move from Options, Put/Call Ratio.
- Data note: Real-time requires OPRA add-on.

## Inspiration Study Links (do not reference in build)
See inspiration_products.md for full list.
- Synthedge: https://synthedge.xyz | https://github.com/londrwus/SynthEdge
- Pyx: https://get-pyx.com
- Precognition: https://devpost.com/software/precognition
- Cobot: https://cobot.gg
- Capitola: Colosseum listing / @capitola_xyz

## Other Useful
- TrendSpider Store: https://trendspider.com/trading-tools-store/
- Options tools category: https://trendspider.com/trading-tools-store/category/options-tools/
- Custom indicator editor AI button / Ctrl+K for Claude assistance.
