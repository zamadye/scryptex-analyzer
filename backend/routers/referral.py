
from fastapi import APIRouter, HTTPException
from typing import Dict

from schemas.referral import ReferralRequest, ReferralResponse
from models.database import db, add_referral, get_referral_stats, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/referral")

@router.get("", response_model=Dict)
async def get_user_referrals(user_id: str = "user_1"):
    """
    Get referral stats for current user
    """
    # Simulate delay
    await simulate_delay()
    
    # Get referral stats
    stats = get_referral_stats(user_id)
    
    return generate_response(
        data=stats,
        message="Referral stats retrieved successfully"
    )

@router.post("", response_model=Dict)
async def refer_user(request: ReferralRequest, user_id: str = "user_1"):
    """
    Refer a new user
    """
    # Simulate delay
    await simulate_delay()
    
    # Process referral
    success = add_referral(user_id, request.referee_email)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to process referral")
    
    # Get updated stats
    stats = get_referral_stats(user_id)
    
    add_notification(
        user_id,
        "Referral successful!",
        f"You earned 10 credits for referring {request.referee_email}",
        "success"
    )
    
    return generate_response(
        data=stats,
        message="Referral processed successfully"
    )
