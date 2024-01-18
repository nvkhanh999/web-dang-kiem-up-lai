#CRUD for center account

from fastapi import Depends, Response, status, HTTPException, APIRouter
from random import randint
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import schemas
from .. import utils
from .. import oauth2

router = APIRouter(prefix = '/center', tags = ['Center'])

@router.get('/all', response_model = list[schemas.CenterResponse])
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing") #Copy 2 dòng này vào đầu tất cả các hàm

	centers = db.query(models.Center).all()
	return centers

@router.get('/latest', response_model = schemas.CenterResponse)
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	center = db.query(models.Center).order_by(models.Center.createdAt.desc()).first()

	if (center == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return center

@router.get('/{id}', response_model = schemas.CenterResponse)
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	center = db.query(models.Center).filter(models.Center.centerID == id).first()

	if (center == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"center with id {id} doesn't exist")

	return center

@router.post('/create', response_model = schemas.CenterResponse)
async def create(response: Response, center: schemas.CenterCreate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	while True:
		center.centerID = randint(50000, 99999)

		if (db.query(models.Center).filter(models.Center.centerID == center.centerID).first() == None):
			center.password = utils.hash(center.password)

			center = models.Center(**center.dict())

			db.add(center)
			db.commit()
			db.refresh(center)

			response.status_code = status.HTTP_200_OK

			return center
		
@router.delete('/delete/all')
async def delete(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	centersQuery = db.query(models.Center)

	centersQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.delete('/delete/{id}')
async def delete(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	centerQuery = db.query(models.Center).filter(models.Center.centerID == id)

	if (centerQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"center with id {id} doesn't exist")

	centerQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.put('/update/{id}', response_model = schemas.CenterResponse)
async def update(id: int, center: schemas.CenterUpdate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	centerQuery = db.query(models.Center).filter(models.Center.center_id == id)

	if (centerQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"center with id {id} doesn't exist")
	
	center.password = utils.hash(center.password)

	centerQuery.update(center.dict(), synchronize_session = False)
	db.commit()

	return centerQuery.first()

	