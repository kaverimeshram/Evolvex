"""
EvolveX AI Decision Engine Routes
Autonomous Intelligence. Continuous Evolution.
"""

from fastapi import APIRouter
from schemas.strategy import (
    AnalyzeEventRequest,
    AnalyzeEventResponse,
    GenerateStrategyRequest,
    GenerateStrategyResponse,
    EvaluateStrategyRequest,
    EvaluateStrategyResponse,
)
from services.analyzer import StrategyAnalysisService

router = APIRouter()
service = StrategyAnalysisService()


@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "evolvex-ai-engine",
        "version": "0.1.0",
        "architecture": "modular (placeholder baseline active)",
        "disclaimer": "Initial mock/heuristic implementation. No trained ML model claimed.",
    }


@router.post("/analyze", response_model=AnalyzeEventResponse)
def analyze_event(req: AnalyzeEventRequest):
    return service.analyze_event(req)


@router.post("/generate-strategy", response_model=GenerateStrategyResponse)
def generate_strategy(req: GenerateStrategyRequest):
    return service.generate_strategy(req)


@router.post("/evaluate-strategy", response_model=EvaluateStrategyResponse)
def evaluate_strategy(req: EvaluateStrategyRequest):
    return service.evaluate_strategy(req)

