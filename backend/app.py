from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.health import router as health_router
from routes.trails import router as trails_router

app = FastAPI(
    title="Trek Nepal API",
    description="Backend API for TrekNepal — Nepal's most accurate trekking companion.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow frontend (Next.js dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(trails_router)


@app.get("/")
def root():
    return {
        "service": "Trek Nepal API",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "health": "/health",
            "trails": "/trails",
            "trail_detail": "/trails/{id}",
            "regions": "/trails/regions/list",
        },
    }
