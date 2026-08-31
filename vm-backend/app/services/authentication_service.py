from datetime import UTC, datetime, timedelta
from app.config import settings
import jwt


def create_access_token(data: dict):
    to_encode = data.copy()
    
    #Set the expiration time for the token based on the config file
    expire = datetime.now(UTC) + timedelta(
        minutes=settings.JWT_EXPIRATION_MINUTES
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt