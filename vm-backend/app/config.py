from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    #Loaded from the DATABASE_URL variable in vm-backend/.env.
    DATABASE_URL: str
    
    #Loaded from the jwt_secret_key variable in vm-backend/.env.
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60 
    
    #Loaded from the OPENAI_API_KEY variable in vm-backend/.env.
    OPENAI_API_KEY: str
    OPENAI_MODEL: str
    
    YOUTUBE_API_KEY: str

    #Tell Pydantic where to find local environment variables.
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    


#Create one settings object that can be imported throughout the application.
settings = Settings()
