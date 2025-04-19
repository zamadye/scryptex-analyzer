
from fastapi import APIRouter, HTTPException
from typing import Dict

from schemas.credit import CreditBuyRequest, CreditConsumeRequest, CreditResponse
from models.database import db, get_user_credits, add_credits, consume_credits, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/credit")

@router.get("", response_model=Dict)
async def get_credits(user_id: str = "user_1"):
    """
    Get user credit balance
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    credits = get_user_credits(user_id)
    
    return generate_response(
        data={"user_id": user_id, "balance": credits},
        message="Credit balance retrieved successfully"
    )

@router.post("/buy", response_model=Dict)
async def buy_credits(request: CreditBuyRequest, user_id: str = "user_1"):
    """
    Buy credits using onchain or offchain payment
    """
    # Simulate delay
    await simulate_delay()
    
    # Simulate payment processing
    amount = request.amount
    method = request.method
    
    # Add credits to user account
    new_balance = add_credits(user_id, amount)
    
    add_notification(
        user_id,
        f"Credits purchased: {amount}",
        f"Payment method: {method}. New balance: {new_balance}",
        "success"
    )
    
    return generate_response(
        data={
            "user_id": user_id,
            "purchased": amount,
            "balance": new_balance,
            "transaction_successful": True,
            "payment_method": method
        },
        message=f"Successfully purchased {amount} credits"
    )

@router.post("/consume", response_model=Dict)
async def consume_user_credits(request: CreditConsumeRequest, user_id: str = "user_1"):
    """
    Consume credits for using a feature
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    feature_type = request.feature_type
    amount = request.amount
    
    # Try to consume credits
    success = consume_credits(user_id, amount)
    
    if not success:
        return generate_response(
            data={
                "user_id": user_id,
                "balance": get_user_credits(user_id),
                "transaction_successful": False
            },
            message="Insufficient credits",
            success=False
        )
    
    # Get updated balance
    new_balance = get_user_credits(user_id)
    
    add_notification(
        user_id,
        f"Credits used: {amount}",
        f"Feature: {feature_type}. Remaining balance: {new_balance}",
        "info"
    )
    
    return generate_response(
        data={
            "user_id": user_id,
            "consumed": amount,
            "balance": new_balance,
            "feature_used": feature_type,
            "transaction_successful": True
        },
        message=f"Successfully consumed {amount} credits for {feature_type}"
    )
