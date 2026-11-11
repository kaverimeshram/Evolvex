# EvolveX

> **Autonomous Intelligence. Continuous Evolution.**  
> An autonomous AI strategy evolution engine powered by Reactive Network for the Reactive Omni Buildathon.

---

## 1. Project Overview

**EvolveX** is an autonomous AI strategy evolution engine built on **Reactive Network**. The system monitors on-chain events across decentralized finance protocols, utilizes AI to evaluate and synthesize algorithmic parameter mutations, validates those strategies against strict on-chain risk guardrails, and executes approved actions via smart contracts.

The core philosophy of EvolveX is **continuous strategy improvement through measurable, empirical experiments**. Rather than relying on static algorithmic models or unconstrained bot scripts, EvolveX applies evolutionary computation principles (mutation, crossover, selection, and hypothesis testing) to on-chain execution strategies.

---

## 2. Problem Statement

Decentralized finance (DeFi) operates 24/7 in a volatile, highly dynamic environment:
- **Static Strategy Degradation**: Liquidity provision and arbitrage models tuned for low-volatility regimes suffer severe drawdowns when market conditions shift.
- **Latency & Polling Overhead**: Traditional off-chain bots rely on polling nodes via standard RPCs, introducing latency, high infrastructure costs, and missed execution windows.
- **Unconstrained AI Vulnerability**: Deploying autonomous AI agents with unconstrained private keys or unchecked contract execution poses severe security and financial risks.

---

## 3. The Solution

EvolveX overcomes these limitations by combining Reactive Network's event-driven architecture with guarded AI evolution:
1. **Asynchronous Cross-Chain Reactivity**: Leveraging Reactive Network to monitor events (e.g. pool swaps, reserve shifts) on origin chains (e.g. Sepolia) and trigger instant callbacks without polling.
2. **Empirical A/B Experimentation**: Candidate strategy parameters are tested against baseline controls with rigorous statistical hypothesis testing ($p$-values, yield delta, gas efficiency).
3. **Strict On-Chain Trust Boundaries**: An immutable `RiskGuard.sol` contract enforces slippage ceilings, capital allocation caps, protocol whitelists, and an emergency circuit breaker. Unrestricted AI execution is strictly prohibited.

---

## 4. Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React, Recharts, Wagmi, Viem |
| **Backend** | Node.js, TypeScript, Fastify, PostgreSQL, Prisma ORM, Zod |
| **AI Engine** | Python 3.11+, FastAPI, Pydantic, PyTorch (modular interface) |
| **Blockchain** | Solidity 0.8.24, Foundry, Reactive Network (Kopli Testnet), Viem |

---

## 5. Repository Architecture

```text
evolvex/
├── apps/
│   ├── web/                 # Next.js minimal dark-mode dashboard
│   └── api/                 # Fastify modular backend & Prisma ORM
│
├── services/
│   └── ai-engine/           # Python FastAPI decision & evaluation engine
│
├── packages/
│   ├── shared/              # Universal TypeScript types, interfaces & Zod schemas
│   ├── config/              # Shared ESLint, Prettier & TypeScript configurations
│   └── blockchain/          # Viem clients, Reactive Kopli chain definitions, ABIs
│
├── contracts/
│   ├── src/                 # Solidity smart contracts
│   │   ├── interfaces/      # IReactive, IRiskGuard, IStrategyExecutor
│   │   ├── ReactiveStrategyMonitor.sol # Reactive Network event monitor
│   │   ├── StrategyExecutor.sol        # Destination execution contract
│   │   └── RiskGuard.sol               # On-chain safety guardrails
│   ├── test/                # Foundry test suite
│   ├── script/              # Foundry deployment scripts
│   └── foundry.toml         # Foundry configuration
│
├── docs/
│   ├── architecture.md      # Event-driven workflow & trust boundaries
│   ├── system-design.md     # Data models, API specs & statistical formulas
│   └── development-roadmap.md # Hackathon milestones
│
├── .github/
│   └── workflows/ci.yml     # Continuous Integration pipeline
│
├── .env.example             # Complete environment variable template
├── .gitignore
├── package.json             # Root monorepo workspace definition
├── pnpm-workspace.yaml
├── tsconfig.base.json       # Base TypeScript compiler settings
└── README.md
```

---

## 6. Trust Boundaries & Security Model

```text
[ Reactive Network ] ──(Callback)──► [ StrategyExecutor.sol ]
                                             │
                                    (Emits Event)
                                             ▼
                                     [ AI Decision Worker ]
                                             │
                             (Submits Strategy Recommendation)
                                             ▼
                                  [ StrategyExecutor.sol ]
                                             │
                                  (Calls Validation Check)
                                             ▼
                                     [ RiskGuard.sol ]
                           ┌───────────────────────────────────┐
                           │  - Protocol whitelisted?          │
                           │  - Slippage <= 500 bps ceiling?   │
                           │  - Allocation <= $100k cap?       │
                           │  - Circuit breaker inactive?      │
                           └─────────────────┬─────────────────┘
                                             │
                        ┌────────────────────┴────────────────────┐
                     [PASSED]                                  [FAILED]
                        │                                         │
                        ▼                                         ▼
            Execute on Target Protocol                    Revert Immediately
```

---

## 7. Installation Instructions

### Prerequisites
- **Node.js**: `v20.0.0` or higher (recommended `v22+`)
- **pnpm**: `v9.0.0` or higher (`v12+` compatible)
- **Python**: `3.11` or higher
- **Foundry**: `forge` and `cast` (optional for local contract compilation)

### Clone & Install Workspace Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/evolvex.git
cd evolvex

# Copy environment variables
cp .env.example .env

# Install Node.js monorepo dependencies
pnpm install
```

### Setup Python AI Engine

```bash
cd services/ai-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../..
```

---

## 8. Local Development Instructions

Each service in the monorepo can be started independently:

### 1. Start the Next.js Frontend Dashboard (`apps/web`)
```bash
# Runs on http://localhost:3000
pnpm --filter @evolvex/web run dev
```

### 2. Start the Fastify Backend API (`apps/api`)
```bash
# Runs on http://localhost:4000
pnpm --filter @evolvex/api run dev
```

### 3. Start the Python AI Engine (`services/ai-engine`)
```bash
cd services/ai-engine
source .venv/bin/activate
python main.py
# Runs on http://localhost:8000
```

### 4. Run Monorepo in Parallel
```bash
pnpm run dev
```

---

## 9. Testing & Verification

### TypeScript Typechecking
```bash
pnpm run typecheck
```

### Backend API Tests
```bash
pnpm --filter @evolvex/api test
```

### Python AI Engine Tests
```bash
cd services/ai-engine
source .venv/bin/activate
pytest tests/ -v
```

### Foundry Contract Tests
```bash
cd contracts
forge test -v
```

---

## 10. Environment Variables

Reference variables configured in `.env.example`:

```bash
# Backend API
API_PORT=4000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://evolvex:evolvex_dev@localhost:5432/evolvex_dev?schema=public

# AI Engine
AI_ENGINE_PORT=8000
AI_MOCK_MODE=true

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENABLE_MOCK_DATA=true

# Reactive Network
REACTIVE_RPC_URL=https://kopli-rpc.reactive.network
SEPOLIA_RPC_URL=https://rpc.sepolia.org
REACTIVE_CHAIN_ID=5318008
DESTINATION_CHAIN_ID=11155111
```

---

## 11. Future Development Roadmap

1. **Phase 1**: Monorepo Foundation & Contract Architecture *(Current)*.
2. **Phase 2**: Deployment to Reactive Kopli Testnet & live callback verification.
3. **Phase 3**: PyTorch evolutionary reinforcement learning training & live tick ingest.
4. **Phase 4**: Security audit and decentralized community strategy governance.

---

## 12. License

Apache 2.0 / MIT. Built for the Reactive Omni Buildathon.

