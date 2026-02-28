from pydantic import BaseModel, ConfigDict


class TrailCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    name: str
    region: str
    difficulty: str
    distance_km: int
    duration_days: int
    elevation_gain_m: int
    max_elevation_m: int
    rating: float
    review_count: int
    description: str
    lat: float
    lng: float
    tags: list[str]
    best_season: list[str]
    permits: list[str]


class Trail(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    region: str
    difficulty: str
    distance_km: int
    duration_days: int
    elevation_gain_m: int
    max_elevation_m: int
    rating: float
    review_count: int
    description: str
    lat: float
    lng: float
    tags: list[str]
    best_season: list[str]
    permits: list[str]


class TrailListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    total: int
    offset: int
    limit: int
    trails: list[Trail]
