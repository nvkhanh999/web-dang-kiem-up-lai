from fastapi import Depends, Response, status, HTTPException, APIRouter
from random import randint
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import schemas
from .. import utils
from .. import oauth2

router = APIRouter(prefix = '/verify', tags = ['Verify'])

@router.get('/')
async def get(response: Response, db: Session = Depends(getDatabase), userID: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(userID, 'centerID')):	
		user = db.query(models.Center).filter(models.Center.centerID == userID.centerID).first()

		response.status_code = status.HTTP_200_OK

		if (user == None):
			return Response(status_code = status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED)
		
		response.status_code = status.HTTP_200_OK

		return dict(access_token = oauth2.createAccessToken({'userID': userID.centerID}), token_type = "bearer", id = userID.centerID)
	
	else:
		user = db.query(models.Admin).filter(models.Admin.adminID == userID.adminID).first()
		if (user == None):
			return Response(status_code = status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED)
		
		response.status_code = status.HTTP_200_OK

		return dict(access_token = oauth2.createAccessToken({'userID': userID.adminID}), token_type = "bearer")