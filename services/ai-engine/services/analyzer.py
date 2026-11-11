"""
EvolveX AI Strategy Analysis & Orchestration Service
Autonomous Intelligence. Continuous Evolution.
"""

import uuid
from typing import Dict, Any
from schemas.strategy import (
    AnalyzeEventRequest,
    AnalyzeEventResponse,
    GenerateStrategyRequest,
    GenerateStrategyResponse,
    EvaluateStrategyRequest,
    EvaluateStrategyResponse,
    StrategyParameters,
    RiskConstraints,
)
from models.strategy_model import get_strategy_model
from evaluation.fitness import compute_strategy_fitness
from risk.safety_rules import validate_risk_constraints


class StrategyAnalysisService:
    def __init__(self):
        self.model = get_strategy_model()

    def analyze_event(self, req: AnalyzeEventRequest) -> AnalyzeEventResponse:
        """
        Analyzes an incoming on-chain event (e.g. from Reactive Network callback)
        and determines if strategy adjustment or execution is recommended.
        """
        payload = req.payload
        divergence = float(payload.get("divergenceBps", 25.0))

        action_required = divergence > 20.0
        urgency = "HIGH" if divergence > 50.0 else ("MEDIUM" if divergence > 20.0 else "LOW")
        recommended = "EXECUTE_ARBITRAGE_REBALANCE" if action_required else "HOLD_POSITION"

        reasoning = (
            f"Observed price/liquidity divergence of {divergence} bps on chain {req.chainId}. "
            f"Event signature: {req.eventSignature}. Recommendation: {recommended}."
        )

        return AnalyzeEventResponse(
            actionRequired=action_required,
            recommendedAction=recommended,
            divergenceBps=divergence,
            urgencyLevel=urgency,
            confidenceScore=0.91,
            reasoning=reasoning,
            isMockSimulation=True,
        )

    def generate_strategy(self, req: GenerateStrategyRequest) -> GenerateStrategyResponse:
        """
        Generates an evolved candidate strategy from parent parameters
        using heuristic mutation.
        """
        parent_dict = req.parentParameters.model_dump()
        mutated_dict, changes, mutation_type = self.model.mutate_parameters(
            parent_dict,
            req.mutationRate,
            req.optimizationTarget.value,
        )

        new_params = StrategyParameters(**mutated_dict)
        fitness = self.model.predict_fitness(mutated_dict)
        new_id = f"str-ai-{uuid.uuid4().hex[:8]}"

        return GenerateStrategyResponse(
            newStrategyId=new_id,
            parentStrategyId=req.parentStrategyId,
            generatedParameters=new_params,
            mutationType=mutation_type,
            parameterChanges=changes,
            projectedFitness=fitness,
            isMockSimulation=True,
        )

    def evaluate_strategy(self, req: EvaluateStrategyRequest) -> EvaluateStrategyResponse:
        """
        Evaluates a strategy's parameters, computes fitness and risk score,
        and enforces safety constraints.
        """
        fitness, sharpe, apy, risk_score, ci = compute_strategy_fitness(
            req.parameters,
            req.historicalWindowHours,
        )

        constraints = req.riskConstraints or RiskConstraints()
        passed, violations = validate_risk_constraints(req.parameters, constraints)

        reasoning = (
            f"Projected Sharpe ratio {sharpe} with estimated APY {apy}%. "
            f"Safety validation {'passed all constraints' if passed else 'detected violations'}."
        )

        return EvaluateStrategyResponse(
            strategyId=req.strategyId,
            fitnessScore=fitness,
            projectedSharpeRatio=sharpe,
            estimatedApyPct=apy,
            riskScore=risk_score,
            confidenceInterval=ci,
            safetyChecksPassed=passed,
            violations=violations,
            reasoning=reasoning,
            isMockSimulation=True,
        )

