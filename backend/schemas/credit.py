
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class PaymentMethod(str, Enum):
    onchain = "onchain"
    offchain = "offchain"

class FeatureType(str, Enum):
    analyze = "analyze"
    farming = "farming"
    twitter = "twitter"
    airdrop = "airdrop"

class CreditBuyRequest(BaseModel):
    method: PaymentMethod
    amount: int = Field(..., gt=0)

class CreditConsumeRequest(BaseModel):
    feature_type: FeatureType
    amount: int = Field(1, gt=0)

class CreditResponse(BaseModel):
    user_id: str
    balance: int
    transaction_successful: bool = True
