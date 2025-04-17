
from typing import Optional, List
from pydantic import BaseModel, Field, HttpUrl

class ProjectAnalyzeRequest(BaseModel):
    name: str = Field(..., description="Project name")
    website: Optional[HttpUrl] = Field(None, description="Project website URL")
    twitter_handle: Optional[str] = Field(None, description="Project Twitter handle")
    description: Optional[str] = Field(None, description="Project description")

class FetcherRequest(BaseModel):
    project_id: str = Field(..., description="Project ID")
    fetcher_type: str = Field(..., description="Fetcher type (tokenomics, roadmap, backers, social, airdrop)")

class ProjectAnalysisResult(BaseModel):
    project_id: str
    name: str
    description: Optional[str] = None
    score: Optional[float] = None
    analysis_date: str
    fetchers_available: List[str] = []
