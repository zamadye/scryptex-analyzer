
from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Optional
import secrets
from datetime import datetime, timedelta

from schemas.user import UserCreate, UserLogin, UserResponse, Session
from models.database import db, get_user_by_email, create_user, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/auth")

@router.post("/signup", response_model=Dict)
async def signup(user: UserCreate):
    """
    Create a new user account
    """
    # Simulate delay
    await simulate_delay()
    
    # Check if email already exists
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    new_user = create_user(user.username, user.email, user.password)
    
    # Generate token
    token = secrets.token_hex(32)
    expires = datetime.now() + timedelta(days=30)
    
    # Store session
    db["sessions"][token] = {
        "user_id": new_user["id"],
        "expires_at": expires.isoformat()
    }
    
    # Add welcome notification
    add_notification(
        new_user["id"],
        "Welcome to Scryptex!",
        "Thank you for joining. Start by exploring the dashboard.",
        "success"
    )
    
    return generate_response(
        data={
            "user": {
                "id": new_user["id"],
                "username": new_user["username"],
                "email": new_user["email"]
            },
            "token": token,
            "expires_at": expires.isoformat()
        },
        message="User registered successfully"
    )

@router.post("/login", response_model=Dict)
async def login(credentials: UserLogin):
    """
    Log in with email and password
    """
    # Simulate delay
    await simulate_delay()
    
    # Check if user exists
    user = get_user_by_email(credentials.email)
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Generate token
    token = secrets.token_hex(32)
    expires = datetime.now() + timedelta(days=30)
    
    # Store session
    db["sessions"][token] = {
        "user_id": user["id"],
        "expires_at": expires.isoformat()
    }
    
    return generate_response(
        data={
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
            },
            "token": token,
            "expires_at": expires.isoformat()
        },
        message="Login successful"
    )

@router.get("/me", response_model=Dict)
async def get_current_user(token: str = None):
    """
    Get current user profile from token
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    # Check if token is valid
    if not token or token not in db["sessions"]:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    session = db["sessions"][token]
    
    # Check if token is expired
    expires_at = datetime.fromisoformat(session["expires_at"])
    if expires_at < datetime.now():
        db["sessions"].pop(token)
        raise HTTPException(status_code=401, detail="Token expired")
    
    # Get user
    user_id = session["user_id"]
    user = next((u for u in db["users"].values() if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return generate_response(
        data={
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "created_at": user["created_at"]
        },
        message="User profile retrieved successfully"
    )

@router.post("/logout", response_model=Dict)
async def logout(token: str = None):
    """
    Log out and invalidate token
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    # Remove session if exists
    if token and token in db["sessions"]:
        db["sessions"].pop(token)
    
    return generate_response(
        data=None,
        message="Logged out successfully"
    )
