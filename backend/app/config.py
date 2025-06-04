from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = "super-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    # DATABASE_URL: str = "postgresql://admin:password@localhost:5432/teraleads_db"
    DATABASE_URL: str = "postgresql://postgres:qwerty@localhost:5432/teraleads_db"

    class Config:
        # load from .env file if present
        env_file = ".env"


settings = Settings()
