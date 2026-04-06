from fastapi import APIRouter, UploadFile, File, HTTPException
from services.cv_service import extract_text_from_pdf, analyse_cv

router = APIRouter()


@router.post("/analyse")
async def analyse_cv_endpoint(file: UploadFile = File(...)):
    """
    Upload a PDF CV and get back a score + suggestions.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported right now.")

    file_bytes = await file.read()

    if len(file_bytes) > 5 * 1024 * 1024:  # 5MB limit
        raise HTTPException(status_code=400, detail="File too large. Max 5MB.")

    cv_text = extract_text_from_pdf(file_bytes)

    if not cv_text:
        raise HTTPException(status_code=400, detail="Could not read text from PDF.")

    result = analyse_cv(cv_text)
    return result
