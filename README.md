# EvolveX

> **Autonomous Intelligence. Continuous Evolution.**  
> An AI-powered strategy evolution engine that uses Reactive Network to respond to on-chain events, evaluate alternative strategies, and improve future decisions through measurable experiments.

[![GitHub](https://img.shields.io/badge/GitHub-kaverimeshram%2FEvolvex-181717?style=flat&logo=github)](https://github.com/kaverimeshram/Evolvex)
[![Reactive Network](https://img.shields.io/badge/Reactive_Network-Kopli_Testnet-000000?style=flat)](https://reactive.network)
[![Buildathon](https://img.shields.io/badge/Buildathon-Reactive_Omni_2026-blue?style=flat)](https://reactive.network)

---

## 1. What is EvolveX?

Imagine a DeFi protocol that automatically manages liquidity or adjusts its execution strategy.

Most automated systems follow predefined rules. They execute the same strategy even when market conditions change.

But markets are not static. Liquidity changes, volatility increases, and strategies that performed well yesterday might perform poorly tomorrow.

**EvolveX explores a different approach.**

EvolveX is an autonomous AI strategy evolution engine designed to monitor blockchain activity, analyze changing conditions, experiment with alternative strategies, and execute approved decisions through smart contracts.

Instead of simply following fixed automation rules, EvolveX introduces a continuous improvement loop:
- **Observe** what is happening on-chain.
- **Analyze** the current conditions using AI.
- **Generate** alternative strategy configurations.
- **Evaluate** their performance through controlled experiments.
- **Select** strategies that satisfy predefined performance and safety requirements.
- **Record** outcomes and use previous results to guide future experiments.

The goal is to build an intelligent system that doesn't just react to blockchain events, but continuously evaluates whether its decisions can be improved.

---

## 2. The Problem

Decentralized finance operates in a constantly changing environment. Traditional automated strategies face several limitations:

### 1. Static Strategies
Many automation systems rely on predefined parameters. A strategy optimized for one market condition may become ineffective when liquidity, volatility, or trading activity changes.

### 2. Reactive Infrastructure Limitations
Traditional off-chain automation often relies on continuously polling blockchain RPC endpoints to detect changes. This can introduce latency, unnecessary infrastructure overhead, and missed opportunities.

### 3. Uncontrolled AI Execution
Giving an AI agent unrestricted access to smart contract execution introduces serious security and financial risks. An AI recommendation should not automatically become an executable blockchain transaction without validation.

### 4. Lack of Measurable Improvement
Generating a new strategy does not mean it is better. Strategies need to be tested, compared against previous versions, and evaluated using measurable outcomes.

EvolveX aims to address these problems through **event-driven infrastructure**, **AI-based strategy evaluation**, and **smart contract-enforced execution constraints**.

---

## 3. How EvolveX Works

EvolveX combines three main components:
1. **Reactive Network** for event-driven blockchain automation.
2. **AI Engine** for strategy analysis and experimentation.
3. **Smart Contracts** for validation and controlled execution.

### The 6-Step Workflow

```text
Step 1: Observe On-Chain Events
        (Uniswap, Curve, or custom pool activity)
                         │
                         ▼
Step 2: React to Blockchain Activity
        (Reactive Network detects subscribed events, triggers destination callback)
                         │
                         ▼
Step 3: Analyze Using AI
        (Destination contract emits event; off-chain AI worker analyzes market state)
                         │
                         ▼
Step 4: Experiment with Alternative Strategies
        (AI synthesizes & backtests parametric mutations against baseline controls)
                         │
                         ▼
Step 5: Validate Before Execution
        (RiskGuard enforces slippage ceiling, allocation limits, protocol whitelist)
                         │
                         ▼
Step 6: Record Outcomes and Evolve
        (Continuous generational lineage records performance for next experiments)
```

1. **Observe on-chain events**: EvolveX monitors selected blockchain events, such as liquidity changes, price movements, and other relevant protocol activity.
2. **React to blockchain activity**: Reactive Network detects subscribed events and triggers a callback on the destination chain. This removes the need for a continuously polling application to detect every monitored event.
3. **Analyze using AI**: The destination contract emits an event that can be consumed by an off-chain AI worker. The AI engine analyzes the event context, evaluates potential risks, and generates strategy recommendations.
4. **Experiment with alternative strategies**: EvolveX evaluates different strategy configurations against predefined scenarios. Each experiment is measured against the existing strategy using performance metrics and safety requirements.
5. **Validate before execution**: A strategy recommendation must pass predefined risk constraints before it can be executed. These constraints include maximum allocation limits, slippage restrictions, protocol allowlists, and emergency circuit breakers. **The AI does not receive unrestricted control over smart contract execution.**
6. **Record outcomes and evolve**: EvolveX records experiment results, accepted strategies, rejected strategies, and their performance. Previous outcomes become context for subsequent experiments, creating a continuous strategy improvement loop.

---

## 4. Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   BLOCKCHAIN EVENTS                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   REACTIVE NETWORK                     │
│                   [Event Detection]                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              REACTIVE SMART CONTRACT                   │
│               [Cross-chain Callback]                   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                DESTINATION CONTRACT                    │
│           [StrategyEvaluationRequested]                │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                 OFF-CHAIN AI WORKER                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                      AI ENGINE                         │
│             - Analyze Market Conditions                │
│             - Generate Strategy Variants               │
│             - Evaluate Alternative Results             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   RISK VALIDATION                      │
│                  [Approved Strategy]                   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              DESTINATION SMART CONTRACT                │
│                  [Guarded Execution]                   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                    RECORD OUTCOME                      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                  EVOLUTION HISTORY                     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   NEXT EXPERIMENT                      │
└────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility |
| :--- | :--- |
| **Reactive Network** | Detects subscribed blockchain events and triggers callbacks |
| **Reactive Contract** | Processes monitored events and initiates destination callbacks |
| **Destination Contract** | Receives callbacks and coordinates execution requests |
| **AI Worker** | Connects blockchain events with the AI engine |
| **AI Engine** | Analyzes conditions and evaluates strategies |
| **RiskGuard** | Enforces execution constraints |
| **Evolution Engine** | Tracks experiments and compares strategy outcomes |

> **Key Architectural Principle:** The separation between AI decision-making and smart contract execution is intentional.  
> **AI proposes. Validation checks. Smart contracts enforce.**

---

## 5. The Strategy Evolution Engine

The central idea behind EvolveX is **continuous strategy experimentation**. Instead of assuming that the first strategy is optimal, EvolveX allows multiple strategy configurations to be evaluated.

For example, imagine a DeFi liquidity management strategy. An experiment might compare different configurations:

| Parameter | Strategy A (Baseline) | Strategy B (Candidate) |
| :--- | :--- | :--- |
| **Rebalance threshold** | `5%` | `8%` |
| **Maximum allocation** | `40%` | `30%` |
| **Slippage limit** | `0.5%` | `0.3%` |

*(These configurations are illustrative examples).*

The evaluation engine compares them using predefined metrics:
- Return and drawdown
- Execution cost & gas efficiency
- Strategy performance (Sharpe ratio)
- Risk exposure
- Execution success rate

A strategy is not considered better simply because it produces a higher return in one experiment. It must satisfy the required risk constraints and evaluation criteria.

### Evolution Lifecycle

```text
[ INITIAL STRATEGY ]
         │
         ▼
[ GENERATE VARIATIONS ]
         │
         ▼
[ RUN EXPERIMENTS ]
         │
         ▼
[ MEASURE PERFORMANCE ]
         │
         ▼
[ COMPARE RESULTS ]
         │
         ▼
[ SELECT CANDIDATES ]
         │
         ▼
[ RECORD OUTCOMES ]
         │
         ▼
[ GENERATE NEXT VARIATIONS ]
```

This approach is inspired by **evolutionary computation**, where candidate solutions are modified, evaluated, and selected across generations to progressively identify better-performing configurations through evidence rather than assumptions.

---

## 6. Safety and Execution Controls

EvolveX strictly separates strategy generation from strategy execution.

An AI model can generate recommendations, but it **cannot** bypass the execution constraints defined by the smart contracts.

The `RiskGuard` component is designed to enforce:
- **Maximum slippage**: Hard-coded 500 bps (5%) ceiling.
- **Allocation limits**: Absolute dollar ceiling per transaction ($100,000 USD default).
- **Approved protocol restrictions**: Whitelisted routers and DEX pools only.
- **Emergency execution controls**: Global circuit breaker instant halt.

This provides an important security boundary between probabilistic AI decisions and deterministic on-chain enforcement. **A failed validation prevents execution immediately.**

---

## 7. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, Lucide React, Recharts |
| **Backend** | Node.js, Fastify, TypeScript, Prisma ORM, Zod |
| **AI Engine** | Python 3.11+, FastAPI, Pydantic, PyTorch (planned model integration) |
| **Smart Contracts** | Solidity 0.8.24, Foundry |
| **Reactive Infrastructure** | Reactive Network (Kopli Testnet) |
| **Blockchain Interaction** | Viem, Wagmi |
| **Database** | PostgreSQL, Prisma ORM |
| **Validation** | Zod (TypeScript), Pydantic (Python) |

---

## 8. Repository Structure

```text
evolvex/
├── apps/
│   ├── web/                 # Next.js minimal dark-mode dashboard
│   └── api/                 # Fastify backend & Prisma ORM
│
├── services/
│   └── ai-engine/           # Python AI decision engine
│       ├── api/             # FastAPI route handlers
│       ├── models/          # Modular strategy model interface
│       ├── evaluation/      # Fitness & Sharpe metrics
│       ├── risk/            # Predefined risk rules
│       └── services/        # Orchestration layer
│
├── packages/
│   ├── shared/              # Shared types, interfaces & Zod schemas
│   ├── blockchain/          # Viem clients, Reactive Kopli configs & ABIs
│   └── config/              # Shared linting & TypeScript configs
│
├── contracts/
│   ├── src/
│   │   ├── interfaces/      # IReactive, IRiskGuard, IStrategyExecutor
│   │   ├── ReactiveStrategyMonitor.sol # Reactive Network event monitor
│   │   ├── StrategyExecutor.sol        # Destination execution contract
│   │   └── RiskGuard.sol               # On-chain execution constraints
│   ├── test/                # Foundry contract test suite
│   └── script/              # Foundry deployment scripts
│
├── docs/
│   ├── architecture.md      # Event-driven workflow & trust boundaries
│   ├── system-design.md     # Data models & API specifications
│   └── development-roadmap.md # Detailed milestones
│
├── docker-compose.yml       # Local PostgreSQL database
├── .github/workflows/ci.yml # Automated CI pipeline
├── .env.example
├── package.json             # pnpm monorepo root
├── pnpm-workspace.yaml
└── README.md
```

---

## 9. Running Locally

### Prerequisites
- **Node.js** (v20+ recommended)
- **pnpm** (v9+ or v12)
- **Python** (3.11+)
- **Foundry** (`forge`, `cast`)
- **PostgreSQL** (or Docker for `docker compose up -d`)

### Clone the Repository
```bash
git clone https://github.com/kaverimeshram/Evolvex.git
cd Evolvex
```

### Install Dependencies
```bash
pnpm install
```

### Configure Environment Variables
```bash
cp .env.example .env
```
*(Configure the required environment variables before connecting external services).*

### Start the Frontend Dashboard
```bash
pnpm --filter @evolvex/web dev
# Available at http://localhost:3000
```

### Start the Backend API
```bash
pnpm --filter @evolvex/api dev
# Available at http://localhost:4000
```

### Start the AI Engine
```bash
cd services/ai-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
# Available at http://localhost:8000
```

### Run Tests

```bash
# TypeScript strict checks across all packages
pnpm run typecheck

# Backend Fastify API tests
pnpm --filter @evolvex/api test

# AI Engine tests
cd services/ai-engine
.venv/bin/pytest tests/ -v
cd ../..

# Monorepo production build
pnpm run build
```

---

## 10. Current Development Status

EvolveX is under active development for the **Reactive Omni Buildathon 2026**.

The initial repository foundation includes:
- Next.js dashboard with five application routes (`/`, `/experiments`, `/evolution`, `/activity`, `/settings`).
- Fastify backend and modular API structure.
- Prisma database schema for events, strategies, experiments, evolution nodes, and transactions.
- Python AI Engine with deterministic baseline implementations.
- Strategy evaluation and risk validation modules.
- Solidity contract foundations for Reactive monitoring, execution, and risk controls.
- Foundry test suite.
- Shared blockchain clients and TypeScript packages.

### Implementation Status Matrix

| Feature | Status |
| :--- | :--- |
| **Monorepo foundation** | Implemented |
| **Dashboard foundation** | Implemented with benchmark mock layer |
| **Backend API foundation** | Implemented |
| **AI API and heuristic baseline** | Implemented |
| **Strategy evolution experiments** | In development |
| **Reactive testnet deployment** | Pending |
| **Live cross-chain callbacks** | Pending |
| **End-to-end AI and contract integration** | Pending |

> **Important Note:** The current AI implementation is a deterministic baseline, not a trained autonomous learning model. Live blockchain integration and deployment are part of the subsequent development milestones.

---

## 11. Roadmap

### Phase 1 — Foundation *(Current)*
- [x] Initialize monorepo.
- [x] Build frontend dashboard.
- [x] Establish backend and AI service architecture.
- [x] Create smart contract foundations.

### Phase 2 — Reactive Integration
- [ ] Deploy monitoring and destination contracts to Reactive Kopli and Sepolia testnets.
- [ ] Configure event subscriptions on origin contracts.
- [ ] Verify cross-chain callbacks.
- [ ] Build live blockchain event processing daemon.

### Phase 3 — AI Strategy Engine
- [ ] Connect the AI worker to live blockchain events.
- [ ] Implement strategy generation and parameter mutation.
- [ ] Implement controlled experiment evaluation ($p$-values, yield delta).
- [ ] Integrate risk validation with off-chain simulator.

### Phase 4 — Strategy Evolution
- [ ] Implement mutation and selection algorithms.
- [ ] Store experiment results in PostgreSQL via Prisma.
- [ ] Build real-time strategy lineage tracking.
- [ ] Feed previous outcomes into subsequent experiments.

### Phase 5 — End-to-End Demonstration
- [ ] Demonstrate actual blockchain event detection on origin network.
- [ ] Show Reactive Network callback execution.
- [ ] Demonstrate AI-generated strategy recommendations.
- [ ] Validate and execute approved strategies via `StrategyExecutor.sol`.
- [ ] Visualize the experiment and evolution history on the dashboard.

---

## 12. Vision

We believe the next generation of autonomous on-chain systems should do more than execute predefined instructions.

They should be able to **observe** changing conditions, **evaluate** their decisions, **experiment** with alternatives, and **improve** through measurable evidence.

EvolveX is an exploration of that idea:  
**From static automation to continuously evolving intelligence.**

Built for the **Reactive Omni Buildathon 2026**.  
GitHub: [https://github.com/kaverimeshram/Evolvex](https://github.com/kaverimeshram/Evolvex)
