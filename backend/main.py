
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import all routers
from routers import analyze, farming, twitter, credit, airdrop, auth, referral, notification

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
app.include_router(twitter.router, prefix="/api", tags=["twitter"])
app.include_router(credit.router, prefix="/api", tags=["credit"])
app.include_router(airdrop.router, prefix="/api", tags=["airdrop"])
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(referral.router, prefix="/api", tags=["referral"])
app.include_router(notification.router, prefix="/api", tags=["notification"])

# Test route
@app.get("/api/ping")
async def ping():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "Welcome to Scryptex API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
