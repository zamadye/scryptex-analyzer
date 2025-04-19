
from fastapi import APIRouter, HTTPException
from typing import Dict, List

from schemas.airdrop import AirdropCreate, AirdropResponse
from models.database import db, add_airdrop, get_airdrops, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/airdrops")

@router.get("", response_model=Dict)
async def list_airdrops(status: str = None, user_id: str = "user_1"):
    """
    Get list of active airdrops
    """
    # Simulate delay
    await simulate_delay()
    
    airdrops = get_airdrops()
    
    # Filter by status if provided
    if status:
        airdrops = [a for a in airdrops if a["status"] == status]
    
    return generate_response(data=airdrops, message="Airdrops retrieved successfully")

@router.post("", response_model=Dict)
async def create_airdrop(airdrop: AirdropCreate, user_id: str = "user_1"):
    """
    Create a new airdrop
    """
    # Simulate delay
    await simulate_delay()
    
    # Add status
    airdrop_dict = airdrop.dict()
    airdrop_dict["status"] = "active"
    
    # Add the airdrop
    new_airdrop = add_airdrop(airdrop_dict)
    
    add_notification(
        user_id,
        f"New airdrop added: {airdrop.projectName}",
        f"Deadline: {airdrop.deadline.strftime('%Y-%m-%d')}",
        "info"
    )
    
    return generate_response(data=new_airdrop, message="Airdrop added successfully")

@router.get("/{airdrop_id}", response_model=Dict)
async def get_airdrop(airdrop_id: str, user_id: str = "user_1"):
    """
    Get details of a specific airdrop
    """
    # Simulate delay
    await simulate_delay()
    
    # Find the airdrop
    airdrops = get_airdrops()
    airdrop = next((a for a in airdrops if a["id"] == airdrop_id), None)
    
    if not airdrop:
        raise HTTPException(status_code=404, detail="Airdrop not found")
    
    return generate_response(data=airdrop, message="Airdrop details retrieved successfully")
