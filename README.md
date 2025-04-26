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
├── tests/                # Test suite
│   ├── unit/             # Unit tests
│   │   ├── test_github_webhook.py  # Tests for webhook handling
│   │   ├── test_llm_service.py     # Tests for LLM code analysis
│   │   └── test_feedback_generator.py # Tests for feedback generation
│   ├── integration/      # Integration tests
│   │   └── test_pr_processing.py   # Tests for PR processing flow
│   └── conftest.py       # Test fixtures and configuration
├── .env.example          # Example environment variables
├── app.py                # Main application
├── pyproject.toml        # Poetry configuration and dependencies
├── requirements.txt      # Python dependencies
├── testplan.md           # Comprehensive test plan
└── README.md             # This file
```

## Setup

1. Clone the repository

2. Choose one of the following methods to set up your environment:

### Option A: Using Poetry (Recommended)

```bash
# Install Poetry if you haven't already
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Activate the virtual environment
poetry shell
```

### Option B: Using Virtual Environment

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
# If using Poetry
poetry run python app.py

# If using virtual environment
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

## Testing

CodeSage includes a comprehensive test suite built with pytest. The tests are organized into unit tests and integration tests.

### Test Structure

- **Unit Tests**: Test individual components in isolation
  - `test_github_webhook.py`: Tests for webhook signature verification and event handling
  - `test_llm_service.py`: Tests for the LLM code analyzer, including handling different file types
  - `test_feedback_generator.py`: Tests for comment formatting and severity classification

- **Integration Tests**: Test interactions between components
  - `test_pr_processing.py`: Tests for the end-to-end PR processing flow

### Setting Up the Test Environment

We use Poetry for dependency management and testing:

1. Install Poetry (if not already installed):
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

2. Install dependencies:
   ```bash
   poetry install
   ```

### Running Tests

Run all tests:
```bash
poetry run pytest
```

Run tests with coverage:
```bash
poetry run pytest --cov=.
```

Run specific test files:
```bash
# Run only unit tests
poetry run pytest tests/unit/

# Run a specific test file
poetry run pytest tests/unit/test_llm_service.py

# Run with verbose output
poetry run pytest -v
```

### Test Plan

For a detailed test plan, see [testplan.md](testplan.md), which outlines:
- Test levels (unit, integration, system, performance)
- Test scenarios and test cases
- Test environments
- Test data
- Test automation strategy

## Next Steps

- Implement the Team Learning Loop
- Add more advanced contextual analysis
- Develop metrics and insights engine
- Expand language support
- Enhance test coverage for all components