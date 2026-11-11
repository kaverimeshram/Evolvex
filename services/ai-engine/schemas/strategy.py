from enum import Enum
from typing import Dict, List, Optional, Tuple
from pydantic import BaseModel, Field


class OptimizationTarget(str, Enum):
    MAX_YIELD = "MAX_YIELD"
    MIN_DRAWDOWN = "MIN_DRAWDOWN"
    GAS_EFFICIENCY = "GAS_EFFICIENCY"
    BALANCED = "BALANCED"


class MarketRegime(str, Enum):
    LOW_VOLATILITY = "LOW_VOLATILITY"
    HIGH_VOLATILITY = "HIGH_VOLATILITY"
    TRENDING = "TRENDING"
    SIDEWAYS = "SIDEWAYS"


class StrategyParameters(BaseModel):
    rebalanceThresholdPct: float = Field(..., ge=0.01, le=100.0)
    maxSlippageBps: int = Field(..., ge=1, le=1000)
    gasCeilingGwei: float = Field(..., gt=0.0)
    targetPoolAllocationPct: Dict[str, float]
    stopLossBps: int = Field(..., ge=10, le=5000)
    takeProfitBps: int = Field(..., ge=10, le=10000)
    urgencyMultiplier: float = Field(..., ge=0.5, le=5.0)


class RiskConstraints(BaseModel):
    maxAllocationUSD: float = Field(default=50000.0, gt=0.0)
    maxSingleTxSlippageBps: int = Field(default=100, ge=1, le=500)
    maxDailyDrawdownPct: float = Field(default=5.0, ge=0.1, le=50.0)
    allowedProtocols: List[str] = Field(default_factory=lambda: ["UniswapV3", "Curve", "Balancer"])
    restrictedTokens: List[str] = Field(default_factory=list)
    circuitBreakerActive: bool = False


class AnalyzeEventRequest(BaseModel):
    chainId: int
    contractAddress: str
    eventSignature: str
    blockNumber: int
    payload: Dict[str, object]
    currentStrategyParameters: Optional[StrategyParameters] = None


class AnalyzeEventResponse(BaseModel):
    actionRequired: bool
    recommendedAction: str
    divergenceBps: float
    urgencyLevel: str
    confidenceScore: float
    reasoning: str
    isMockSimulation: bool = True


class GenerateStrategyRequest(BaseModel):
    parentStrategyId: str
    parentParameters: StrategyParameters
    optimizationTarget: OptimizationTarget = OptimizationTarget.BALANCED
    marketRegime: MarketRegime = MarketRegime.SIDEWAYS
    mutationRate: float = Field(default=0.1, ge=0.01, le=0.5)


class GenerateStrategyResponse(BaseModel):
    newStrategyId: str
    parentStrategyId: str
    generatedParameters: StrategyParameters
    mutationType: str
    parameterChanges: Dict[str, Dict[str, object]]
    projectedFitness: float
    isMockSimulation: bool = True
    disclaimer: str = (
        "Deterministic heuristic evolution placeholder. Real ML model weights "
        "will be plugged into the modular architecture in subsequent milestones."
    )


class EvaluateStrategyRequest(BaseModel):
    strategyId: str
    parameters: StrategyParameters
    historicalWindowHours: int = Field(default=24, ge=1, le=720)
    riskConstraints: Optional[RiskConstraints] = None


class EvaluateStrategyResponse(BaseModel):
    strategyId: str
    fitnessScore: float
    projectedSharpeRatio: float
    estimatedApyPct: float
    riskScore: float
    confidenceInterval: Tuple[float, float]
    safetyChecksPassed: bool
    violations: List[str]
    reasoning: str
    isMockSimulation: bool = True

