from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from data.seed_trails import TRAILS

router = APIRouter(prefix="/trails", tags=["trails"])


@router.get("")
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
    results = list(TRAILS)

    # Search
    if q:
        q_lower = q.lower()
        results = [
            t for t in results
            if q_lower in t["name"].lower()
            or q_lower in t["region"].lower()
            or any(q_lower in tag.lower() for tag in t["tags"])
        ]

    # Difficulty filter
    if difficulty and difficulty != "all":
        results = [t for t in results if t["difficulty"] == difficulty]

    # Region filter
    if region:
        results = [t for t in results if region.lower() in t["region"].lower()]

    # Max days filter
    if max_days:
        results = [t for t in results if t["duration_days"] <= max_days]

    # Sort
    sort_map = {
        "rating": lambda t: -t["rating"],
        "distance": lambda t: t["distance_km"],
        "elevation": lambda t: t["max_elevation_m"],
        "reviews": lambda t: -t["review_count"],
    }
    if sort_by in sort_map:
        results.sort(key=sort_map[sort_by])

    total = len(results)
    results = results[offset : offset + limit]

    return {
        "total": total,
        "offset": offset,
        "limit": limit,
        "trails": results,
    }


@router.get("/{trail_id}")
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
