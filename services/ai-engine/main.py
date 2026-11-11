"""
EvolveX AI Decision Engine Entrypoint
Autonomous Intelligence. Continuous Evolution.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(
    title="EvolveX AI Engine",
    description="Autonomous AI strategy evolution engine powered by Reactive Network",
    version="0.1.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn

    host = os.getenv("AI_ENGINE_HOST", "0.0.0.0")
    port = int(os.getenv("AI_ENGINE_PORT", "8000"))
    uvicorn.run("main:app", host=host, port=port, reload=True)

