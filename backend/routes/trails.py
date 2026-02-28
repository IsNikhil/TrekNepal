import re
from uuid import uuid4
from fastapi import APIRouter, HTTPException, Query, Response, status
from typing import Optional
from data.seed_trails import TRAILS
from schemas.trail import Trail, TrailCreate, TrailListResponse
from services.trail_service import list_trails as list_trails_service

router = APIRouter(prefix="/trails", tags=["trails"])


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or f"trail-{uuid4().hex[:8]}"


def _generate_unique_trail_id(name: str) -> str:
    base = _slugify(name)
    existing_ids = {trail["id"] for trail in TRAILS}
    candidate = base
    suffix = 2
    while candidate in existing_ids:
        candidate = f"{base}-{suffix}"
        suffix += 1
    return candidate


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


@router.post("", response_model=Trail, status_code=status.HTTP_201_CREATED)
def create_trail(payload: TrailCreate):
    created_trail = {"id": _generate_unique_trail_id(payload.name), **payload.model_dump()}
    TRAILS.append(created_trail)
    return created_trail


@router.put("/{trail_id}", response_model=Trail)
def update_trail(trail_id: str, payload: TrailCreate):
    for index, trail in enumerate(TRAILS):
        if trail["id"] == trail_id:
            updated_trail = {"id": trail_id, **payload.model_dump()}
            TRAILS[index] = updated_trail
            return updated_trail
    raise HTTPException(status_code=404, detail=f"Trail '{trail_id}' not found")


@router.delete("/{trail_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trail(trail_id: str):
    for index, trail in enumerate(TRAILS):
        if trail["id"] == trail_id:
            TRAILS.pop(index)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Trail '{trail_id}' not found")


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
