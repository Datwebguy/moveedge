# Move Edge — Store Description (draft)

Fill in the bracketed parts after testing. Do not add performance claims.

---

**Move Edge** shows where the options market expects price to go, directly on your chart.

It reads the live options chain for the symbol you are viewing and turns it into three things you can read at a glance:

1. **Expected-move bands.** An inner band (about 1 sigma) and an outer band for the nearest [1–3] expirations, built from the at-the-money straddle.
2. **A lean.** A plain label ("Lean: up / down / neutral", with low / medium / high conviction) from put-versus-call implied volatility skew. It stays neutral when the chain is too thin to say.
3. **Key strikes.** The strikes inside the band carrying the most open interest and gamma, drawn as thin lines, which often act as magnets or walls.

**Signals.** Move Edge registers "Move Edge Bullish" and "Move Edge Bearish" so you can use them in the Market Scanner, Alerts and the Strategy Tester. [One sentence defining each signal, once decided.]

**How to read it.** Price inside the inner band is in the normal expected range. Price near or beyond an edge means the move the market priced in is largely used. The lean and key strikes show which side the chain leans toward and where the heavy positioning sits.

**Inputs.** Number of expirations, band multiple, show/hide strikes, colors. Defaults work with no setup.

**Data.** Uses TrendSpider's native options data only. Real-time chain data depends on your options data access; if data is unavailable the indicator shows a message instead of plotting.

Open source, free. #TSBuild26
