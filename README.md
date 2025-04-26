# CodeSage - AI-Powered Code Review Platform

CodeSage is an AI-powered code review platform that understands code context, highlights issues, and learns from team feedback.

## Features

- **GitHub Integration**: Automatically review pull requests when they are opened or updated
- **AI-Powered Analysis**: Leverages OpenAI's GPT models to analyze code and provide meaningful feedback
- **Contextual Understanding**: Analyzes code in the context of your codebase
- **Dashboard**: Monitor reviews and track metrics

## Project Structure

```
├── api/                  # API endpoints
│   ├── auth.py           # Authentication
│   ├── dashboard.py      # Dashboard views
│   └── github_webhook.py # GitHub webhook handler
├── services/             # Business logic
│   ├── github_service.py # GitHub API integration
│   └── llm_service.py    # LLM integration for code analysis
├── static/               # Static assets
│   ├── codesage-logo.svg
│   └── codesage-logo-small.svg
├── templates/            # HTML templates
│   ├── dashboard.html    # Dashboard template
│   └── review_details.html # Review details template
├── .env.example          # Example environment variables
├── app.py                # Main application
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## Setup

1. Clone the repository
2. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example` and fill in your credentials:

```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Set up a GitHub App:
   - Go to GitHub Developer Settings
   - Create a new GitHub App
   - Set the webhook URL to your server's URL + `/api/github/webhook`
   - Generate a private key and download it
   - Install the app on your repositories

5. Run the application:

```bash
python app.py
```

## Usage

1. **Dashboard**: Access the dashboard at `http://localhost:8081/dashboard`
2. **API Documentation**: Access the API docs at `http://localhost:8081/docs`
3. **GitHub Integration**: Once set up, CodeSage will automatically review new PRs
4. **Manual Review**: You can also trigger reviews manually through the dashboard

## Development

This is a FastAPI application with the following components:

- **FastAPI**: Web framework
- **Jinja2**: Templating engine
- **OpenAI API**: For code analysis
- **GitHub API**: For repository integration

## Next Steps

- Implement the Team Learning Loop
- Add more advanced contextual analysis
- Develop metrics and insights engine
- Expand language support