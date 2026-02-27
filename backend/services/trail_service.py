from typing import Optional

from data.seed_trails import TRAILS


def list_trails(
    q: Optional[str] = None,
    difficulty: Optional[str] = None,
    region: Optional[str] = None,
    max_days: Optional[int] = None,
    sort_by: str = "rating",
    limit: int = 20,
    offset: int = 0,
) -> dict:
    results = list(TRAILS)

    # Search
    if q:
        q_lower = q.lower()
        results = [
            t
            for t in results
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
    if max_days is not None:
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
