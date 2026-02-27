from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from data.seed_trails import TRAILS
from schemas.trail import Trail, TrailListResponse
from services.trail_service import list_trails as list_trails_service

router = APIRouter(prefix="/trails", tags=["trails"])


@router.get("", response_model=TrailListResponse)
def list_trails(
    q: Optional[str] = Query(None, description="Search query"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    region: Optional[str] = Query(None, description="Filter by region"),
    max_days: Optional[int] = Query(None, description="Max duration in days"),
    sort_by: str = Query("rating", description="Sort field: rating|distance|elevation|reviews"),
    limit: int = Query(20, le=100),
    offset: int = Query(0),
):
    """List and filter trekking routes."""
    return list_trails_service(
        q=q,
        difficulty=difficulty,
        region=region,
        max_days=max_days,
        sort_by=sort_by,
        limit=limit,
        offset=offset,
    )


@router.get("/{trail_id}", response_model=Trail)
def get_trail(trail_id: str):
    """Get a single trail by ID."""
    trail = next((t for t in TRAILS if t["id"] == trail_id), None)
    if not trail:
        raise HTTPException(status_code=404, detail=f"Trail '{trail_id}' not found")
    return trail


@router.get("/regions/list")
def list_regions():
    """Get all unique regions."""
    regions = sorted(set(t["region"] for t in TRAILS))
    return {"regions": regions}


@router.get("/difficulty/stats")
def difficulty_stats():
    """Count trails by difficulty."""
    from collections import Counter
    counts = Counter(t["difficulty"] for t in TRAILS)
    return {"stats": dict(counts)}
