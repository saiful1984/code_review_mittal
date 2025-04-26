from fastapi import APIRouter, Request, Depends, HTTPException, status, Cookie, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from typing import Dict, List, Optional, Any
import os
from datetime import datetime, timedelta

# Import session management
from api.session import get_current_user_from_session, sessions

# Create router
dashboard_router = APIRouter()

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Mock data for demo purposes - replace with database in production
mock_reviews = [
    {
        "id": 1,
        "repo": "acme/project-x",
        "pr_number": 42,
        "title": "Add user authentication",
        "author": "developer1",
        "status": "completed",
        "issues_found": 3,
        "created_at": (datetime.now() - timedelta(days=2)).isoformat(),
        "completed_at": (datetime.now() - timedelta(days=1)).isoformat(),
    },
    {
        "id": 2,
        "repo": "acme/project-x",
        "pr_number": 45,
        "title": "Fix security vulnerability in login",
        "author": "developer2",
        "status": "in_progress",
        "issues_found": None,
        "created_at": (datetime.now() - timedelta(hours=5)).isoformat(),
        "completed_at": None,
    },
    {
        "id": 3,
        "repo": "acme/project-y",
        "pr_number": 12,
        "title": "Refactor database models",
        "author": "developer3",
        "status": "completed",
        "issues_found": 7,
        "created_at": (datetime.now() - timedelta(days=5)).isoformat(),
        "completed_at": (datetime.now() - timedelta(days=4)).isoformat(),
    },
]

# Dashboard home
@dashboard_router.get("/", response_class=HTMLResponse)
async def dashboard_home(request: Request, user: Optional[Dict[str, Any]] = Depends(get_current_user_from_session)):
    """
    Render the dashboard home page.
    Requires authentication.
    """
    # Check if user is authenticated
    if not user:
        return RedirectResponse(url="/login", status_code=303)

    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "user": user,
            "reviews": mock_reviews,
            "total_reviews": len(mock_reviews),
            "completed_reviews": sum(1 for r in mock_reviews if r["status"] == "completed"),
            "in_progress_reviews": sum(1 for r in mock_reviews if r["status"] == "in_progress"),
            "total_issues": sum(r["issues_found"] or 0 for r in mock_reviews),
        }
    )

# Review details
@dashboard_router.get("/reviews/{review_id}", response_class=HTMLResponse)
async def review_details(
    request: Request,
    review_id: int,
    user: Optional[Dict[str, Any]] = Depends(get_current_user_from_session)
):
    """
    Render the review details page.
    Requires authentication.
    """
    # Check if user is authenticated
    if not user:
        return RedirectResponse(url="/login", status_code=303)

    # Find the review by ID
    review = next((r for r in mock_reviews if r["id"] == review_id), None)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {review_id} not found"
        )

    # Mock review comments
    mock_comments = [
        {
            "file": "src/auth/login.js",
            "line": 42,
            "comment": "This authentication logic has a potential security vulnerability. Consider using a more secure hashing algorithm.",
            "severity": "high",
        },
        {
            "file": "src/models/user.js",
            "line": 15,
            "comment": "This database query is not properly parameterized, which could lead to SQL injection attacks.",
            "severity": "high",
        },
        {
            "file": "src/utils/helpers.js",
            "line": 78,
            "comment": "This function has a potential memory leak. Consider using a more efficient data structure.",
            "severity": "medium",
        },
    ]

    return templates.TemplateResponse(
        "review_details.html",
        {
            "request": request,
            "user": user,
            "review": review,
            "comments": mock_comments,
        }
    )
