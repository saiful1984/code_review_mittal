import pytest
from unittest.mock import patch, MagicMock

# Since we don't have a specific feedback generator module in the codebase,
# we'll create a mock implementation for testing purposes
class FeedbackGenerator:
    """Mock feedback generator for testing"""
    
    @staticmethod
    def format_comment(issue_type, description, severity, suggestion):
        """Format a comment with the given information"""
        return f"**{severity.upper()} Severity Issue**\n\n{description}\n\n**Suggestion:** {suggestion}"
    
    @staticmethod
    def classify_severity(issue_type, description):
        """Classify the severity of an issue"""
        if "security" in issue_type.lower() or "vulnerability" in description.lower():
            return "high"
        elif "performance" in issue_type.lower():
            return "medium"
        else:
            return "low"
    
    @staticmethod
    def generate_suggestions(issue_type, description):
        """Generate suggestions for an issue"""
        if "security" in issue_type.lower():
            return "Implement proper input validation and use parameterized queries."
        elif "performance" in issue_type.lower():
            return "Consider optimizing the algorithm or using caching."
        else:
            return "Review and refactor this code section."

class TestFeedbackGenerator:
    """Tests for feedback generator functionality"""
    
    def test_format_comment(self):
        """Test formatting comments with different severities"""
        generator = FeedbackGenerator()
        
        # Test high severity comment
        high_comment = generator.format_comment(
            "Security",
            "SQL injection vulnerability in query",
            "high",
            "Use parameterized queries"
        )
        assert "**HIGH Severity Issue**" in high_comment
        assert "SQL injection vulnerability" in high_comment
        assert "**Suggestion:** Use parameterized queries" in high_comment
        
        # Test medium severity comment
        medium_comment = generator.format_comment(
            "Performance",
            "Inefficient algorithm",
            "medium",
            "Use a more efficient approach"
        )
        assert "**MEDIUM Severity Issue**" in medium_comment
        assert "Inefficient algorithm" in medium_comment
        assert "**Suggestion:** Use a more efficient approach" in medium_comment
    
    def test_classify_severity(self):
        """Test severity classification for different issue types"""
        generator = FeedbackGenerator()
        
        # Test security issues (high severity)
        assert generator.classify_severity("Security", "Potential XSS vulnerability") == "high"
        assert generator.classify_severity("Code Quality", "SQL injection vulnerability") == "high"
        
        # Test performance issues (medium severity)
        assert generator.classify_severity("Performance", "Inefficient loop") == "medium"
        
        # Test other issues (low severity)
        assert generator.classify_severity("Style", "Inconsistent naming") == "low"
    
    def test_generate_suggestions(self):
        """Test suggestion generation for different issue types"""
        generator = FeedbackGenerator()
        
        # Test security suggestions
        security_suggestion = generator.generate_suggestions("Security", "XSS vulnerability")
        assert "proper input validation" in security_suggestion
        
        # Test performance suggestions
        performance_suggestion = generator.generate_suggestions("Performance", "Slow algorithm")
        assert "optimizing" in performance_suggestion
        
        # Test general suggestions
        general_suggestion = generator.generate_suggestions("Style", "Poor naming")
        assert "Review and refactor" in general_suggestion
