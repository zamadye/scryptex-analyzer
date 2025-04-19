
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NotificationCreate(BaseModel):
    title: str
    message: str
    type: str = "info"

class NotificationResponse(BaseModel):
    id: str
    title: str
    message: str
    type: str
    read: bool
    timestamp: datetime
