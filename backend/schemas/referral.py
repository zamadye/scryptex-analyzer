
from pydantic import BaseModel, EmailStr, Field

class ReferralRequest(BaseModel):
    referee_email: EmailStr

class ReferralResponse(BaseModel):
    code: str
    link: str
    invites: int
    earned_credits: int
