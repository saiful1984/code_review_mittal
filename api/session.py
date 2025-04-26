from typing import Dict, Optional, Any
from fastapi import Cookie, Depends

# Session storage
sessions = {}

async def get_current_user_from_session(session_id: Optional[str] = Cookie(None)) -> Optional[Dict[str, Any]]:
    """Get the current user from the session cookie."""
    if session_id and session_id in sessions:
        return sessions[session_id]
    return None
