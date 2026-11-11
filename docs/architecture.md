# EvolveX Architecture & Trust Boundaries

> **Autonomous Intelligence. Continuous Evolution.**  
> Powered by Reactive Network for the Reactive Omni Buildathon.

---

## 1. System Overview

EvolveX is an autonomous strategy evolution engine that continuously monitors on-chain market dynamics, synthesizes algorithmic strategy mutations through an AI decision engine, executes controlled A/B experiments, and submits verified executions to destination smart contracts through Reactive Network.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        ORIGIN CHAIN (e.g. Sepolia)                     │
│  Uniswap V3 / Curve Pools: [Swap / Mint / Burn / Divergence Events]    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Subscribed Event Detection
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      REACTIVE NETWORK (Kopli Testnet)                  │
│                                                                        │
│   ReactiveStrategyMonitor.sol                                          │
│   - Receives react(...) notification from Reactive VM                  │
│   - Evaluates filter criteria                                          │
│   - Dispatches cross-chain Callback                                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Cross-Chain Relay Callback
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    DESTINATION CHAIN (e.g. Sepolia)                    │
│                                                                        │
│   StrategyExecutor.sol                                                 │
│   - Receives handleReactiveCallback(...)                               │
│   - Emits StrategyEvaluationRequested(...)                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                          WebSocket / Event Ingest
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    OFF-CHAIN INTELLIGENCE & EVOLUTION                  │
│                                                                        │
│   Backend API (Fastify / Prisma) ◄──► AI Engine (Python FastAPI)      │
│   - Records Event & State             - Analyzes market conditions     │
│   - Coordinates Experiments           - Generates parameter mutations  │
│   - Evaluates statistical outcome     - Simulates fitness & risk score │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                 Approved Execution Transaction (Viem / Signer)
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 CRITICAL ON-CHAIN TRUST BOUNDARY                       │
│                                                                        │
│   StrategyExecutor.sol ──► RiskGuard.sol (Hard Guardrails)             │
│   - Validates authorized executor role                                 │
│   - Checks absolute slippage ceiling (<= 500 bps)                      │
│   - Verifies max allocation cap ($100,000 USD)                         │
│   - Checks whitelisted target protocols only                           │
│   - Ensures circuit breaker is inactive                                │
│                                                                        │
│   [IF VALID] ──► Target Protocol Action Execution                      │
│   [IF INVALID] ──► Immediate Revert with Custom Error                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Event-Driven Workflow (6-Step Lifecycle)

1. **Event Detection on Monitored Chain**: An on-chain activity occurs (such as a large Uniswap pool swap or reserve imbalance).
2. **Reactive Contract Notification**: The Reactive Network engine detects the event and invokes `react(...)` on `ReactiveStrategyMonitor.sol`.
3. **Cross-Chain Callback**: The reactive monitor dispatches an asynchronous callback to `StrategyExecutor.sol` on the destination network.
4. **AI Off-Chain Ingest**: `StrategyExecutor.sol` emits `StrategyEvaluationRequested`. The off-chain event ingest service notifies the AI Decision Engine.
5. **Mutation & Risk Assessment**: The AI engine analyzes the event, compares current parameter performance, mutates candidate parameters, and checks predefined risk limits.
6. **Guarded On-Chain Execution**: An authorized transaction calls `executeApprovedStrategy(...)`. The transaction is validated against immutable rules in `RiskGuard.sol` before any execution occurs.

---

## 3. Trust Boundaries & Security Model

A core architectural invariant of EvolveX is: **No unrestricted AI-controlled contract execution.**

### Trust Boundary Layering

1. **Autonomous Off-Chain Formulation vs. On-Chain Verification**:
   - The AI engine generates *hypotheses* and *recommendations*.
   - The AI engine does *not* possess direct unilateral execution keys with infinite spending allowances.

2. **Immutable Safety Ceilings (`RiskGuard.sol`)**:
   - **Absolute Slippage Ceiling**: Hard limit of 500 bps (5.0%). Transactions exceeding this revert immediately regardless of AI recommendation.
   - **Maximum Allocation Per Action**: Hard cap ($100,000 USD default) preventing catastrophic capital deployment.
   - **Whitelisted Target Protocols Only**: Contracts can only interact with pre-approved DEX routers and pools.
   - **Global Circuit Breaker**: Emergency administrative pause halting all automated executions if abnormal market turbulence or exploit conditions are flagged.

3. **Role-Based Execution Isolation**:
   - Callbacks must originate from verified Reactive Network proxy addresses.
   - Strategy executions require authentication by designated executor addresses.

