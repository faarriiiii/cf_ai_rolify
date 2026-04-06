from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import cv, coverletter, jobs, tracker

load_dotenv()

app = FastAPI(title="Rolify API", version="1.0.0")

# Allow the React frontend to talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all route modules
app.include_router(cv.router,          prefix="/api/cv",          tags=["CV"])
app.include_router(coverletter.router, prefix="/api/coverletter", tags=["Cover Letter"])
app.include_router(jobs.router,        prefix="/api/jobs",        tags=["Jobs"])
app.include_router(tracker.router,     prefix="/api/tracker",     tags=["Tracker"])


@app.get("/")
def root():
    return {"message": "Rolify API is running 🚀"}
