#CRUD for registry information, registration prediction and chart data

from fastapi import Depends, Response, status, HTTPException, APIRouter
from random import randint
from .. import models
from ..database import getDatabase
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import schemas
from .. import utils
from .. import oauth2
from datetime import datetime, timedelta, date

router = APIRouter(prefix = '/registry', tags = ['Registry'])

@router.get('/all', response_model = list[schemas.RegistryResponse])
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	registry = db.query(models.Registry).all()
	return registry

@router.get('/latest', response_model = schemas.RegistryResponse)
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	registry = db.query(models.Registry).order_by(models.Registry.createdAt.desc()).first()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return registry

@router.get('/latest/{n}', response_model = list[schemas.RegistryResponse])
async def get(n: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	registry = db.query(models.Registry).order_by(models.Registry.createdAt.desc()).limit(n).all()
	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return registry

@router.get('/latest/{id}/{n}', response_model = list[schemas.RegistryResponse])
async def get(n: int, id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	registry = db.query(models.Registry).filter(models.Registry.centerID == id).order_by(models.Registry.createdAt.desc()).limit(n).all()
	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return registry

#prediction by month
@router.get('/month')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	month = utils.extractByMonth(now)
	theDate = date(year, month, 1)

	registry = db.query(models.Registry).filter(models.Registry.createdAt >= theDate).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': month}

@router.get('/month/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	month = utils.extractByMonth(now)
	theDate = date(year, month, 1)

	registry = db.query(models.Registry).filter(models.Registry.createdAt >= theDate, models.Registry.centerID == id).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': month}

#prediction by quarter
@router.get('/quarter')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	month = utils.extractByMonth(now)

	if (month >= 1 and month <= 3):
		preDate = date(year, 1, 1)
		postDate = date(year, 4, 1)
		quarter = 1
	elif (month >= 4 and month <= 6):
		preDate = date(year, 4, 1)
		postDate = date(year, 7, 1)
		quarter = 2
	elif (month >= 7 and month <= 9):
		preDate = date(year, 7, 1)
		postDate = date(year, 10, 1)
		quarter = 3
	else:
		preDate = date(year, 10, 1)
		postDate = date(year + 1, 1, 1)
		quarter = 4


	registry = db.query(models.Registry).filter(models.Registry.createdAt >= preDate, models.Registry.createdAt < postDate).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': quarter}

@router.get('/quarter/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	month = utils.extractByMonth(now)

	if (month >= 1 and month <= 3):
		preDate = date(year, 1, 1)
		postDate = date(year, 4, 1)
		quarter = 1
	elif (month >= 4 and month <= 6):
		preDate = date(year, 4, 1)
		postDate = date(year, 7, 1)
		quarter = 2
	elif (month >= 7 and month <= 9):
		preDate = date(year, 7, 1)
		postDate = date(year, 10, 1)
		quarter = 3
	else:
		preDate = date(year, 10, 1)
		postDate = date(year + 1, 1, 1)
		quarter = 4


	registry = db.query(models.Registry).filter(models.Registry.createdAt >= preDate, models.Registry.createdAt < postDate, models.Registry.centerID == id).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': quarter}

#prediction by year
@router.get('/year')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	theDate = date(year, 1, 1)

	registry = db.query(models.Registry).filter(models.Registry.createdAt >= theDate).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': year}

@router.get('/year/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	year = utils.extractByYear(now)
	theDate = date(year, 1, 1)

	registry = db.query(models.Registry).filter(models.Registry.createdAt >= theDate, models.Registry.centerID == id).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return {'data': registry, 'date': year}

#line chart data prediction
@router.get('/line')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	month = utils.extractByMonth(now)
	year = utils.extractByYear(now)

	B = []
	T = []
	N = []

	areaSumValue = {
		'Miền Bắc': 0,
		'Miền Trung': 0,
		'Miền Nam': 0
	}

	for x in range(9, -1, -1):
		if (month > x):
			monthNow = month - x
			yearNow = year
		else:
			monthNow = month - x + 12
			yearNow = year - 1

		preDate = date(yearNow, monthNow, 1)
		if (monthNow >= 12):
			postDate = date(yearNow + 1, 1, 1)
		else:
			postDate = date(yearNow, monthNow + 1, 1)

		monthQuery = db.query(models.Center).join(
	 		models.Registry, models.Center.centerID == models.Registry.centerID , isouter = False).filter(
			models.Registry.createdAt >= preDate, models.Registry.createdAt < postDate).group_by(models.Center.area).values(
			models.Center.area, func.count(models.Center.area))

		whileTrue = True

		areaName = {
		'Miền Bắc': 0,
		'Miền Trung': 0,
		'Miền Nam': 0
		}

		while(whileTrue):
			try:
				temp = next(monthQuery)
			except:
				whileTrue = False
				continue	

			areaName[temp[0]] = temp[1]
			areaSumValue[temp[0]] += temp[1]

		B.append({'x': str(monthNow) + '/' + str(yearNow), 'y': areaName['Miền Bắc']})

		T.append({'x': str(monthNow) + '/' + str(yearNow), 'y': areaName['Miền Trung']})

		N.append({'x': str(monthNow) + '/' + str(yearNow), 'y': areaName['Miền Nam']})

	if (month >= 12):
		month = 1
		year += 1
	else:
		month += 1
	
	B.append({'x': str(month) + '/' + str(year), 'y': areaSumValue['Miền Bắc'] / 10})
	T.append({'x': str(month) + '/' + str(year), 'y': areaSumValue['Miền Trung'] / 10})
	N.append({'x': str(month) + '/' + str(year), 'y': areaSumValue['Miền Nam'] / 10})

	return [{'id': 'Miền Bắc', 'color': '#4cceac', 'data': B, 'sum': areaSumValue['Miền Bắc']}, {'id': 'Miền Trung', 'color': '#a4a9fc', 'data': T, 'sum': areaSumValue['Miền Trung']}, {'id': 'Miền Nam', 'color' : '#f1b9b7', 'data': N, 'sum': areaSumValue['Miền Nam']}]

@router.get('/line/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	month = utils.extractByMonth(now)
	year = utils.extractByYear(now)

	result = []

	sum = 0

	for x in range(9, -1, -1):
		if (month > x):
			monthNow = month - x
			yearNow = year
		else:
			monthNow = month - x + 12
			yearNow = year - 1

		preDate = date(yearNow, monthNow, 1)
		if (monthNow >= 12):
			postDate = date(yearNow + 1, 1, 1)
		else:
			postDate = date(yearNow, monthNow + 1, 1)

		value = db.query(models.Registry).filter(models.Registry.createdAt >= preDate, models.Registry.createdAt < postDate, models.Registry.centerID == id).count()

		result.append({'x': str(monthNow) + '/' + str(yearNow), 'y': value})

		sum += value

	if (month >= 12):
		month = 1
		year += 1
	else:
		month += 1
	
	result.append({'x': str(month) + '/' + str(year), 'y': sum / 10})

	return [{'id': 'Lượng xe đăng kiểm', 'color': '#4cceac', 'data': result, 'sum': sum}]

#pie chart data prediction
@router.get('/pie')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	usageSumValue = {
		'Xe khách': 0,
		'Xe bán tải': 0,
		'Xe tải': 0,
		'Xe con': 0,
		'Xe chuyên dụng': 0
	}

	color = ['#4cceac', '#4cceac', '#4cceac', '#4cceac', '#4cceac']

	carQuery = db.query(models.Car).join(
	 		models.Registry, models.Car.carID == models.Registry.carID , isouter = False).group_by(models.Car.usage).values(
			models.Car.usage, func.count(models.Car.usage))
	
	while (True):
		try:
			temp = next(carQuery)
			usageSumValue[temp[0]] = temp[1]
		except:
			break

	result = []

	index = 0

	for key in usageSumValue:
		result.append({'id': key, 'color': color[0], 'value': usageSumValue[key]})
		index += 1

	return result

@router.get('/pie/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	usageSumValue = {
		'Xe khách': 0,
		'Xe bán tải': 0,
		'Xe tải': 0,
		'Xe con': 0,
		'Xe chuyên dụng': 0
	}

	color = ['#4cceac', '#4cceac', '#4cceac', '#4cceac', '#4cceac']

	carQuery = db.query(models.Car).join(
	 		models.Registry, models.Car.carID == models.Registry.carID, isouter = False).filter(models.Registry.centerID == id).group_by(models.Car.usage).values(
			models.Car.usage, func.count(models.Car.usage))
	
	while (True):
		try:
			temp = next(carQuery)
			usageSumValue[temp[0]] = temp[1]
		except:
			break

	result = []

	index = 0

	for key in usageSumValue:
		result.append({'id': key, 'color': color[0], 'value': usageSumValue[key]})
		index += 1

	return result

#notification about the number of almost expired registries
@router.get('/almostExpired')
async def get(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	theDate = date(utils.extractByYear(now), utils.extractByMonth(now), utils.extractByDay(now)) - timedelta(days = 30)

	registry = db.query(models.Registry).filter(models.Registry.endDate < theDate).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return registry

@router.get('/almostExpired/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	now = datetime.utcnow().date()
	theDate = date(utils.extractByYear(now), utils.extractByMonth(now), utils.extractByDay(now)) - timedelta(days = 30)

	registry = db.query(models.Registry).filter(models.Registry.endDate < theDate, models.Registry.centerID == id).count()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Nothing")

	return registry

#return date of the registry
@router.get('/date/{id}')
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	registry = db.query(models.Registry).filter(models.Registry.registryID == id).first()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"registry with {id} doesn't exist")
	
	if (hasattr(user, 'centerID')):	
		if (registry.__dict__['centerID'] != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	return {'startDate': date(utils.extractByYear(registry.createdAt), utils.extractByMonth(registry.createdAt), utils.extractByDay(registry.createdAt)), 
		'endDate': date(utils.extractByYear(registry.endDate), utils.extractByMonth(registry.endDate), utils.extractByDay(registry.endDate)),
		'carID': registry.carID}

#return date of the registry by centerID
@router.get('/center/{id}', response_model = list[schemas.RegistryResponse])
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (id != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	registry = db.query(models.Registry).filter(models.Registry.centerID == id).all()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"registry with centerID {id} doesn't exist")

	return registry

@router.get('/{id}', response_model = schemas.RegistryResponse)
async def get(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):	
	registry = db.query(models.Registry).filter(models.Registry.registryID == id).first()

	if (registry == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"registry with id {id} doesn't exist")

	if (hasattr(user, 'centerID')):	
		if (registry.__dict__['centerID'] != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	return registry

@router.post('/create', response_model = schemas.RegistryResponse)
async def create(response: Response, registry: schemas.RegistryCreate, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		if (registry.centerID != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
		
	registryQuery = db.query(models.Registry).filter(models.Registry.carID == registry.carID)
	
	if (registryQuery.first() != None):
		registryDict = registryQuery.first().__dict__

		if (registryDict['centerID'] != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

		registry.registryID = registryDict['registryID']
			
		if (hasattr(user, 'createdAt') == False):
			registry.createdAt = registryDict['createdAt']

		if (hasattr(user, 'endDate') == False):
			registry.endDate = registryDict['endDate']

		registryQuery.update(registry.dict(), synchronize_session = False)
		db.commit()

		return registry

	while True:
		registry.registryID = randint(100000000, 999999999)

		if (db.query(models.Registry).filter(models.Registry.registryID == registry.registryID).first() == None):
			registry = models.Registry(**registry.dict())
			
			db.add(registry)
			db.commit()
			db.refresh(registry)

			response.status_code = status.HTTP_200_OK

			return registry
		
@router.delete('/delete/all')
async def delete(db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	if (hasattr(user, 'centerID')):	
		raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	registrysQuery = db.query(models.Registry)

	registrysQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.delete('/delete/{id}')
async def delete(id: int, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	registryQuery = db.query(models.Registry).filter(models.Registry.registryID == id)

	if (registryQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"registry with id {id} doesn't exist")

	if (hasattr(user, 'centerID')):	
		if (registryQuery.first().__dict__['centerID'] != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")

	registryQuery.delete(synchronize_session = False)
	db.commit()

	return Response(status_code = status.HTTP_204_NO_CONTENT)

@router.put('/{id}', response_model = schemas.RegistryResponse)
async def update(id: int, registry: schemas.Registry, db: Session = Depends(getDatabase), user: int = Depends(oauth2.getCurrentUser)):
	registryQuery = db.query(models.Registry).filter(models.Registry.registryID == id)

	if (registryQuery.first() == None):
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"registry with id {id} doesn't exist")

	if (hasattr(user, 'centerID')):	
		if (registryQuery.first().__dict__['centerID'] != user.centerID):
			raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Nothing")
	
	temp = []
	
	for (attr, value) in registry.__dict__.items():
		if (value == None):
			temp.append(attr)

	for (i) in temp:
		delattr(registry, i)

	registryQuery.update(registry.dict(), synchronize_session = False)
	db.commit()

	return registry.first()