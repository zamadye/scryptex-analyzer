
from fastapi import APIRouter, HTTPException
import random
from datetime import datetime, timedelta
from typing import Dict, List

from schemas.twitter import TwitterRequest, TwitterResponse, Tweet
from models.database import db, add_notification
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/twitter")

@router.post("", response_model=Dict)
async def generate_twitter_plan(request: TwitterRequest, user_id: str = "user_1"):
    """
    Generate a Twitter content plan based on project information
    """
    # Simulate delay
    await simulate_delay()
    
    project_name = request.project_name
    twitter_handle = request.twitter_handle
    
    # Get project features or use generic ones
    features = db["project_features"].get(project_name, ["innovation", "technology", "community", "scalability", "security"])
    
    # Generate tweets
    tweets = []
    now = datetime.now()
    
    for i in range(3):
        # Pick random template and feature
        template = random.choice(db["twitter_templates"])
        feature = random.choice(features)
        
        # Format the tweet content
        content = template.format(project=project_name, feature=feature)
        
        # Determine tweet type
        tweet_types = ["post", "retweet", "like"]
        weights = [0.5, 0.3, 0.2]  # Weighted probabilities
        tweet_type = random.choices(tweet_types, weights=weights, k=1)[0]
        
        # Schedule time (spread over next 7 days)
        scheduled_time = now + timedelta(
            days=random.randint(i, i+2),
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59)
        )
        
        tweets.append({
            "content": content,
            "type": tweet_type,
            "scheduled_time": scheduled_time.isoformat()
        })
    
    response = {
        "project_name": project_name,
        "twitter_handle": twitter_handle,
        "tweets": tweets
    }
    
    add_notification(
        user_id,
        "Twitter content plan generated",
        f"Created {len(tweets)} tweets for {project_name}",
        "success"
    )
    
    return generate_response(data=response, message="Twitter content plan generated successfully")

@router.post("/schedule", response_model=Dict)
async def schedule_tweet(tweet_id: str, user_id: str = "user_1"):
    """
    Schedule a specific tweet
    """
    # Simulate delay
    await simulate_delay()
    
    scheduled_time = datetime.now() + timedelta(hours=random.randint(1, 24))
    
    response = {
        "tweet_id": tweet_id,
        "status": "scheduled",
        "scheduled_time": scheduled_time.isoformat()
    }
    
    add_notification(
        user_id,
        "Tweet scheduled",
        f"Tweet will be posted at {scheduled_time.strftime('%Y-%m-%d %H:%M')}",
        "info"
    )
    
    return generate_response(data=response, message="Tweet scheduled successfully")

@router.get("/history", response_model=Dict)
async def get_twitter_history(user_id: str = "user_1"):
    """
    Get history of scheduled and posted tweets
    """
    # Simulate delay
    await simulate_delay()
    
    # Generate dummy history data
    history = []
    now = datetime.now()
    
    projects = list(db["projects"].keys())
    status_options = ["posted", "scheduled", "failed"]
    
    for i in range(5):
        project = random.choice(projects)
        feature = random.choice(db["project_features"].get(project, ["feature"]))
        template = random.choice(db["twitter_templates"])
        content = template.format(project=project, feature=feature)
        
        status = random.choices(status_options, weights=[0.7, 0.2, 0.1], k=1)[0]
        
        history.append({
            "id": f"tweet-{random.randint(1000, 9999)}",
            "content": content,
            "project": project,
            "status": status,
            "timestamp": (now - timedelta(days=random.randint(0, 14))).isoformat(),
            "engagement": {
                "likes": random.randint(0, 100),
                "retweets": random.randint(0, 30),
                "replies": random.randint(0, 20)
            } if status == "posted" else None
        })
    
    # Sort by timestamp (newest first)
    history.sort(key=lambda x: x["timestamp"], reverse=True)
    
    return generate_response(data=history, message="Twitter history retrieved successfully")
