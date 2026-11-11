# EvolveX Development Roadmap

> **Reactive Omni Buildathon Milestones**

---

## Phase 1: Repository Foundation & Core Architecture *(Current)*
- [x] Monorepo workspace configuration (pnpm, TypeScript strict mode, shared packages).
- [x] Next.js 15 minimal dark-themed dashboard with Wagmi & Viem.
- [x] Fastify backend with centralized error handling, Zod validation, and Prisma schema.
- [x] Python FastAPI modular AI decision engine baseline with clear placeholder delineation.
- [x] Foundry contracts: `ReactiveStrategyMonitor.sol`, `StrategyExecutor.sol`, and `RiskGuard.sol`.
- [x] Architectural documentation and trust boundary definitions.
- [x] Basic automated test suite and typechecking.

---

## Phase 2: Reactive Testnet Deployment & Live Callbacks
- [ ] Deploy `StrategyExecutor.sol` and `RiskGuard.sol` on Sepolia testnet.
- [ ] Deploy `ReactiveStrategyMonitor.sol` on Reactive Network Kopli testnet.
- [ ] Register event subscriptions with Reactive Network subscription service.
- [ ] Verify cross-chain event triggers and receipt of `handleReactiveCallback`.
- [ ] Connect backend event consumer to live Reactive Kopli RPC.

---

## Phase 3: Machine Learning Model Training & Real-Time Evolution
- [ ] Ingest historical DEX swap and liquidity pool tick datasets.
- [ ] Train evolutionary reinforcement learning (RL) agent using PyTorch.
- [ ] Connect real-time WebSocket stream between Fastify API and Python AI engine.
- [ ] Implement automated parameter mutation and A/B test promotion pipeline.
- [ ] Enable multi-chain arbitrage and LP rebalancing across Uniswap V3 and Curve.

---

## Phase 4: Production Hardening & Community Governance
- [ ] Formal smart contract audit of `RiskGuard.sol` and `StrategyExecutor.sol`.
- [ ] Decentralized multisig governance for risk ceiling adjustments.
- [ ] Multi-party computation (MPC) execution relayers.
- [ ] Community strategy submission and evolutionary tournament leaderboard.

