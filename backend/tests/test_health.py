def test_health_returns_status(client):
    response = client.get("/health")

    assert response.status_code == 200
    data = response.json()
    assert "status" in data
