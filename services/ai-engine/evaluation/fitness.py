"""
EvolveX Strategy Fitness & Performance Evaluation
Autonomous Intelligence. Continuous Evolution.
"""

from typing import Tuple
from schemas.strategy import StrategyParameters
from models.strategy_model import get_strategy_model


def compute_strategy_fitness(
    parameters: StrategyParameters,
    historical_window_hours: int = 24
) -> Tuple[float, float, float, float, Tuple[float, float]]:
    """
    Computes projected performance metrics:
    Returns (fitness_score, sharpe_ratio, estimated_apy_pct, risk_score, confidence_interval).
    """
    model = get_strategy_model()
    fitness = model.predict_fitness(parameters.model_dump())

    # Analytical estimates based on parameters
    sharpe_ratio = round(max(0.5, (fitness / 100.0) * 2.8), 2)
    estimated_apy_pct = round(max(2.0, (fitness / 100.0) * 18.5), 2)
    risk_score = round(max(1.0, min(10.0, (parameters.maxSlippageBps / 10.0) + (parameters.stopLossBps / 100.0))), 1)

    ci_low = round(max(0.0, estimated_apy_pct * 0.85), 2)
    ci_high = round(estimated_apy_pct * 1.15, 2)

    return fitness, sharpe_ratio, estimated_apy_pct, risk_score, (ci_low, ci_high)

