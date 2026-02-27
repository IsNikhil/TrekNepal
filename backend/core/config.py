from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Trek Nepal Backend"
    APP_ENV: str = "development"

    DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()