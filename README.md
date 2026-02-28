# Trek Nepal 

Trek Nepal is a digital trekking platform designed to map and support trekking routes across Nepal.  
The goal of the project is to provide accurate route data, offline navigation, weather intelligence, safety features, and an AI virtual guide for trekkers, trekking agencies, and local partners.

---

##  What This Project Does
- Digitizes major trekking routes in Nepal
- Provides offline-first GPS navigation
- Shows weather forecasts and safety alerts (when available)
- Offers an AI-powered trekking guide experience
- Supports solo trekkers, trekking companies, and lodges
- Enables partner integrations through APIs

---

##  Who It’s For
- Solo trekkers exploring Nepal
- Trekking agencies managing clients
- Developers building geospatial, AI, and travel-tech systems

---

## Tech Stack (High-Level)
- *Backend:* Python, FastAPI
- *Database:* In-memory trail seed data (current), PostgreSQL + PostGIS (planned)
- *Maps:* OpenStreetMap, offline map tiles
- *AI:* LLM-based virtual guide
- *Frontend:* Next.js web app
- *Dev Tools:* VS Code, Docker (planned)

---

## Current Implementation State
- FastAPI backend is active with trail listing and mutation endpoints.
- Trail storage is currently in-memory (`backend/data/seed_trails.py`) and non-persistent.
- Next.js frontend is active; `/explore` fetches trail data from backend.
- pytest test suite is available under `backend/tests` using `fastapi.testclient.TestClient`.
- Dockerized backend and PostgreSQL/PostGIS are planned, not active yet.

---

## Run Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

---

## Run Tests
```bash
python -m pytest -q backend/tests
```

---

## Project Structure
- backend/ – API, business logic, data access
- docs/ – Architecture, plans, and internal documentation
- config/ – Configuration files

---

## Project Status
This project is under active development.  
Core backend setup and architecture are being prepared before feature implementation.

---

## Documentation
Detailed technical plans, backend architecture, and development notes are located in the docs/ directory.
