-- Run: wrangler d1 execute rolify --file=schema.sql

CREATE TABLE IF NOT EXISTS applications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    role         TEXT    NOT NULL,
    company      TEXT    NOT NULL,
    status       TEXT    NOT NULL DEFAULT 'applied',
    applied_date TEXT,
    notes        TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_status ON applications(status);