export interface ApiTrail {
  id: string;
  name: string;
  region: string;
  difficulty: "easy" | "moderate" | "hard" | "expert";
  distance_km: number;
  duration_days: number;
  elevation_gain_m: number;
  max_elevation_m: number;
  rating: number;
  review_count: number;
  description: string;
  lat: number;
  lng: number;
  tags: string[];
  best_season: string[];
  permits: string[];
}

export interface TrailListResponse {
  total: number;
  offset: number;
  limit: number;
  trails: ApiTrail[];
}

export interface TrailQueryParams {
  limit?: number;
  offset?: number;
  difficulty?: string;
  region?: string;
  q?: string;
  max_days?: number;
  sort_by?: "rating" | "distance" | "elevation" | "reviews";
}

const TRAILS_ENDPOINT = "http://localhost:8000/trails";

export async function fetchTrails(params: TrailQueryParams = {}): Promise<TrailListResponse> {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }

  const url = searchParams.toString()
    ? `${TRAILS_ENDPOINT}?${searchParams.toString()}`
    : TRAILS_ENDPOINT;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trails: ${response.status}`);
  }

  return response.json();
}
