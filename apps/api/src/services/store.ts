import type {
  BlockchainEvent,
  Strategy,
  Experiment,
  ExperimentResult,
  EvolutionNode,
  OnChainTransaction,
  SystemMetrics,
} from '@evolvex/shared';

// Initial realistic benchmark seed data (marked as testnet simulation)
const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: 'str-001-genesis',
    name: 'Genesis Volatility Harvest',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Baseline strategy harvesting DEX volatility spreads across UniV3 and Curve.',
    parameters: {
      rebalanceThresholdPct: 2.5,
      maxSlippageBps: 50,
      gasCeilingGwei: 35,
      targetPoolAllocationPct: {
        'WETH-USDC': 60,
        'WBTC-USDC': 40,
      },
      stopLossBps: 200,
      takeProfitBps: 450,
      urgencyMultiplier: 1.0,
    },
    riskScore: 2.8,
    parentStrategyId: null,
    generation: 0,
    fitnessScore: 78.4,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'str-002-mut-gas',
    name: 'Dynamic Gas Optimizer v1',
    version: '1.1.0',
    status: 'ACTIVE',
    description: 'Mutated from Genesis with adaptive gas priority and tightened slippage during peak block congestion.',
    parameters: {
      rebalanceThresholdPct: 3.2,
      maxSlippageBps: 35,
      gasCeilingGwei: 28,
      targetPoolAllocationPct: {
        'WETH-USDC': 65,
        'WBTC-USDC': 35,
      },
      stopLossBps: 180,
      takeProfitBps: 420,
      urgencyMultiplier: 1.25,
    },
    riskScore: 3.1,
    parentStrategyId: 'str-001-genesis',
    generation: 1,
    fitnessScore: 84.9,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'str-003-mut-curve',
    name: 'Reactive Rebalance Experimental',
    version: '2.0.0-rc',
    status: 'DRAFT',
    description: 'Candidate strategy testing asynchronous Reactive Network cross-chain triggers on Uniswap price divergence.',
    parameters: {
      rebalanceThresholdPct: 1.8,
      maxSlippageBps: 25,
      gasCeilingGwei: 22,
      targetPoolAllocationPct: {
        'WETH-USDC': 70,
        'WBTC-USDC': 30,
      },
      stopLossBps: 150,
      takeProfitBps: 380,
      urgencyMultiplier: 1.5,
    },
    riskScore: 3.6,
    parentStrategyId: 'str-002-mut-gas',
    generation: 2,
    fitnessScore: 89.2,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

const INITIAL_EVENTS: BlockchainEvent[] = [
  {
    id: 'evt-001',
    chainId: 5318008, // Reactive Kopli
    contractAddress: '0x00000000000000000000000000000000000000ff',
    eventSignature: 'CallbackDispatched(uint256,address,bytes)',
    blockNumber: 1420912,
    txHash: '0xa8f2b740e53a2080a2419c8f0012e8c281a7d80092120a1f0980a311822310ab',
    payload: {
      target: '0x3210000000000000000000000000000000000001',
      divergenceBps: 42,
      reserveRatio: '1.0042',
      trigger: 'UniswapV3SwapDivergence',
    },
    status: 'PROCESSED',
    detectedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'evt-002',
    chainId: 11155111, // Sepolia
    contractAddress: '0x111111125421ca6dc452d289314280a0f8842a65',
    eventSignature: 'Swap(address,address,uint256,uint256,address)',
    blockNumber: 6891230,
    txHash: '0x43b271d4928b9a9108c9f02910fa2e89a0248dbbc89100234129bbdc01890123',
    payload: {
      pool: 'WETH-USDC-0.05',
      amountIn: '10000000000000000000',
      amountOut: '32450000000',
      priceImpactBps: 28,
    },
    status: 'ANALYZED',
    detectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'evt-003',
    chainId: 5318008,
    contractAddress: '0x00000000000000000000000000000000000000ff',
    eventSignature: 'CallbackDispatched(uint256,address,bytes)',
    blockNumber: 1420980,
    txHash: '0x59c0192830f81902830198230912830918230918230918203981029381029381',
    payload: {
      target: '0x3210000000000000000000000000000000000001',
      divergenceBps: 18,
      trigger: 'SlippageGuardNotice',
    },
    status: 'PENDING',
    detectedAt: new Date(Date.now() - 1000 * 45).toISOString(),
  },
];

const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-001',
    name: 'A/B Test: Dynamic Gas Optimizer vs Genesis Baseline',
    hypothesis: 'Tighter slippage bounds and dynamic gas threshold reduce transaction loss by >12% during high volatility.',
    candidateStrategyId: 'str-002-mut-gas',
    baselineStrategyId: 'str-001-genesis',
    status: 'COMPLETED',
    sampleSize: 250,
    durationSeconds: 86400,
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    endedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'exp-002',
    name: 'Live Trial: Reactive Asynchronous Callback Trigger',
    hypothesis: 'Sub-second Reactive Network cross-chain execution captures arbitrage spreads 3x faster than polling bots.',
    candidateStrategyId: 'str-003-mut-curve',
    baselineStrategyId: 'str-002-mut-gas',
    status: 'RUNNING',
    sampleSize: 100,
    durationSeconds: 43200,
    startedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    endedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

const INITIAL_RESULTS: ExperimentResult[] = [
  {
    id: 'res-001',
    experimentId: 'exp-001',
    winnerStrategyId: 'str-002-mut-gas',
    metricImprovementPct: 14.8,
    pValue: 0.0032,
    statisticalSignificance: true,
    gasEfficiencyDelta: 22.4,
    summary: 'Dynamic Gas Optimizer v1 demonstrated statistically significant improvement over baseline with 14.8% yield bump and 22.4% gas reduction.',
    evaluatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_NODES: EvolutionNode[] = [
  {
    id: 'node-gen-0',
    strategyId: 'str-001-genesis',
    parentNodeId: null,
    generation: 0,
    fitnessScore: 78.4,
    mutationType: 'PARAMETRIC_TWEAK',
    changes: {
      initialSetup: { from: 'N/A', to: 'Genesis baseline' },
    },
    status: 'SUPERSEDED',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'node-gen-1',
    strategyId: 'str-002-mut-gas',
    parentNodeId: 'node-gen-0',
    generation: 1,
    fitnessScore: 84.9,
    mutationType: 'GAS_OPTIMIZATION',
    changes: {
      gasCeilingGwei: { from: 35, to: 28 },
      maxSlippageBps: { from: 50, to: 35 },
      rebalanceThresholdPct: { from: 2.5, to: 3.2 },
    },
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'node-gen-2',
    strategyId: 'str-003-mut-curve',
    parentNodeId: 'node-gen-1',
    generation: 2,
    fitnessScore: 89.2,
    mutationType: 'VOLATILITY_ADAPT',
    changes: {
      rebalanceThresholdPct: { from: 3.2, to: 1.8 },
      urgencyMultiplier: { from: 1.25, to: 1.5 },
      maxSlippageBps: { from: 35, to: 25 },
    },
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

const INITIAL_TRANSACTIONS: OnChainTransaction[] = [
  {
    id: 'tx-001',
    chainId: 5318008,
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    fromAddress: '0x999999cf1046e68e36e1aA2E0E07105eDDD1f08E',
    toAddress: '0x00000000000000000000000000000000000000ff',
    value: '0',
    gasUsed: '84210',
    status: 'CONFIRMED',
    strategyId: 'str-002-mut-gas',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export class InMemoryStore {
  public strategies: Strategy[] = [...INITIAL_STRATEGIES];
  public events: BlockchainEvent[] = [...INITIAL_EVENTS];
  public experiments: Experiment[] = [...INITIAL_EXPERIMENTS];
  public results: ExperimentResult[] = [...INITIAL_RESULTS];
  public evolutionNodes: EvolutionNode[] = [...INITIAL_NODES];
  public transactions: OnChainTransaction[] = [...INITIAL_TRANSACTIONS];

  getMetrics(): SystemMetrics {
    const totalStrategies = this.strategies.length;
    const activeExperiments = this.experiments.filter((e) => e.status === 'RUNNING').length;
    const totalReactiveEvents = this.events.length;
    const avgFitness =
      this.strategies.reduce((acc, s) => acc + s.fitnessScore, 0) / (totalStrategies || 1);

    return {
      totalStrategies,
      activeExperiments,
      totalReactiveEvents,
      systemFitness: Number(avgFitness.toFixed(1)),
      gasSavedEstimatedGwei: 482000,
      averageSharpeRatio: 2.34,
    };
  }
}

export const store = new InMemoryStore();

