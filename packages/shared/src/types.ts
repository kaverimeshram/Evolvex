/**
 * EvolveX Shared Domain Types
 * Autonomous Intelligence. Continuous Evolution.
 */

export type EventStatus = 'PENDING' | 'ANALYZED' | 'PROCESSED' | 'FAILED';

export type StrategyStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'MUTATED' | 'REJECTED';

export type ExperimentStatus = 'SCHEDULED' | 'RUNNING' | 'COMPLETED' | 'HALTED' | 'INCONCLUSIVE';

export type MutationType = 'PARAMETRIC_TWEAK' | 'CROSSOVER' | 'VOLATILITY_ADAPT' | 'GAS_OPTIMIZATION' | 'RISK_TIGHTEN';

export type TransactionStatus = 'SUBMITTED' | 'CONFIRMED' | 'REVERTED' | 'TIMEOUT';

export interface StrategyParameters {
  rebalanceThresholdPct: number;
  maxSlippageBps: number;
  gasCeilingGwei: number;
  targetPoolAllocationPct: Record<string, number>;
  stopLossBps: number;
  takeProfitBps: number;
  urgencyMultiplier: number;
}

export interface RiskConstraints {
  maxAllocationUSD: number;
  maxSingleTxSlippageBps: number;
  maxDailyDrawdownPct: number;
  allowedProtocols: string[];
  restrictedTokens: string[];
  minLiquidityDepthUSD: number;
  circuitBreakerActive: boolean;
}

export interface BlockchainEvent {
  id: string;
  chainId: number;
  contractAddress: string;
  eventSignature: string;
  blockNumber: number;
  txHash: string;
  payload: Record<string, unknown>;
  status: EventStatus;
  detectedAt: string;
}

export interface Strategy {
  id: string;
  name: string;
  version: string;
  status: StrategyStatus;
  description: string;
  parameters: StrategyParameters;
  riskScore: number; // 0.0 - 10.0 scale
  parentStrategyId?: string | null;
  generation: number;
  fitnessScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  candidateStrategyId: string;
  baselineStrategyId: string;
  status: ExperimentStatus;
  sampleSize: number;
  durationSeconds: number;
  startedAt?: string | null;
  endedAt?: string | null;
  createdAt: string;
}

export interface ExperimentResult {
  id: string;
  experimentId: string;
  winnerStrategyId: string;
  metricImprovementPct: number;
  pValue: number;
  statisticalSignificance: boolean;
  gasEfficiencyDelta: number;
  summary: string;
  evaluatedAt: string;
}

export interface EvolutionNode {
  id: string;
  strategyId: string;
  parentNodeId?: string | null;
  generation: number;
  fitnessScore: number;
  mutationType: MutationType;
  changes: Record<string, { from: unknown; to: unknown }>;
  status: 'ACTIVE' | 'SUPERSEDED' | 'PRUNED';
  createdAt: string;
}

export interface OnChainTransaction {
  id: string;
  chainId: number;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
  gasUsed?: string | null;
  status: TransactionStatus;
  error?: string | null;
  strategyId?: string | null;
  createdAt: string;
}

export interface AIStrategyEvaluation {
  strategyId: string;
  evaluatedAt: string;
  fitnessScore: number;
  projectedSharpeRatio: number;
  estimatedApyPct: number;
  riskScore: number;
  confidenceInterval: [number, number];
  safetyChecksPassed: boolean;
  violations: string[];
  reasoning: string;
}

export interface AIStrategyGenerationRequest {
  parentStrategyId: string;
  recentEvents: BlockchainEvent[];
  marketRegime: 'LOW_VOLATILITY' | 'HIGH_VOLATILITY' | 'TRENDING' | 'SIDEWAYS';
  optimizationTarget: 'MAX_YIELD' | 'MIN_DRAWDOWN' | 'GAS_EFFICIENCY' | 'BALANCED';
}

export interface SystemMetrics {
  totalStrategies: number;
  activeExperiments: number;
  totalReactiveEvents: number;
  systemFitness: number;
  gasSavedEstimatedGwei: number;
  averageSharpeRatio: number;
}

