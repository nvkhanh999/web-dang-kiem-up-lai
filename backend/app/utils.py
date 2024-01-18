#utilization functions

from passlib.context import CryptContext

pwd_context = CryptContext(schemes = ['bcrypt'], deprecated = 'auto') #Using hashing algorithm fom bcrypt

def hash(password: str):
    return pwd_context.hash(password)

def verify(password, hashed_password):
    return pwd_context.verify(password, hashed_password)

def extractByDay(datetime: str):
    return int(str(datetime)[8:10])

def extractByMonth(datetime: str):
    return int(str(datetime)[5:7])

def extractByYear(datetime: str):
    return int(str(datetime)[0:4])