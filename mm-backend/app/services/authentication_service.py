from datetime import UTC, datetime, timedelta
from app.config import settings
import jwt


def create_access_token(data: dict):
    to_encode = data.copy()
    
    #Set the expiration time for the token based on the config file
    expire = datetime.now(UTC) + timedelta(
        minutes=settings.jwt_expiration_minutes
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt