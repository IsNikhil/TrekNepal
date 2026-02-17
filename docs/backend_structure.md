# 🏗️ Backend Architecture Design — Trek Nepal

This document describes the complete backend architecture for the Trek Nepal platform.  
It includes system design, API structure, data models, service layers, processing pipelines, and development guidelines.

---

#  1. Core Architecture Overview

The backend is built around:

- **FastAPI (Python)** — for rapid development, async performance, and easy integration
- **PostgreSQL + PostGIS** — for geospatial data (routes, points, weather regions)
- **Redis (optional)** — for caching and real-time event updates
- **GDAL / Shapely / Rasterio** — for geospatial preprocessing (GPX, OSM, DEM)
- **OpenAI / LLM API** — for AI trekking guide
- **Docker** — for consistent development & deployment
- **S3-compatible storage** — for storing offline map tiles, photos, GPX/GeoJSON source files

The backend exposes a REST API for:
- Mobile app (React Native)
- B2B dashboards
- Partner integrations (hotels, lodges, trekking companies)

---

#  2. Key Functional Modules

## 2.1 Trek Module
Handles everything related to trekking routes:
- Importing GPX/OSM data
- Cleaning and validating routes
- Computing elevation profiles using DEM (SRTM/ASTER)
- Storing:
  - Name, difficulty, distance
  - GeoJSON/LINESTRING geometry
  - Min/max altitude
  - Route segments
- Exposing trek information to clients

**Services:**
- `trek_service`: GPX ingestion, elevation computation, geometry validation
- `route_service`: routing, snapping to trail, geo queries

---

## 2.2 Map Tile Engine
Handles offline map files (.mbtiles) generation.

Backed by:
- Tippecanoe or custom Python scripts
- DEM-based hillshading
- OSM/OpenTopo integrations

**Stores:**
- Tile metadata
- Download URLs for clients

**Tools:**
- `make_mbtiles.py`
- `clean_gpx.py`
- `build_elevation.py`

---

## 2.3 Weather System
Hybrid weather pipeline.

**Functionality:**
- Fetch weather from Open-Meteo / OpenWeather
- Cache forecast for 3–7 days for offline use
- Track risk indicators (wind, snow, storms)
- Send alerts to users/agencies

**Tables:**
- `weather_cache`
- `weather_risks`

---

## 2.4 AI Guide Module
LLM-powered trekking assistant.

**Responsibilities:**
- Chat completion API
- Dynamic guide personality
- Tool-based responses:
  - Weather lookup
  - Route info
  - Emergency steps
- Safety guardrails
- Cost limiting per user per day

**Files:**
- `/ai_guide/assistant.py`
- `/ai_guide/prompts/system_guide.md`
- `/ai_guide/prompts/safety_rules.md`
- `/ai_guide/tools/definitions.json`

---

## 2.5 Safety/SOS System
Handles user emergency signals.

**Flow:**
1. User presses SOS in mobile app
2. Backend receives:
   - user_id
   - last known GPS coordinate
   - altitude
   - timestamp
3. Alerts agency if linked
4. Stores event for rescue/history

**Tables:**
- `sos_events`
- `client_fixes` (last location updates)

WebSocket optional for real-time tracking.

---

## 2.6 Hazard Reports System (Community + Moderation)
Users can submit:
- Landslides
- Trail blocks
- Broken bridges
- Snow-covered sections

**Flow:**
- User submits report
- Stored in DB
- Moderation step
- Approved → visible on trek maps

**Tables:**
- `hazard_reports`
- `media_files` (if photos)

---

## 2.7 Tea House / Lodge Directory
Each lodge entry includes:
- Name
- Altitude
- Location
- Contact
- Amenities
- Rooms
- Seasonal availability

Fetched via mobile app or partner API.

---

## 2.8 Partner API & B2B Dashboard
For:
- Lodges
- Hotels
- Trekking companies

**Features:**
- Trekker ETA predictions
- Agency client tracking
- Messaging system
- Weather dashboards

**Tables:**
- `partners`
- `partner_api_keys`
- `agency_users`
- `agency_clients`
- `agency_messages`
- `subscriptions`

---

#  3. Folder Structure (Backend)

```
backend/
│
├── app.py
├── core/
│   ├── config.py
│   ├── db.py
│   └── deps.py
│
├── models/
│   ├── user.py
│   ├── trek.py
│   ├── poi.py
│   ├── report.py
│   ├── weather.py
│   ├── sos.py
│   └── agency.py
│
├── schemas/
│   ├── auth.py
│   ├── trek.py
│   ├── poi.py
│   ├── weather.py
│   ├── report.py
│   ├── sos.py
│   └── agency.py
│
├── routes/
│   ├── auth.py
│   ├── treks.py
│   ├── weather.py
│   ├── reports.py
│   ├── sos.py
│   ├── agency.py
│   └── partner.py
│
├── services/
│   ├── trek_service.py
│   ├── weather_service.py
│   ├── ai_guide.py
│   ├── tiles_service.py
│   ├── routing_service.py
│   └── report_service.py
│
├── migrations/
│   └── 0001_init.sql
│
└── tests/
    ├── test_routes.py
    └── test_models.py
```

---

#  4. API Layer Structure

All endpoints follow REST standards.

## Examples:

### Auth
- POST `/auth/signup`
- POST `/auth/login`

### Treks
- GET `/treks`
- GET `/treks/{id}`
- GET `/treks/{id}/elevation`
- GET `/treks/{id}/tiles`

### Weather
- GET `/weather/trek/{id}`
- GET `/weather/coords?lat=...&lng=...`

### Reports
- POST `/reports`
- GET `/reports?trek_id=...`
- PATCH `/reports/{id}`

### SOS
- POST `/sos`
- GET `/sos/active`

### Partner API
- GET `/partner/eta`
- GET `/partner/intel`
- GET `/partner/nearby`

### Agency
- GET `/agency/clients`
- POST `/agency/message`

---

#  5. Data Flow Examples

## Example: Weather Update Flow
1. Cronjob or worker triggers update  
2. WeatherService fetches forecast from API  
3. Data cleaned & normalized  
4. Saved in `weather_cache`  
5. If user online → mobile app receives updated forecast  
6. If offline → uses cached forecast

---

## Example: AI Guide Chat Flow
1. User prompts the AI guide  
2. Backend passes:
   - user context
   - trek metadata
   - risk levels
   - last known GPS location
3. LLM responds  
4. Backend enforces safety rules  
5. Optional tool calls:
   - weather lookup
   - route info  
6. Return final reply to user

---

#  6. Recommended Development Tools

- Python 3.11+
- FastAPI
- Uvicorn (server)
- SQLAlchemy + GeoAlchemy2
- PostGIS
- Pydantic
- Redis (optional)
- Docker Compose
- Poetry / Pipenv

Map engine:
- GDAL  
- Rasterio  
- Shapely  
- Tippecanoe  

---

#  7. Development Workflow (Correct Order)

1. **Design database tables**  
2. Build **core trek API**  
3. Build **weather system**  
4. Build **AI guide base layer**  
5. Build **SOS system**  
6. Add **hazard reports**  
7. Add **partners + agency** modules  
8. Integrate **map tile generation**  
9. Connect to mobile app  
10. Optimize, test, deploy

---

# 8. Notes for Scalability

- Enable GIST indexes for geometry  
- Cache expensive operations in Redis  
- Use chunked tile downloads  
- Keep AI costs low using token limits  
- Use S3 for map tiles & media storage  
- Enable connection pooling for Postgres  
- Build async-only backend  

---

#  End of document
