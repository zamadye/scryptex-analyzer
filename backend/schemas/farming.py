
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict

class FarmingTask(BaseModel):
    type: str
    description: str
    credits: int

class FarmingRequest(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=100)
    website: Optional[HttpUrl] = None
    
class AddChainRequest(BaseModel):
    chain_name: str
    chain_id: int
    currency: str
    rpc_url: str

class FarmingResponse(BaseModel):
    project_name: str
    tasks: List[FarmingTask]
    chain: str
    status: str = "wallet not connected"
