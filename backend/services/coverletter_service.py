"""
coverletter_service.py
Generates tailored cover letters using the user's CV + job description.
"""

from services.ai_service import chat


def generate_cover_letter(cv_text: str, job_title: str, company: str, job_description: str) -> str:
    """Generate a tailored cover letter."""

    system = """You are an expert career coach who writes outstanding cover letters
    for students applying to tech internships. Write in a confident, genuine tone —
    not robotic or overly formal. Keep it to 3 short paragraphs. No filler phrases like
    'I am writing to express my interest'. Get straight to the point."""

    user_message = f"""
Write a cover letter for this application:

Role: {job_title}
Company: {company}

Job Description:
{job_description}

Candidate's CV:
{cv_text}

Write a compelling, tailored cover letter that:
1. Opens with a strong hook specific to {company}
2. Highlights 2-3 relevant skills/experiences from the CV that match the job
3. Closes with enthusiasm and a clear call to action
"""

    return chat(system, user_message, max_tokens=600)
