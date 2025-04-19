
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    created_at: datetime

class Session(BaseModel):
    user_id: str
    access_token: str
    expires_at: datetime

class WalletConnect(BaseModel):
    wallet_address: str = Field(..., min_length=42, max_length=42)

class WalletResponse(BaseModel):
    address: str
    connected_at: datetime
    status: str
