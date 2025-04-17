
from fastapi import APIRouter, HTTPException, Query, Path, Depends
from typing import List, Optional

from schemas.analyze import ProjectAnalyzeRequest, ProjectAnalysisResult, FetcherRequest
from utils.helper import generate_response

router = APIRouter(prefix="/analyze")

@router.post("", response_model=dict)
async def analyze_project(request: ProjectAnalyzeRequest):
    """
    Analyze a crypto project based on its name and website
    """
    # Mock response, implement actual logic later
    return generate_response(
        data={"project_id": "mock-project-id"}, 
        message="Project analysis initiated"
    )

@router.get("/{project_id}", response_model=dict)
async def get_project_analysis(project_id: str = Path(..., description="Project ID")):
    """
    Get analysis results for a specific project
    """
    # Mock response, implement actual logic later
    return generate_response(
        data={
            "project_id": project_id,
            "name": "Mock Project",
            "description": "This is a mock project analysis",
            "score": 75.5,
            "analysis_date": "2023-11-01T12:00:00",
            "fetchers_available": ["tokenomics", "roadmap", "backers", "social", "airdrop"]
        },
        message="Analysis retrieved successfully"
    )

@router.get("/fetcher/{project_id}/{fetcher_type}", response_model=dict)
async def get_fetcher_data(
    project_id: str = Path(..., description="Project ID"),
    fetcher_type: str = Path(..., description="Fetcher type")
):
    """
    Get specific fetcher data for a project (tokenomics, roadmap, etc)
    """
    # Validate fetcher type
    valid_fetchers = ["tokenomics", "roadmap", "backers", "social", "airdrop"]
    if fetcher_type not in valid_fetchers:
        raise HTTPException(status_code=400, detail=f"Invalid fetcher type. Must be one of: {', '.join(valid_fetchers)}")
    
    # Mock response, implement actual logic later
    return generate_response(
        data={
            "project_id": project_id,
            "fetcher_type": fetcher_type,
            "result": f"Mock {fetcher_type} data for project"
        },
        message=f"{fetcher_type.capitalize()} data retrieved successfully"
    )
