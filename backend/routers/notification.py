
from fastapi import APIRouter, HTTPException
from typing import Dict, List

from schemas.notification import NotificationCreate, NotificationResponse
from models.database import db, add_notification, get_user_notifications
from utils.helper import generate_response, simulate_delay

router = APIRouter(prefix="/notifications")

@router.get("", response_model=Dict)
async def get_notifications(limit: int = 5, user_id: str = "user_1"):
    """
    Get latest notifications for user
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    # Get notifications
    notifications = get_user_notifications(user_id, limit)
    
    return generate_response(
        data=notifications,
        message="Notifications retrieved successfully"
    )

@router.post("", response_model=Dict)
async def create_notification(notification: NotificationCreate, user_id: str = "user_1"):
    """
    Create a new notification
    """
    # Simulate delay
    await simulate_delay()
    
    # Add notification
    new_notification = add_notification(
        user_id,
        notification.title,
        notification.message,
        notification.type
    )
    
    return generate_response(
        data=new_notification,
        message="Notification created successfully"
    )

@router.post("/mark-read", response_model=Dict)
async def mark_notification_read(notification_id: str = None, all: bool = False, user_id: str = "user_1"):
    """
    Mark notification(s) as read
    """
    # Simulate delay
    await simulate_delay(0.2, 0.5)
    
    # Get user notifications
    user_notifications = [n for n in db["notifications"] if n["user_id"] == user_id]
    
    if all:
        # Mark all as read
        for notif in user_notifications:
            notif["read"] = True
        
        return generate_response(
            data={"marked_count": len(user_notifications)},
            message="All notifications marked as read"
        )
    
    if not notification_id:
        raise HTTPException(status_code=400, detail="Notification ID required")
    
    # Find specific notification
    notification = next((n for n in user_notifications if n["id"] == notification_id), None)
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification["read"] = True
    
    return generate_response(
        data=notification,
        message="Notification marked as read"
    )

@router.delete("/{notification_id}", response_model=Dict)
async def delete_notification(notification_id: str, user_id: str = "user_1"):
    """
    Delete a notification
    """
    # Simulate delay
    await simulate_delay()
    
    # Find notification index
    for i, notif in enumerate(db["notifications"]):
        if notif["id"] == notification_id and notif["user_id"] == user_id:
            # Remove notification
            db["notifications"].pop(i)
            return generate_response(
                data={"id": notification_id},
                message="Notification deleted successfully"
            )
    
    raise HTTPException(status_code=404, detail="Notification not found")
