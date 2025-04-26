from fastapi import APIRouter, Request, Depends, HTTPException, status, BackgroundTasks
from fastapi.responses import JSONResponse
import hmac
import hashlib
import os
import json
from typing import Dict, Any, List
import httpx
from datetime import datetime

from api.auth import get_current_user
from services.github_service import fetch_pr_diff, post_review_comment
from services.llm_service import analyze_code

# Create router
github_router = APIRouter()

# Verify GitHub webhook signature
def verify_signature(request_body: bytes, signature_header: str) -> bool:
    """Verify that the webhook is from GitHub using the webhook secret."""
    if not signature_header:
        return False
    
    # Get the webhook secret from environment variables
    webhook_secret = os.getenv("GITHUB_WEBHOOK_SECRET", "").encode()
    if not webhook_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GITHUB_WEBHOOK_SECRET not configured"
        )
    
    # Calculate expected signature
    signature = hmac.new(webhook_secret, request_body, hashlib.sha256).hexdigest()
    expected_signature = f"sha256={signature}"
    
    # Compare signatures
    return hmac.compare_digest(expected_signature, signature_header)

# Process PR event in the background
async def process_pr_event(payload: Dict[Any, Any]):
    """Process a pull request event in the background."""
    try:
        # Extract PR information
        pr_number = payload["pull_request"]["number"]
        repo_name = payload["repository"]["full_name"]
        
        # Fetch PR diff
        diff_content = await fetch_pr_diff(repo_name, pr_number)
        
        # Analyze code with LLM
        analysis_results = await analyze_code(diff_content)
        
        # Post review comments
        for result in analysis_results:
            await post_review_comment(
                repo_name=repo_name,
                pr_number=pr_number,
                commit_id=payload["pull_request"]["head"]["sha"],
                path=result["file_path"],
                position=result["position"],
                body=result["comment"]
            )
            
        # Log success
        print(f"Successfully processed PR #{pr_number} for {repo_name}")
        
    except Exception as e:
        # Log error
        print(f"Error processing PR event: {str(e)}")

# GitHub webhook endpoint
@github_router.post("/webhook")
async def github_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Handle GitHub webhook events.
    Currently supports pull_request events.
    """
    # Get the raw request body
    body = await request.body()
    
    # Verify signature
    signature_header = request.headers.get("X-Hub-Signature-256", "")
    if not verify_signature(body, signature_header):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid signature"
        )
    
    # Parse the payload
    payload = json.loads(body)
    
    # Get the event type
    event_type = request.headers.get("X-GitHub-Event", "")
    
    # Handle pull request events
    if event_type == "pull_request":
        # Check if it's an opened or synchronize event
        action = payload.get("action", "")
        if action in ["opened", "synchronize"]:
            # Process PR in the background
            background_tasks.add_task(process_pr_event, payload)
            return JSONResponse(
                status_code=status.HTTP_202_ACCEPTED,
                content={"message": f"Processing PR #{payload['pull_request']['number']}"}
            )
    
    # Return 200 for other events
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": f"Received {event_type} event"}
    )

# Manually trigger a review for a PR
@github_router.post("/review/{owner}/{repo}/{pr_number}")
async def trigger_review(
    owner: str,
    repo: str,
    pr_number: int,
    background_tasks: BackgroundTasks,
    current_user: Dict = Depends(get_current_user)
):
    """
    Manually trigger a review for a specific PR.
    Requires authentication.
    """
    try:
        # Fetch PR information from GitHub
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}",
                headers={"Accept": "application/vnd.github.v3+json"}
            )
            response.raise_for_status()
            pr_data = response.json()
        
        # Create a simplified payload
        payload = {
            "action": "manual_trigger",
            "pull_request": {
                "number": pr_number,
                "head": {"sha": pr_data["head"]["sha"]}
            },
            "repository": {
                "full_name": f"{owner}/{repo}"
            }
        }
        
        # Process PR in the background
        background_tasks.add_task(process_pr_event, payload)
        
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content={"message": f"Processing PR #{pr_number} for {owner}/{repo}"}
        )
        
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"GitHub API error: {e.response.text}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error: {str(e)}"
        )
