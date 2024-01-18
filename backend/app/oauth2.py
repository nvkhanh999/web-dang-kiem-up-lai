#jwt generation and authentication methods

from jose import JWTError, jwt
from datetime import datetime, timedelta
from .schemas import TokenData
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import models, database
from .config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl = 'login')


SECRET_KEY = settings.secret_key

ALGORITHM = settings.algorithm

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def createAccessToken(data: dict):
	toEncode = data.copy()

	expire = datetime.utcnow() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)

	toEncode.update({'exp': expire})

	return jwt.encode(toEncode, SECRET_KEY, algorithm = ALGORITHM)


def verifyAccessToken(token: str, credentialsException):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])

		id: str = payload.get('userID')

		if (id == None):
			raise credentialsException

		token_data = TokenData(id = id)
	except JWTError:
		raise credentialsException
	
	return token_data

	
def getCurrentUser(token: str = Depends(oauth2_scheme), db: Session = Depends(database.getDatabase)):
	credentialsException = HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = f'bbbInvalid Token', headers = {'WWW-Authenticate': 'Bearer'})

	token = verifyAccessToken(token, credentialsException)
	user = db.query(models.Center).filter(models.Center.centerID == token.id).first()

	if (user == None):
		user = db.query(models.Admin).filter(models.Admin.adminID == token.id).first()

	return user