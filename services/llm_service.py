import os
import json
from typing import Dict, List, Any, Optional
import openai
from openai import OpenAI

# Check if we're in demo mode
DEMO_MODE = os.getenv("OPENAI_API_KEY") == "demo_openai_key"

# Initialize OpenAI client if not in demo mode
if not DEMO_MODE:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
else:
    client = None  # Will use mock responses in demo mode

async def analyze_code(diff_content: str) -> List[Dict[str, Any]]:
    """
    Analyze code diff using OpenAI's GPT model.
    Returns a list of issues found with file paths, positions, and comments.
    In demo mode, returns mock results.
    """
    try:
        # Parse the diff to extract files and changes
        files = parse_diff(diff_content)

        # Prepare results
        results = []

        # Check if we're in demo mode
        if DEMO_MODE:
            # Return mock results for demo
            return [
                {
                    "file_path": "src/auth/login.js",
                    "position": 42,
                    "comment": "**HIGH Severity Issue**\n\nThis authentication logic has a potential security vulnerability. Consider using a more secure hashing algorithm.\n\n**Suggestion:** Replace MD5 with bcrypt or Argon2 for password hashing."
                },
                {
                    "file_path": "src/models/user.js",
                    "position": 15,
                    "comment": "**HIGH Severity Issue**\n\nThis database query is not properly parameterized, which could lead to SQL injection attacks.\n\n**Suggestion:** Use parameterized queries with prepared statements instead of string concatenation."
                },
                {
                    "file_path": "src/utils/helpers.js",
                    "position": 78,
                    "comment": "**MEDIUM Severity Issue**\n\nThis function has a potential memory leak. Consider using a more efficient data structure.\n\n**Suggestion:** Use a Map instead of an object for better memory management and performance."
                }
            ]

        # Analyze each file using OpenAI
        for file in files:
            # Skip binary files or very large files
            if file["is_binary"] or len(file["content"]) > 10000:
                continue

            # Prepare prompt for the LLM
            prompt = f"""
            You are CodeSage, an AI code reviewer. Review the following code diff and identify issues:

            File: {file["path"]}

            ```
            {file["content"]}
            ```

            Focus on:
            1. Security vulnerabilities
            2. Performance issues
            3. Code quality and maintainability
            4. Potential bugs or edge cases

            Format your response as a JSON array of objects with the following structure:
            [
                {{
                    "line": <line_number>,
                    "issue": "<description of the issue>",
                    "severity": "<high|medium|low>",
                    "suggestion": "<suggested fix>"
                }}
            ]

            Only include actual issues. If no issues are found, return an empty array.
            """

            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-4",  # Use appropriate model
                messages=[
                    {"role": "system", "content": "You are CodeSage, an AI code reviewer that identifies issues in code."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,  # Low temperature for more deterministic results
                max_tokens=2000
            )

            # Parse the response
            try:
                issues = json.loads(response.choices[0].message.content)

                # Add each issue to results
                for issue in issues:
                    results.append({
                        "file_path": file["path"],
                        "position": issue["line"],
                        "comment": f"**{issue['severity'].upper()} Severity Issue**\n\n{issue['issue']}\n\n**Suggestion:** {issue['suggestion']}"
                    })
            except json.JSONDecodeError:
                # Handle case where response is not valid JSON
                print(f"Error parsing LLM response for {file['path']}")
                continue

        return results

    except Exception as e:
        print(f"Error analyzing code: {str(e)}")
        # Return empty results on error
        return []

def parse_diff(diff_content: str) -> List[Dict[str, Any]]:
    """
    Parse a git diff and extract file information.
    This is a simplified parser for demo purposes.
    """
    files = []
    current_file = None

    # Split diff into lines
    lines = diff_content.split('\n')

    for line in lines:
        # New file
        if line.startswith('diff --git'):
            # Save previous file if exists
            if current_file:
                files.append(current_file)

            # Start new file
            current_file = {
                "path": "",
                "content": "",
                "is_binary": False
            }

        # File path
        elif line.startswith('--- a/') or line.startswith('+++ b/'):
            if line.startswith('+++ b/') and current_file:
                current_file["path"] = line[6:]

        # Binary file
        elif line.startswith('Binary files') and current_file:
            current_file["is_binary"] = True

        # File content
        elif current_file and (line.startswith(' ') or line.startswith('+') or line.startswith('-')):
            current_file["content"] += line + '\n'

    # Add the last file
    if current_file:
        files.append(current_file)

    return files
