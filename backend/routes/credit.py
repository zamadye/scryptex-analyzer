
from fastapi import APIRouter, HTTPException, Path, Query, Depends
from typing import List, Optional

from utils.helper import generate_response
from schemas.user import CreditLog, ReferralInfo

router = APIRouter(prefix="/credit")

@router.get("", response_model=dict)
async def get_credit_balance():
    """
    Get user's current credit balance
    """
    # Mock response, implement actual logic later
    return generate_response(
        data={
            "credits": 15,
            "free_daily_credits": 1,
            "credits_expiring_soon": 0
        },
        message="Credit balance retrieved successfully"
    )

@router.post("/use", response_model=dict)
async def use_credit(
    amount: int = Query(1, description="Amount of credits to use"),
    action: str = Query(..., description="Action requiring credits (analyze, farming, twitter)")
):
    """
    Use credits for a specific action
    """
    # Mock response, implement actual logic later
    return generate_response(
        data={
            "remaining_credits": 14,
            "action": action
        },
        message="Credits used successfully"
    )

@router.post("/topup", response_model=dict)
async def topup_credits(
    package: str = Query(..., description="Credit package (small, medium, large)"),
    coupon_code: Optional[str] = Query(None, description="Optional coupon or referral code")
):
    """
    Top up user credits (dummy endpoint)
    """
    # Mock response, implement actual logic later
    package_credits = {
        "small": 10,
        "medium": 50,
        "large": 100
    }
    
    credits = package_credits.get(package, 0)
    discount = 0
    
    if coupon_code:
        discount = 10  # Example 10% discount
    
    return generate_response(
        data={
            "transaction_id": "mock-transaction-id",
            "package": package,
            "credits_added": credits,
            "discount_applied": discount,
            "new_balance": 25
        },
        message="Credits topped up successfully"
    )

@router.get("/log", response_model=dict)
async def get_credit_log():
    """
    Get log of credit usage and top-ups
    """
    # Mock response, implement actual logic later
    return generate_response(
        data=[
            {
                "action": "use",
                "amount": 1,
                "description": "Analyze Project XYZ",
                "timestamp": "2023-11-01T10:15:00"
            },
            {
                "action": "topup",
                "amount": 10,
                "description": "Small package purchase",
                "timestamp": "2023-10-28T16:30:00"
            }
        ],
        message="Credit log retrieved successfully"
    )

@router.get("/referral", response_model=dict)
async def get_referral_info():
    """
    Get user's referral information
    """
    # Mock response, implement actual logic later
    return generate_response(
        data={
            "code": "SCRYXYZ123",
            "url": "https://scryptex.app/ref/SCRYXYZ123",
            "referred_count": 3,
            "total_earned": 15,
            "weekly_limit_remaining": 3
        },
        message="Referral information retrieved successfully"
    )
