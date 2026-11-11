# EvolveX Architecture & Trust Boundaries

> **Autonomous Intelligence. Continuous Evolution.**  
> Built for the Reactive Omni Buildathon 2026.  
> GitHub: [https://github.com/kaverimeshram/Evolvex](https://github.com/kaverimeshram/Evolvex)

---

## 1. System Overview

EvolveX is an autonomous strategy evolution engine that continuously monitors on-chain market dynamics, synthesizes algorithmic strategy mutations through an AI decision engine, executes controlled A/B experiments, and submits verified executions to destination smart contracts through Reactive Network.

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

---

## 2. Component Responsibilities

| Component | Responsibility |
| :--- | :--- |
| **Reactive Network** | Detects subscribed blockchain events and triggers callbacks |
| **Reactive Contract** | Processes monitored events and initiates destination callbacks |
| **Destination Contract** | Receives callbacks and coordinates execution requests |
| **AI Worker** | Connects blockchain events with the AI engine |
| **AI Engine** | Analyzes conditions and evaluates strategies |
| **RiskGuard** | Enforces execution constraints |
| **Evolution Engine** | Tracks experiments and compares strategy outcomes |

> **Crucial Trust Boundary:** The separation between AI decision-making and smart contract execution is intentional.  
> **AI proposes. Validation checks. Smart contracts enforce.**

---

## 3. The 6-Step Event-Driven Workflow

1. **Observe On-Chain Events**: EvolveX monitors selected blockchain events, such as liquidity changes, price movements, and other relevant protocol activity.
2. **React to Blockchain Activity**: Reactive Network detects subscribed events and triggers a callback on the destination chain without polling RPC endpoints.
3. **Analyze Using AI**: The destination contract emits an event (`StrategyEvaluationRequested`) that is consumed by the off-chain AI worker. The AI engine analyzes the event context, evaluates risks, and generates strategy recommendations.
4. **Experiment with Alternative Strategies**: EvolveX evaluates different strategy configurations against predefined scenarios. Each experiment is measured against existing strategies using performance metrics and safety requirements.
5. **Validate Before Execution**: A strategy recommendation must pass predefined risk constraints in `RiskGuard.sol` before execution. Constraints include maximum allocation limits, slippage restrictions, protocol allowlists, and emergency circuit breakers. The AI does not receive unrestricted control over execution.
6. **Record Outcomes and Evolve**: EvolveX records experiment results, accepted strategies, rejected strategies, and their performance. Previous outcomes become context for subsequent experiments, creating a continuous strategy improvement loop.

---

## 4. Safety Constraints & Risk Controls

### Immutable On-Chain Guardrails (`RiskGuard.sol`)
- **Maximum Slippage**: Hard ceiling of 500 bps (5.0%). Transactions exceeding this revert immediately regardless of AI recommendation.
- **Maximum Capital Allocation**: Hard cap ($100,000 USD default) preventing catastrophic single-transaction exposure.
- **Protocol Allowlist**: Contracts can only interact with pre-approved DEX routers and liquidity pools (e.g., Uniswap V3, Curve, Balancer).
- **Global Circuit Breaker**: Instant administrative halt pausing all automated executions if extreme market volatility or anomalies are detected.
