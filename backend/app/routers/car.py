#CRUD for car information

from fastapi import Depends, Response, status, HTTPException, APIRouter
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from .. import schemas
from .. import oauth2

router = APIRouter(prefix = '/car', tags = ['Car'])

@router.get('/all', response_model = list[schemas.CarResponse])
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	car = db.query(models.Car).all()
	return car

@router.get('/latest', response_model = schemas.CarResponse)
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	car = db.query(models.Car).order_by(models.Car.createdAt.desc()).first()

	if (car == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return car

@router.get('/{id}', response_model = schemas.CarResponse)
async def get(id: str, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	car = db.query(models.Car).filter(models.Car.carID == id).first()

	if (car == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"car with licensePlate {id} doesn't exist")
	
	return car

@router.post('/create', response_model = schemas.CarResponse)
async def create(response: Response, car: schemas.CarCreate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	carQuery = db.query(models.Car).filter(models.Car.carID == car.carID)

	if (carQuery.first() != None):
		#carQuery.delete(synchronize_session = False)
		#db.commit()

		carQuery.update(car.dict(), synchronize_session = False)
		db.commit()

		return car

	car = models.Car(**car.dict())

	db.add(car)
	db.commit()
	db.refresh(car)

	response.status_code = status.HTTP_200_OK

	return car
		
@router.delete('/delete/all')
async def delete(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	carsQuery = db.query(models.Car)

	carsQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.delete('/delete/{id}')
async def delete(id: str, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	carQuery = db.query(models.Car).filter(models.Car.carID == id)

	if (carQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"car with id {id} doesn't exist")

	carQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.put('/{id}', response_model = schemas.CarResponse)
async def update(id: int, car: schemas.Car, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	carQuery = db.query(models.Car).filter(models.Car.carID == id)

	if (carQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"car with license plate {id} doesn't exist")

	temp = []
	
	for (attr, value) in car.__dict__.items():
		if (value == None):
			temp.append(attr)

	for (i) in temp:
		delattr(car, i)

	carQuery.update(car.dict(), synchronize_session = False)
	db.commit()

	return car.first()