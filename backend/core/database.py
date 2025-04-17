
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

class Database:
    client: AsyncIOMotorClient = None
    
async def connect_to_db():
    """Create database connection."""
    Database.client = AsyncIOMotorClient(settings.MONGO_URI)
    
async def close_db_connection():
    """Close database connection."""
    if Database.client:
        Database.client.close()

# Database collections
def get_collection(collection_name: str):
    """Get a specific collection from the database."""
    return Database.client.scryptex[collection_name]
