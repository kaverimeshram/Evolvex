"""
Unit tests for EvolveX AI Decision Engine
"""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

SAMPLE_PARAMS = {
    "rebalanceThresholdPct": 2.5,
    "maxSlippageBps": 50,
    "gasCeilingGwei": 35.0,
    "targetPoolAllocationPct": {"WETH-USDC": 60.0, "WBTC-USDC": 40.0},
    "stopLossBps": 200,
    "takeProfitBps": 450,
    "urgencyMultiplier": 1.0,
}


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert data["service"] == "evolvex-ai-engine"


def test_analyze():
    payload = {
        "chainId": 5318008,
        "contractAddress": "0x00000000000000000000000000000000000000ff",
        "eventSignature": "CallbackDispatched(uint256,address,bytes)",
        "blockNumber": 1420912,
        "payload": {"divergenceBps": 45.0, "trigger": "UniswapV3Divergence"},
    }
    res = client.post("/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["actionRequired"] is True
    assert data["isMockSimulation"] is True
    assert "divergenceBps" in data


def test_generate_strategy():
    payload = {
        "parentStrategyId": "str-001",
        "parentParameters": SAMPLE_PARAMS,
        "optimizationTarget": "GAS_EFFICIENCY",
        "marketRegime": "SIDEWAYS",
        "mutationRate": 0.1,
    }
    res = client.post("/generate-strategy", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["parentStrategyId"] == "str-001"
    assert "generatedParameters" in data
    assert data["mutationType"] == "GAS_OPTIMIZATION"
    assert data["isMockSimulation"] is True


def test_evaluate_strategy():
    payload = {
        "strategyId": "str-001",
        "parameters": SAMPLE_PARAMS,
        "historicalWindowHours": 24,
    }
    res = client.post("/evaluate-strategy", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["strategyId"] == "str-001"
    assert data["fitnessScore"] > 0
    assert data["safetyChecksPassed"] is True

