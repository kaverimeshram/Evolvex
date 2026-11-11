"""
EvolveX Predefined Safety Constraints & Risk Rules
Autonomous Intelligence. Continuous Evolution.
"""

from typing import List, Tuple
from schemas.strategy import StrategyParameters, RiskConstraints


def validate_risk_constraints(
    parameters: StrategyParameters,
    constraints: RiskConstraints
) -> Tuple[bool, List[str]]:
    """
    Validates candidate strategy parameters against predefined hard safety constraints.
    Returns (is_valid, list_of_violations).
    """
    violations: List[str] = []

    # 1. Circuit Breaker Check
    if constraints.circuitBreakerActive:
        violations.append("Global circuit breaker is active. Strategy execution halted.")

    # 2. Slippage Constraints
    if parameters.maxSlippageBps > constraints.maxSingleTxSlippageBps:
        violations.append(
            f"Strategy max slippage ({parameters.maxSlippageBps} bps) exceeds "
            f"allowed constraint ceiling ({constraints.maxSingleTxSlippageBps} bps)."
        )

    # 3. Stop-Loss Configuration Check
    if parameters.stopLossBps > 1000:  # > 10%
        violations.append(
            f"Stop-loss limit ({parameters.stopLossBps} bps) is too wide. "
            "Maximum allowed risk threshold is 1000 bps (10%)."
        )

    # 4. Pool allocation validity
    total_allocation = sum(parameters.targetPoolAllocationPct.values())
    if abs(total_allocation - 100.0) > 0.1:
        violations.append(
            f"Pool allocation percentages must sum to 100.0% (current sum: {total_allocation}%)."
        )

    return (len(violations) == 0, violations)

