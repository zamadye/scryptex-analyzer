
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes import analyze, farming, autopilot, airdrop, credit

app = FastAPI(
    title="Scryptex API",
    description="Backend API for Scryptex Web3 project",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze.router, prefix="/api", tags=["analyze"])
app.include_router(farming.router, prefix="/api", tags=["farming"])
app.include_router(autopilot.router, prefix="/api", tags=["autopilot"])
app.include_router(airdrop.router, prefix="/api", tags=["airdrop"])
app.include_router(credit.router, prefix="/api", tags=["credit"])

@app.get("/")
async def root():
    return {"message": "Welcome to Scryptex API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
