#CRUD for admin account 

from fastapi import Depends, Response, status, HTTPException, APIRouter
from random import randint
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import schemas
from .. import utils
from .. import oauth2

router = APIRouter(prefix = '/admin', tags = ['Admin'])

@router.get('/all', response_model = list[schemas.AdminResponse])
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	admins = db.query(models.Admin).all()
	return admins

@router.get('/latest', response_model = schemas.AdminResponse)
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	admin = db.query(models.Admin).order_by(models.Admin.createdAt.desc()).first()

	if (admin == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return admin

@router.get('/{id}', response_model = schemas.AdminResponse)
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	admin = db.query(models.Admin).filter(models.Admin.adminID == id).first()

	if (admin == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"admin with id {id} doesn't exist")

	return admin

@router.post('/create', status_code = status.HTTP_201_CREATED, response_model = schemas.AdminResponse)
async def create(admin: schemas.AdminCreate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	while True:
		admin.adminID = randint(10, 99)

		if (db.query(models.Admin).filter(models.Admin.adminID == admin.adminID).first() == None):
			admin.password = utils.hash(admin.password)

			admin = models.Admin(**admin.dict())

			db.add(admin)
			db.commit()
			db.refresh(admin)

			return admin
		
@router.delete('/delete/all')
async def delete(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	adminsQuery = db.query(models.Admin)

	adminsQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.delete('/delete/{id}')
async def delete(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	adminQuery = db.query(models.Admin).filter(models.Admin.adminID == id)

	if (adminQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"admin with id {id} doesn't exist")

	adminQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.put('/{id}', response_model = schemas.AdminResponse)
async def update(id: int, admin: schemas.AdminUpdate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	adminQuery = db.query(models.Admin).filter(models.Admin.adminID == id)

	if (adminQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"admin with id {id} doesn't exist")

	temp = []
	
	for (attr, value) in admin.__dict__.items():
		if (value == None):
			temp.append(attr)

	for (i) in temp:
		delattr(admin, i)

	if (hasattr(admin, 'password')):
		admin.password = utils.hash(admin.password)

	adminQuery.update(admin.dict(), synchronize_session = False)
	db.commit()

	return adminQuery.first()