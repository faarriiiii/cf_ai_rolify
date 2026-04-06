"""
cv_service.py
Parses uploaded CV and scores it using AI.
"""

import io
import PyPDF2
from services.ai_service import chat


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Pull raw text out of a PDF file."""
    reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()


def analyse_cv(cv_text: str) -> dict:
    """
    Send CV text to AI and get back:
    - overall score (0-100)
    - scores per category
    - detected skills
    - improvement suggestions
    """
    system = """You are an expert CV reviewer for tech internships.
    Analyse the CV and return ONLY valid JSON in this exact format:
    {
      "overall_score": 78,
      "scores": {
        "clarity": 85,
        "impact": 72,
        "keywords": 68,
        "structure": 90,
        "ats_fit": 61
      },
      "skills": ["Python", "React", "SQL"],
      "suggestions": [
        "Add measurable impact to your bullet points (e.g. 'reduced load time by 40%')",
        "Include more ATS keywords like 'machine learning', 'agile', 'REST APIs'"
      ]
    }
    Return ONLY the JSON. No extra text."""

    result = chat(system, f"Here is the CV:\n\n{cv_text}")

    import json
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        # Fallback if AI returns messy JSON
        return {
            "overall_score": 70,
            "scores": {"clarity": 70, "impact": 70, "keywords": 70, "structure": 70, "ats_fit": 70},
            "skills": [],
            "suggestions": ["Could not parse CV. Please try again."]
        }
