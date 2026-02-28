from uuid import uuid4


def _trail_payload(name: str | None = None) -> dict:
    return {
        "name": name or f"Test Trail {uuid4().hex[:8]}",
        "region": "Test Region",
        "difficulty": "hard",
        "distance_km": 123,
        "duration_days": 9,
        "elevation_gain_m": 2000,
        "max_elevation_m": 4500,
        "rating": 4.5,
        "review_count": 12,
        "description": "Test trail description",
        "lat": 27.7,
        "lng": 85.3,
        "tags": ["Test"],
        "best_season": ["March"],
        "permits": ["Test Permit"],
    }


def _create_trail(client, payload: dict | None = None) -> dict:
    response = client.post("/trails", json=payload or _trail_payload())
    assert response.status_code == 201
    return response.json()


def test_get_trails_has_expected_shape(client):
    response = client.get("/trails")

    assert response.status_code == 200
    data = response.json()
    assert {"total", "offset", "limit", "trails"}.issubset(data.keys())
    assert isinstance(data["trails"], list)


def test_get_trails_filter_difficulty_hard_returns_only_hard(client):
    response = client.get("/trails", params={"difficulty": "hard"})

    assert response.status_code == 200
    data = response.json()
    assert {"total", "offset", "limit", "trails"}.issubset(data.keys())
    assert all(trail["difficulty"] == "hard" for trail in data["trails"])


def test_post_trails_creates_trail_with_generated_id(client):
    created = _create_trail(client)
    trail_id = created["id"]

    try:
        assert isinstance(trail_id, str)
        assert trail_id.strip() != ""
    finally:
        client.delete(f"/trails/{trail_id}")


def test_put_trails_updates_fields_and_preserves_id(client):
    created = _create_trail(client)
    trail_id = created["id"]
    update_payload = _trail_payload(name=f"Updated Trail {uuid4().hex[:8]}")
    update_payload["difficulty"] = "moderate"
    update_payload["duration_days"] = 11

    try:
        response = client.put(f"/trails/{trail_id}", json=update_payload)
        assert response.status_code == 200

        updated = response.json()
        assert updated["id"] == trail_id
        assert updated["name"] == update_payload["name"]
        assert updated["difficulty"] == "moderate"
        assert updated["duration_days"] == 11
    finally:
        client.delete(f"/trails/{trail_id}")


def test_delete_trails_returns_204_and_get_after_delete_returns_404(client):
    created = _create_trail(client)
    trail_id = created["id"]

    delete_response = client.delete(f"/trails/{trail_id}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/trails/{trail_id}")
    assert get_response.status_code == 404
