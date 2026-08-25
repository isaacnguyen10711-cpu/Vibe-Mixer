from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    #Loaded from the DATABASE_URL variable in mm-backend/.env.
    DATABASE_URL: str
    
    #Loaded from the jwt_secret_key variable in mm-backend/.env.
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60
    
    #Loaded from the OpenAI_API_KEY variable in mm-backend/.env.
    OpenAI_API_KEY: str
    OpenAI_Model: str

    #Tell Pydantic where to find local environment variables.
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    


#Create one settings object that can be imported throughout the application.
settings = Settings()
