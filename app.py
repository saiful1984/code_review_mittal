import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status, Request, Form, Cookie, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
import os
import secrets
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import our modules
from api.github_webhook import github_router
from api.auth import auth_router, authenticate_user, fake_users_db, create_access_token
from api.dashboard import dashboard_router
from api.session import sessions, get_current_user_from_session

# Templates setup
templates = Jinja2Templates(directory="templates")

# Create FastAPI app
app = FastAPI(
    title="CodeSage API",
    description="API for CodeSage - AI-powered code review platform",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(github_router, prefix="/api/github", tags=["GitHub"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])

# Authentication middleware and routes

# Login page
@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request, error: Optional[str] = None):
    """Render the login page."""
    return templates.TemplateResponse(
        "login.html",
        {"request": request, "error": error}
    )

# Login form submission
@app.post("/login")
async def login(
    response: Response,
    username: str = Form(...),
    password: str = Form(...)
):
    """Handle login form submission."""
    user = authenticate_user(fake_users_db, username, password)
    if not user:
        return templates.TemplateResponse(
            "login.html",
            {"request": {"method": "POST"}, "error": "Invalid username or password"}
        )

    # Create session
    session_id = secrets.token_urlsafe(32)
    sessions[session_id] = {
        "username": user.username,
        "full_name": user.full_name,
        "email": user.email
    }

    # Set session cookie
    response = RedirectResponse(url="/dashboard", status_code=303)
    response.set_cookie(key="session_id", value=session_id, httponly=True)

    return response

# Logout
@app.get("/logout")
async def logout(response: Response, session_id: Optional[str] = Cookie(None)):
    """Log out the user by clearing the session."""
    if session_id and session_id in sessions:
        del sessions[session_id]

    response = RedirectResponse(url="/login", status_code=303)
    response.delete_cookie(key="session_id")

    return response

# Root endpoint - redirect to dashboard if logged in, otherwise to login
@app.get("/", response_class=HTMLResponse)
async def root(user: Optional[Dict[str, Any]] = Depends(get_current_user_from_session)):
    """Redirect to dashboard if logged in, otherwise show welcome page."""
    if user:
        return RedirectResponse(url="/dashboard")

    return """
    <html>
        <head>
            <title>CodeSage</title>
            <style>
                body {
                    font-family: 'Montserrat', sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #1a1a2e;
                    color: #e6e6e6;
                }
                h1 {
                    color: #5bc2e7;
                }
                a {
                    color: #8ed8f8;
                    text-decoration: none;
                    padding: 10px 20px;
                    background-color: #5bc2e7;
                    color: #1a1a2e;
                    border-radius: 4px;
                    font-weight: 600;
                    display: inline-block;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #8ed8f8;
                }
                .container {
                    background-color: #22223b;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-top: 100px;
                }
                img {
                    max-width: 200px;
                    margin-bottom: 20px;
                }
            </style>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <img src="/static/codesage-logo.svg" alt="CodeSage Logo">
                <h1>Welcome to CodeSage</h1>
                <p>AI-powered code review platform</p>
                <a href="/login">Log In</a>
            </div>
        </body>
    </html>
    """

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8081, reload=True)
