from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Trek Nepal Backend"
    APP_ENV: str = "development"

    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/trekdb"

    class Config:
        env_file = ".env"

settings = Settings()
