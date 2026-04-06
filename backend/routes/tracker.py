from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import sqlite3, os

router = APIRouter()
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "rolify.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            company TEXT NOT NULL,
            status TEXT DEFAULT 'applied',
            applied_date TEXT,
            notes TEXT
        )
    """)
    conn.commit()
    conn.close()


init_db()


class Application(BaseModel):
    role: str
    company: str
    status: Optional[str] = "applied"
    applied_date: Optional[str] = None
    notes: Optional[str] = None


@router.get("/")
def get_applications():
    conn = get_db()
    rows = conn.execute("SELECT * FROM applications ORDER BY id DESC").fetchall()
    conn.close()
    return {"applications": [dict(r) for r in rows]}


@router.post("/")
def add_application(app: Application):
    conn = get_db()
    conn.execute(
        "INSERT INTO applications (role, company, status, applied_date, notes) VALUES (?,?,?,?,?)",
        (app.role, app.company, app.status, app.applied_date, app.notes)
    )
    conn.commit()
    conn.close()
    return {"message": "Application added!"}


@router.patch("/{app_id}/status")
def update_status(app_id: int, status: str):
    valid = ["applied", "under review", "interview", "offer", "rejected"]
    if status not in valid:
        raise HTTPException(status_code=400, detail=f"Status must be one of: {valid}")
    conn = get_db()
    conn.execute("UPDATE applications SET status=? WHERE id=?", (status, app_id))
    conn.commit()
    conn.close()
    return {"message": "Status updated!"}


@router.delete("/{app_id}")
def delete_application(app_id: int):
    conn = get_db()
    conn.execute("DELETE FROM applications WHERE id=?", (app_id,))
    conn.commit()
    conn.close()
    return {"message": "Application deleted!"}
