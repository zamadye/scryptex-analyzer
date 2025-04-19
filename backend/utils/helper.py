
from datetime import datetime, timedelta
import random
import asyncio
from typing import Any, Dict, List, Optional

def generate_response(data: Any = None, message: str = "Success", success: bool = True) -> Dict:
    """Generate a standardized API response"""
    return {
        "success": success,
        "message": message,
        "data": data,
        "timestamp": datetime.now().isoformat()
    }

async def simulate_delay(min_seconds: float = 0.5, max_seconds: float = 2.0) -> None:
    """Simulate a processing delay"""
    delay = random.uniform(min_seconds, max_seconds)
    await asyncio.sleep(delay)

def generate_id() -> str:
    """Generate a random ID"""
    return f"{random.randint(10000, 99999)}-{random.randint(1000, 9999)}"
