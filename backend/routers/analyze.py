
from fastapi import APIRouter, HTTPException, Depends, Query
import asyncio
from typing import Dict, List, Optional

from schemas.analyze import AnalyzeRequest, AnalyzeResponse
from models.database import db, add_notification
from utils.helper import generate_response, simulate_delay, generate_id

router = APIRouter(prefix="/analyze")

@router.post("", response_model=Dict)
async def analyze_project(request: AnalyzeRequest, user_id: str = "user_1"):
    """
    Analyze a Web3 project and return structured information
    """
    project_name = request.project_name
    
    # Check if project exists in our database
    if project_name not in db["projects"]:
        # For demo, we'll accept any project name but return generic data
        project_data = {
            "about_project": f"{project_name} is an innovative Web3 project.",
            "tokenomics": "Token distribution information not available.",
            "roadmap": "Roadmap information not available.",
            "backers": ["Unknown investors"],
            "team": ["Team information not available"]
        }
    else:
        project_data = db["projects"][project_name]
    
    # Simulate fetching data with delays
    response = {"project_name": project_name}
    sections_completed = 0
    
    for section, content in project_data.items():
        # Simulate delay for each section
        await simulate_delay(0.5, 1.5)
        response[section] = content
        sections_completed += 1
        
        # Add a notification after project analysis completes
        if sections_completed == len(project_data):
            add_notification(
                user_id,
                f"Analysis completed for {project_name}",
                f"All {sections_completed} sections have been analyzed and are ready to view.",
                "success"
            )
    
    response["sections_completed"] = sections_completed
    response["total_sections"] = len(project_data)
    
    return generate_response(
        data=response,
        message=f"Successfully analyzed {project_name}"
    )
