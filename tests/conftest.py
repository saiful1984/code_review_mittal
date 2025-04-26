import pytest
from unittest.mock import MagicMock

@pytest.fixture
def mock_openai_client():
    """Mock OpenAI client for testing."""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.choices = [MagicMock()]
    mock_response.choices[0].message.content = '[{"line": 42, "issue": "Security vulnerability", "severity": "high", "suggestion": "Fix this"}]'
    mock_client.chat.completions.create.return_value = mock_response
    return mock_client

@pytest.fixture
def mock_github_response():
    """Mock GitHub API response for testing."""
    return {
        "pull_request": {
            "number": 42,
            "head": {"sha": "abc123"},
            "title": "Test PR",
            "user": {"login": "testuser"}
        },
        "repository": {
            "full_name": "test/repo"
        },
        "action": "opened"
    }

@pytest.fixture
def sample_diff_content():
    """Sample diff content for testing."""
    return """diff --git a/src/auth/login.js b/src/auth/login.js
index 1234567..abcdefg 100644
--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -40,7 +40,7 @@ function authenticate(username, password) {
-  const hash = md5(password);
+  const hash = bcrypt.hash(password, 10);
   return db.query(`SELECT * FROM users WHERE username='${username}' AND password='${hash}'`);
 }
"""
