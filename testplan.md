# CodeSage Test Plan

This document outlines a simple testing approach for the CodeSage application using pytest.

## Testing Goals

1. Verify that each component functions correctly in isolation
2. Ensure components interact properly with each other
3. Validate the end-to-end workflow

## Test Structure

Tests are organized by component, with each component having its own test file in the `tests/` directory.

## Test Types

### Unit Tests

Test individual functions and methods in isolation, using mocks for dependencies.

### Integration Tests

Test interactions between components, with minimal mocking.

### End-to-End Tests

Test the complete workflow from webhook reception to feedback generation.

## Test Files

| File | Description |
|------|-------------|
| `tests/test_webhook_server.py` | Tests for the webhook server |
| `tests/test_pr_fetcher.py` | Tests for the PR diff fetcher |
| `tests/test_analyzer.py` | Tests for the LLM code analyzer |
| `tests/test_context_analyzer.py` | Tests for the context analyzer |
| `tests/test_feedback.py` | Tests for the feedback generator |
| `tests/test_github_commenter.py` | Tests for the GitHub commenter |
| `tests/test_email_sender.py` | Tests for the email sender |
| `tests/test_learning_module.py` | Tests for the learning module |
| `tests/test_metrics_module.py` | Tests for the metrics module |
| `tests/test_repo_connector.py` | Tests for the repo connector |
| `tests/test_end_to_end.py` | End-to-end tests |

## Test Implementation

### Unit Tests

For each component, we test:
- Basic functionality
- Edge cases
- Error handling

Example for the webhook server:
```python
def test_health_check(client):
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
```

### Integration Tests

We test interactions between components:
```python
def test_pr_fetcher_calls_analyzer():
    """Test that PR fetcher calls the analyzer with correct data."""
    # Mock the analyzer
    with patch('pr_fetcher.LLMCodeAnalyzer') as mock_analyzer:
        fetcher = PRFetcher()
        fetcher.fetch_pr_diff("test-org/test-repo", 123)
        mock_analyzer.assert_called_once()
```

### End-to-End Tests

We test the complete workflow:
```python
def test_webhook_to_feedback():
    """Test the complete workflow from webhook to feedback."""
    # Mock external services
    with patch('pr_fetcher.requests.get'), patch('github_commenter.requests.post'):
        # Send a webhook event
        response = client.post("/webhook/github", json=payload,
                              headers={"X-GitHub-Event": "pull_request"})
        assert response.status_code == 200
```

## Test Data and Fixtures

We use fixtures for common test data:
```python
@pytest.fixture
def sample_pr_payload():
    """Return a sample PR payload."""
    return {
        "action": "opened",
        "pull_request": {
            "number": 123,
            "title": "Test PR",
            "user": {"login": "test-user"}
        },
        "repository": {
            "full_name": "test-org/test-repo"
        }
    }
```

## Running Tests

Tests can be run using the provided script:

```bash
# Run all tests
./run_tests.py

# Run tests with coverage report
./run_tests.py --coverage

# Run tests with HTML coverage report
./run_tests.py --coverage --html
```

## Test Coverage

We aim for at least 80% code coverage, focusing on critical paths.

The coverage report will show:
- Which lines of code are executed during tests
- Which branches are taken
- Which functions are called

## Continuous Integration

Tests should be run automatically on each pull request and before deployment.

## Test Maintenance

As the codebase evolves:
1. Update tests to reflect changes in functionality
2. Add new tests for new features
3. Refactor tests when refactoring code
4. Keep test fixtures up to date
