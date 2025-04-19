
from pydantic import BaseModel, HttpUrl, Field
from typing import Optional
from datetime import datetime

class AirdropBase(BaseModel):
    projectName: str = Field(..., min_length=1, max_length=100)
    link: HttpUrl
    deadline: datetime
    description: str
    chain: str

class AirdropCreate(AirdropBase):
    pass

class AirdropResponse(AirdropBase):
    id: str
    status: str = "active"
