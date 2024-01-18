#login and authentication

from fastapi import Depends, Response, status, HTTPException, APIRouter
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import utils, oauth2

router = APIRouter(tags = ['Authentication'])

@router.post('/login')
async def login(response: Response, userCredentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(getDatabase)):
	user = db.query(models.Center).filter(models.Center.username == userCredentials.username).first()
	permissionCheck = True

	if (user == None):
		user = db.query(models.Admin).filter(models.Admin.username == userCredentials.username).first()
		permissionCheck = False

	if (user == None):
		raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = f'Wrong username or password')

	if (utils.verify(userCredentials.password, user.password) == False):
		raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = f'Wrong username or password')

	if (permissionCheck):
		response.status_code = status.HTTP_200_OK
		
		return dict(access_token = oauth2.createAccessToken({'userID': user.centerID}), token_type = "bearer", id = user.centerID)
	
	response.status_code = status.HTTP_200_OK

	return dict(access_token = oauth2.createAccessToken({'userID': user.adminID}), token_type = "bearer")