import { z } from 'zod';

export const StrategyParametersSchema = z.object({
  rebalanceThresholdPct: z.number().min(0.01).max(100),
  maxSlippageBps: z.number().int().min(1).max(1000), // 0.01% - 10%
  gasCeilingGwei: z.number().positive(),
  targetPoolAllocationPct: z.record(z.string(), z.number()),
  stopLossBps: z.number().int().min(10).max(5000),
  takeProfitBps: z.number().int().min(10).max(10000),
  urgencyMultiplier: z.number().min(0.5).max(5.0),
});

export const RiskConstraintsSchema = z.object({
  maxAllocationUSD: z.number().positive(),
  maxSingleTxSlippageBps: z.number().int().min(1).max(500),
  maxDailyDrawdownPct: z.number().min(0.1).max(50),
  allowedProtocols: z.array(z.string()).nonempty(),
  restrictedTokens: z.array(z.string()),
  minLiquidityDepthUSD: z.number().positive(),
  circuitBreakerActive: z.boolean(),
});

export const CreateStrategySchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().max(256).default(''),
  parameters: StrategyParametersSchema,
  riskScore: z.number().min(0).max(10).default(3.0),
  parentStrategyId: z.string().uuid().optional().nullable(),
  generation: z.number().int().min(0).default(0),
  fitnessScore: z.number().default(0),
});

export const IngestEventSchema = z.object({
  chainId: z.number().int().positive(),
  contractAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address'),
  eventSignature: z.string().min(5),
  blockNumber: z.number().int().positive(),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid EVM tx hash'),
  payload: z.record(z.string(), z.unknown()),
});

export const CreateExperimentSchema = z.object({
  name: z.string().min(3).max(64),
  hypothesis: z.string().min(10).max(500),
  candidateStrategyId: z.string().uuid(),
  baselineStrategyId: z.string().uuid(),
  sampleSize: z.number().int().min(10).max(10000).default(100),
  durationSeconds: z.number().int().min(60).max(604800).default(3600), // 1m - 7d
});

export const EvaluateStrategySchema = z.object({
  strategyId: z.string(),
  parameters: StrategyParametersSchema,
  historicalWindowHours: z.number().int().min(1).max(720).default(24),
  riskConstraints: RiskConstraintsSchema.optional(),
});

export const GenerateStrategySchema = z.object({
  parentStrategyId: z.string(),
  parentParameters: StrategyParametersSchema,
  optimizationTarget: z.enum(['MAX_YIELD', 'MIN_DRAWDOWN', 'GAS_EFFICIENCY', 'BALANCED']).default('BALANCED'),
  marketRegime: z.enum(['LOW_VOLATILITY', 'HIGH_VOLATILITY', 'TRENDING', 'SIDEWAYS']).default('SIDEWAYS'),
  mutationRate: z.number().min(0.01).max(0.5).default(0.1),
});

