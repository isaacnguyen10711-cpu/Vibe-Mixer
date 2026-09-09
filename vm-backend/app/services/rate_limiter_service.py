from slowapi import Limiter
from slowapi.util import get_remote_address

# Initialize the rate limiter with the remote address as the key function.
limiter = Limiter(key_func=get_remote_address) 