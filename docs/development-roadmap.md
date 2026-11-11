# EvolveX Development Roadmap

> **Reactive Omni Buildathon 2026**  
> GitHub: [https://github.com/kaverimeshram/Evolvex](https://github.com/kaverimeshram/Evolvex)

---

## Phase 1 — Foundation *(Current Milestone)*
- [x] Initialize pnpm monorepo with TypeScript strict mode and shared packages.
- [x] Build minimal dark-mode Next.js 15 dashboard with Wagmi & Viem.
- [x] Establish Fastify backend and modular API route architecture.
- [x] Implement Prisma database schema for events, strategies, experiments, evolution nodes, and transactions.
- [x] Build Python FastAPI AI Engine with deterministic heuristic baseline and modular PyTorch interface.
- [x] Create Solidity contract foundations for Reactive event monitoring (`ReactiveStrategyMonitor.sol`), execution (`StrategyExecutor.sol`), and safety guardrails (`RiskGuard.sol`).
- [x] Implement unit tests and automated CI pipeline.

---

## Phase 2 — Reactive Integration
- [ ] Deploy `ReactiveStrategyMonitor.sol` to Reactive Network Kopli testnet.
- [ ] Deploy `StrategyExecutor.sol` and `RiskGuard.sol` to Sepolia testnet.
- [ ] Configure event subscriptions on origin contracts with Reactive subscription service.
- [ ] Verify cross-chain callbacks (`react(...)` ➔ `handleReactiveCallback(...)`).
- [ ] Build live blockchain event processing daemon connecting to Kopli RPC.

---

## Phase 3 — AI Strategy Engine
- [ ] Connect the AI worker to live blockchain events.
- [ ] Implement strategy generation and parameter mutation algorithms.
- [ ] Implement controlled experiment evaluation (measuring $p$-values, yield delta, and gas efficiency).
- [ ] Integrate risk validation with off-chain simulator.

---

## Phase 4 — Strategy Evolution
- [ ] Implement mutation, crossover, and selection algorithms.
- [ ] Store experiment results in PostgreSQL via Prisma.
- [ ] Build real-time strategy lineage tracking and evolutionary graph.
- [ ] Feed previous outcomes into subsequent experiments to establish the continuous improvement loop.

---

## Phase 5 — End-to-End Demonstration
- [ ] Demonstrate actual blockchain event detection on origin network.
- [ ] Show Reactive Network callback execution without polling.
- [ ] Demonstrate AI-generated strategy recommendations.
- [ ] Validate and execute approved strategies via `StrategyExecutor.sol` under strict `RiskGuard` enforcement.
- [ ] Visualize the experiment and evolution history live on the dashboard.
