
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class TwitterRequest(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=100)
    twitter_handle: str = Field(..., min_length=1)

class Tweet(BaseModel):
    content: str
    type: str  # "post", "like", "retweet"
    scheduled_time: datetime

class TwitterResponse(BaseModel):
    project_name: str
    twitter_handle: str
    tweets: List[Tweet]
