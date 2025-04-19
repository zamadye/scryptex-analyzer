
from fastapi import APIRouter, HTTPException, Depends, Body
import random
from typing import Dict, List, Optional

from schemas.farming import FarmingRequest, FarmingResponse, AddChainRequest, FarmingTask
from models.database import db, get_user_wallet, connect_wallet, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/farming")

@router.post("", response_model=Dict)
async def get_farming_tasks(request: FarmingRequest, user_id: str = "user_1"):
    """
    Get farming tasks for a given project
    """
    project_name = request.project_name
    
    # Simulate delay
    await simulate_delay()
    
    # Check wallet connection status
    wallet = get_user_wallet(user_id)
    status = "ready" if wallet else "wallet not connected"
    
    # Get tasks for the project or generate random ones
    if project_name in db["farming_tasks"]:
        tasks = db["farming_tasks"][project_name]
    else:
        # Generate random tasks
        task_types = ["swap", "mint", "lp", "bridge", "stake"]
        tasks = []
        for _ in range(random.randint(2, 4)):
            task_type = random.choice(task_types)
            tasks.append({
                "type": task_type,
                "description": f"{task_type.capitalize()} on {project_name}",
                "credits": random.randint(5, 15)
            })
    
    # Get a random chain for the project
    chain = random.choice(db["chains"])["name"]
    
    response = {
        "project_name": project_name,
        "tasks": tasks,
        "chain": chain,
        "status": status
    }
    
    add_notification(
        user_id,
        f"Farming tasks identified for {project_name}",
        f"{len(tasks)} tasks available on {chain}.",
        "info"
    )
    
    return generate_response(data=response, message="Farming tasks retrieved successfully")

@router.post("/connect-wallet", response_model=Dict)
async def connect_user_wallet(wallet_address: str = Body(..., embed=True), user_id: str = "user_1"):
    """
    Connect wallet to user account
    """
    # Simulate delay
    await simulate_delay()
    
    # Connect the wallet
    wallet = connect_wallet(user_id, wallet_address)
    
    add_notification(
        user_id,
        "Wallet connected successfully",
        f"Wallet {wallet_address[:6]}...{wallet_address[-4:]} is now connected to your account.",
        "success"
    )
    
    return generate_response(data=wallet, message="Wallet connected successfully")

@router.post("/add-chain", response_model=Dict)
async def add_new_chain(request: AddChainRequest, user_id: str = "user_1"):
    """
    Add a new chain manually
    """
    # Simulate delay
    await simulate_delay()
    
    # Check if chain already exists
    for chain in db["chains"]:
        if chain["chain_id"] == request.chain_id:
            return generate_response(
                data=chain,
                message="Chain already exists"
            )
    
    # Add new chain
    new_chain = {
        "name": request.chain_name,
        "chain_id": request.chain_id,
        "currency": request.currency,
        "rpc": request.rpc_url
    }
    
    db["chains"].append(new_chain)
    
    add_notification(
        user_id,
        f"New chain added: {request.chain_name}",
        f"Chain ID: {request.chain_id}",
        "success"
    )
    
    return generate_response(data=new_chain, message="Chain added successfully")
