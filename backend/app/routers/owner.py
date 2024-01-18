#CRUD for owner information

from fastapi import Depends, Response, status, HTTPException, APIRouter
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import schemas
from .. import oauth2

router = APIRouter(prefix = '/owner', tags = ['Owner'])

@router.get('/all', response_model = list[schemas.OwnerResponse])
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):	
	owner = db.query(models.Owner).all()
	return owner

@router.get('/latest', response_model = schemas.OwnerResponse)
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	owner = db.query(models.Owner).order_by(models.Owner.createdAt.desc()).first()

	if (owner == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return owner

@router.get('/{id}', response_model = schemas.OwnerResponse)
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	owner = db.query(models.Owner).filter(models.Owner.ownerID == id).first()

	if (owner == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"owner with id {id} doesn't exist")

	return owner

@router.post('/create', response_model = schemas.OwnerResponse)
async def create(response: Response, owner: schemas.OwnerCreate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	ownerQuery = db.query(models.Owner).filter(models.Owner.ownerID == owner.ownerID)

	if (ownerQuery.first() != None):

		#ownerQuery.delete(synchronize_session = False)
		#db.commit()

		ownerQuery.update(owner.dict(), synchronize_session = False)
		db.commit()

		return owner

	owner = models.Owner(**owner.dict())

	db.add(owner)
	db.commit()
	db.refresh(owner)

	response.status_code = status.HTTP_200_OK

	return owner
		
@router.delete('/delete/all')
async def delete(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	ownersQuery = db.query(models.Owner)

	ownersQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.delete('/delete/{id}')
async def delete(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	ownerQuery = db.query(models.Owner).filter(models.Owner.ownerID == id)

	if (ownerQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"owner with id {id} doesn't exist")

	if (hasattr(user, 'centerID')):
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	ownerQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.put('/update/{id}', response_model = schemas.OwnerResponse)
async def update(id: int, owner: schemas.Owner, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	ownerQuery = db.query(models.Owner).filter(models.Owner.ownerID == id)

	if (ownerQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"owner with id {id} doesn't exist")
	

	ownerQuery.update(owner.dict(), synchronize_session = False)
	db.commit()

	return ownerQuery.first()