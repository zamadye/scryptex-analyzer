
from pydantic import BaseModel, HttpUrl, Field
from typing import Dict, List, Optional

class AnalyzeRequest(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=100)
    website: Optional[HttpUrl] = None

class AnalysisSection(BaseModel):
    title: str
    content: str
    status: str = "completed"

class AnalyzeResponse(BaseModel):
    project_name: str
    about_project: Optional[str] = None
    tokenomics: Optional[str] = None
    roadmap: Optional[str] = None
    backers: Optional[List[str]] = None
    team: Optional[List[str]] = None
    sections_completed: int = 0
    total_sections: int = 5
