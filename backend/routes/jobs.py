from fastapi import APIRouter

router = APIRouter()

# Mock job data for now — replace with real scraper later
MOCK_JOBS = [
    {"id": 1, "title": "SWE Intern", "company": "Google DeepMind", "location": "London", "match": 95, "deadline": "Apr 1", "url": "https://deepmind.google/careers"},
    {"id": 2, "title": "ML Research Intern", "company": "Meta AI", "location": "Remote", "match": 91, "deadline": "Mar 20", "url": "https://ai.meta.com/careers"},
    {"id": 3, "title": "Data Science Intern", "company": "Anthropic", "location": "San Francisco", "match": 88, "deadline": "Mar 28", "url": "https://anthropic.com/careers"},
    {"id": 4, "title": "Quant Research Intern", "company": "Nansen", "location": "London", "match": 79, "deadline": "Apr 10", "url": "#"},
    {"id": 5, "title": "Backend Engineer Intern", "company": "Stripe", "location": "Dublin", "match": 74, "deadline": "Apr 15", "url": "https://stripe.com/jobs"},
]


@router.get("/")
def get_jobs(category: str = "all"):
    """Return job listings, optionally filtered by category."""
    return {"jobs": MOCK_JOBS}
