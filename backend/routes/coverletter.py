from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.coverletter_service import generate_cover_letter

router = APIRouter()


class CoverLetterRequest(BaseModel):
    cv_text: str
    job_title: str
    company: str
    job_description: str


@router.post("/generate")
async def generate(req: CoverLetterRequest):
    """Generate a tailored cover letter."""
    if not req.cv_text or not req.job_description:
        raise HTTPException(status_code=400, detail="CV text and job description are required.")

    letter = generate_cover_letter(
        cv_text=req.cv_text,
        job_title=req.job_title,
        company=req.company,
        job_description=req.job_description,
    )
    return {"cover_letter": letter}
