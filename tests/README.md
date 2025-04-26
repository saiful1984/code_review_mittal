# CodeSage Tests

This directory contains tests for the CodeSage system based on the test plan.

## Structure

- `unit/`: Unit tests for individual components
- `integration/`: Integration tests for component interactions

## Running Tests

To run the tests, use poetry and pytest:

```bash
# Install dependencies
poetry install

# Run all tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=.

# Run specific test file
poetry run pytest tests/unit/test_llm_service.py

# Run tests with verbose output
poetry run pytest -v
```

## Test Fixtures

Common test fixtures are defined in `conftest.py`, including:

- `mock_openai_client`: Mock OpenAI client for testing LLM integration
- `mock_github_response`: Sample GitHub webhook payload
- `sample_diff_content`: Sample PR diff content

## Adding New Tests

When adding new tests:

1. Follow the existing pattern for unit or integration tests
2. Use pytest fixtures for common test data
3. Mock external dependencies appropriately
4. Add appropriate assertions to verify behavior

## Test Coverage

The goal is to maintain high test coverage for all critical components, especially:

- Webhook handling and signature verification
- PR diff fetching and parsing
- LLM code analysis
- Feedback generation and distribution
