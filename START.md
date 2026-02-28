# Running TrekNepal

## Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

## Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Home — hero, featured trails, regions, features |
| `/explore` | Trail discovery with split map + grid view, filters |
| `/trails/everest-base-camp` | Everest Base Camp detail |
| `/trails/annapurna-circuit` | Annapurna Circuit detail |
| `/trails/poon-hill` | Poon Hill detail |
| `/trails/langtang-valley` | Langtang Valley detail |
| `/trails/manaslu-circuit` | Manaslu Circuit detail |
| `/trails/upper-mustang` | Upper Mustang detail |
| `/trails/gokyo-lakes` | Gokyo Lakes detail |
| `/trails/mardi-himal` | Mardi Himal detail |
| `/safety` | Safety Hub — AMS guide, SOS protocol, emergency contacts |

## API Endpoints

| Method | URL | Description | Status |
|--------|-----|-------------|--------|
| GET | `/` | API info | 200 |
| GET | `/health` | Health check | 200 |
| GET | `/trails` | List/filter trails | 200 |
| GET | `/trails/{id}` | Trail detail | 200, 404 |
| POST | `/trails` | Create trail | 201 |
| PUT | `/trails/{trail_id}` | Update trail | 200, 404 |
| DELETE | `/trails/{trail_id}` | Delete trail | 204, 404 |
| GET | `/trails/regions/list` | All regions | 200 |
| GET | `/trails/difficulty/stats` | Difficulty distribution | 200 |

### Filter params for `/trails`:
- `?q=everest` — search
- `?difficulty=hard` — easy/moderate/hard/expert
- `?region=Khumbu` — region filter
- `?max_days=10` — max duration
- `?sort_by=rating` — rating/distance/elevation/reviews
