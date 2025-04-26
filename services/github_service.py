import os
import httpx
import json
from typing import Dict, List, Any, Optional
from datetime import datetime

# GitHub API base URL
GITHUB_API_BASE = "https://api.github.com"

# Check if we're in demo mode
DEMO_MODE = os.getenv("GITHUB_APP_ID") == "demo_app_id"

# Get GitHub App credentials from environment variables
GITHUB_APP_ID = os.getenv("GITHUB_APP_ID")
GITHUB_PRIVATE_KEY_PATH = os.getenv("GITHUB_PRIVATE_KEY_PATH")

async def get_github_token() -> str:
    """
    Get a GitHub App installation token.
    For demo purposes, we'll use a simple approach.
    In production, implement proper GitHub App authentication.
    """
    # For demo, return a placeholder
    # In production, implement JWT-based GitHub App authentication
    return "github_token_placeholder"

async def fetch_pr_diff(repo_name: str, pr_number: int) -> str:
    """
    Fetch the diff content for a pull request.
    In demo mode, returns a mock diff.
    """
    # Check if we're in demo mode
    if DEMO_MODE:
        # Return a mock diff for demo purposes
        return """diff --git a/src/auth/login.js b/src/auth/login.js
index 1234567..abcdefg 100644
--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -40,7 +40,7 @@ class AuthService {

   async login(username, password) {
     // Hash the password using MD5
-    const hashedPassword = md5(password);
+    const hashedPassword = md5(password + 'salt');

     // Check credentials
     const user = await this.userRepository.findByCredentials(username, hashedPassword);
diff --git a/src/models/user.js b/src/models/user.js
index 2345678..bcdefgh 100644
--- a/src/models/user.js
+++ b/src/models/user.js
@@ -12,7 +12,7 @@ class UserRepository {

   async findByCredentials(username, password) {
     // Query the database
-    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
+    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`;
     const result = await this.db.query(query);

     return result.rows[0];
diff --git a/src/utils/helpers.js b/src/utils/helpers.js
index 3456789..cdefghi 100644
--- a/src/utils/helpers.js
+++ b/src/utils/helpers.js
@@ -75,7 +75,7 @@ function formatDate(date) {

 function cacheResults(data) {
   // Store results in memory cache
-  const cache = {};
+  const cache = {}; // Consider using a Map for better performance

   for (const item of data) {
     cache[item.id] = item;
"""

    try:
        # Get GitHub token
        token = await get_github_token()

        # Fetch PR diff
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{GITHUB_API_BASE}/repos/{repo_name}/pulls/{pr_number}",
                headers={
                    "Accept": "application/vnd.github.v3.diff",
                    "Authorization": f"token {token}"
                }
            )
            response.raise_for_status()
            return response.text

    except httpx.HTTPStatusError as e:
        print(f"GitHub API error: {e.response.text}")
        raise
    except Exception as e:
        print(f"Error fetching PR diff: {str(e)}")
        raise

async def post_review_comment(
    repo_name: str,
    pr_number: int,
    commit_id: str,
    path: str,
    position: int,
    body: str
) -> Dict[str, Any]:
    """
    Post a review comment on a pull request.
    In demo mode, returns a mock response.
    """
    # Check if we're in demo mode
    if DEMO_MODE:
        # Return a mock response for demo purposes
        print(f"DEMO MODE: Would post comment to {repo_name} PR #{pr_number} at {path}:{position}")
        print(f"Comment body: {body}")

        # Return a mock response
        return {
            "id": 12345,
            "node_id": "mock_node_id",
            "url": f"https://api.github.com/repos/{repo_name}/pulls/comments/12345",
            "pull_request_review_id": 54321,
            "path": path,
            "position": position,
            "commit_id": commit_id,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "body": f"**CodeSage Review**\n\n{body}",
            "html_url": f"https://github.com/{repo_name}/pull/{pr_number}#discussion_r12345"
        }

    try:
        # Get GitHub token
        token = await get_github_token()

        # Create review comment
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{GITHUB_API_BASE}/repos/{repo_name}/pulls/{pr_number}/comments",
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": f"token {token}"
                },
                json={
                    "commit_id": commit_id,
                    "path": path,
                    "position": position,
                    "body": f"**CodeSage Review**\n\n{body}"
                }
            )
            response.raise_for_status()
            return response.json()

    except httpx.HTTPStatusError as e:
        print(f"GitHub API error: {e.response.text}")
        raise
    except Exception as e:
        print(f"Error posting review comment: {str(e)}")
        raise

async def get_pr_files(repo_name: str, pr_number: int) -> List[Dict[str, Any]]:
    """
    Get the list of files changed in a pull request.
    In demo mode, returns mock files.
    """
    # Check if we're in demo mode
    if DEMO_MODE:
        # Return mock files for demo purposes
        return [
            {
                "sha": "abc123",
                "filename": "src/auth/login.js",
                "status": "modified",
                "additions": 1,
                "deletions": 1,
                "changes": 2,
                "patch": "@@ -40,7 +40,7 @@ class AuthService {\n   async login(username, password) {\n     // Hash the password using MD5\n-    const hashedPassword = md5(password);\n+    const hashedPassword = md5(password + 'salt');\n     \n     // Check credentials\n     const user = await this.userRepository.findByCredentials(username, hashedPassword);"
            },
            {
                "sha": "def456",
                "filename": "src/models/user.js",
                "status": "modified",
                "additions": 1,
                "deletions": 1,
                "changes": 2,
                "patch": "@@ -12,7 +12,7 @@ class UserRepository {\n   async findByCredentials(username, password) {\n     // Query the database\n-    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;\n+    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`;\n     const result = await this.db.query(query);\n     \n     return result.rows[0];"
            },
            {
                "sha": "ghi789",
                "filename": "src/utils/helpers.js",
                "status": "modified",
                "additions": 1,
                "deletions": 1,
                "changes": 2,
                "patch": "@@ -75,7 +75,7 @@ function formatDate(date) {\n function cacheResults(data) {\n   // Store results in memory cache\n-  const cache = {};\n+  const cache = {}; // Consider using a Map for better performance\n   \n   for (const item of data) {\n     cache[item.id] = item;"
            }
        ]

    try:
        # Get GitHub token
        token = await get_github_token()

        # Fetch PR files
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{GITHUB_API_BASE}/repos/{repo_name}/pulls/{pr_number}/files",
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": f"token {token}"
                }
            )
            response.raise_for_status()
            return response.json()

    except httpx.HTTPStatusError as e:
        print(f"GitHub API error: {e.response.text}")
        raise
    except Exception as e:
        print(f"Error fetching PR files: {str(e)}")
        raise
