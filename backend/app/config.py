from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SECRET_KEY: str = "super-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    # DATABASE_URL: str = "postgresql://admin:password@localhost:5432/teraleads_db"
    DATABASE_URL: str = "postgresql://postgres:qwerty@localhost:5432/teraleads_db"
    OPENAI_API_KEY: str | bool = False

    model_config = SettingsConfigDict(env_file=str(Path(__file__).parents[1] / ".env"))


settings = Settings()
