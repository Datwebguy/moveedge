# Inspiration Products (Prediction Market Hackathon Winners)

These are the real products and winners studied for pattern matching. We study how they work for the product approach (data → clearer edge/range → executable action). We do not reference or copy them in the TrendSpider build.

## 1. Synthedge (also referenced as SynthEdge)
- **Hackathon**: Synth Predictive Intelligence Hackathon 2026 (Best Equities Application, 1st place)
- **How it works**: Probabilistic trading terminal. Pulls Synth AI probability distributions (percentiles, not point estimates). Shows probability cones, regime detection, volatility analytics, Kelly sizing, and risk metrics. Users can execute directly on Hyperliquid equity/crypto perps. Loop: see edge → size → execute → monitor.
- **Website**: https://synthedge.xyz
- **GitHub**: https://github.com/londrwus/SynthEdge
- **Notes**: Also related Synth Overlay (Chrome extension for prediction markets, 1st in Prediction Markets track) and other Synth winners. Official announcement from @SynthdataCo.

## 2. Pyx
- **Hackathon**: Synth Predictive Intelligence Hackathon 2026 (Prediction Markets, 2nd place)
- **How it works**: Automated trading platform for Polymarket. Converts Synth percentile forecasts into live trades. Handles edge detection, Kelly sizing, order execution, and strategy scripting (Luau). Non-custodial (Turnkey). Users create tasks (copytrading or custom scripts) that run autonomously.
- **Website**: https://get-pyx.com / https://www.get-pyx.com
- **Docs**: https://get-pyx.com/docs
- **X**: @pyx_trade
- **Notes**: Focuses on full decision loop and automation.

## 3. Precognition (Prec0gnition)
- **Hackathon**: Waterloo CXC 2026 (Canada's largest student-run AI + Data Science Hackathon) — 2nd place overall + Best Use of Backboard.io
- **How it works**: Wallet-weighted probability engine for prediction markets (Polymarket). Ingests trade-level data, profiles wallets by historical accuracy (Brier score, calibration, etc.), infers current beliefs from trade sequences, and outputs a SmartCrowd / Precognition Probability (manipulation-aware) vs market probability. Includes confidence and disagreement scores.
- **Devpost**: https://devpost.com/software/precognition
- **Notes**: Skill-weighted signal instead of raw market price. LinkedIn posts confirm the win and approach.

## 4. Cobot
- **Hackathon**: Seedify Prediction Markets Hackathon (powered by BNB Chain) — Top 5 / 3rd place community/jury pick
- **How it works**: Mobile-first AI terminal / aggregator for prediction markets. Unifies Polymarket, Kalshi, Limitless, Myriad, Opinion, etc. into one place. AI signal detection, whale tracking, autonomous trading agents, and workflow builder. On-chain attestations.
- **Website**: https://cobot.gg
- **Notes**: Full command center with aggregation + automation. Seedify blog and X announcements confirm placement.

## 5. Capitola
- **Hackathon**: Solana Cypherpunk Hackathon (Colosseum) — 1st place Consumer Track
- **How it works**: Prediction markets meta-aggregator on Solana. Enables users to trade all events at the best price by aggregating across venues. Focus on best execution / meta view rather than single platform.
- **Related**: Capitola Labs / Vistadex (RFQ prediction markets platform). Colosseum portfolio and Arena listing.
- **Notes**: Meta-aggregation for clearer actionable view. Official Colosseum announcement.

## Pattern used for our idea
Common across these: take probabilistic or multi-source market data → produce a clearer edge, range, or skill-weighted signal → give the user something executable (signals, sizing, automation, scanner-like action).  
Mapped to TrendSpider via native options chain as the probabilistic source + register_signal() for execution in scanner/alerts/Strategy Tester.

No external dependencies or references will be used in the TrendSpider indicator.
