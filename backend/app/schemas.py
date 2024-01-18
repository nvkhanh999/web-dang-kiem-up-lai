#CRUD request and response model

from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Account(BaseModel):
	username: str
	email: str
	phoneNumber: str
	address: str
	name: str

class AdminBase(Account):
	pass

class AdminUpdate(BaseModel):
	username: Optional[str]
	email: Optional[str]
	phoneNumber: Optional[str]
	address: Optional[str]
	name: Optional[str]
	password: Optional[str]
	
class AdminCreate(AdminBase):
	adminID: Optional[int]
	password: str

class AdminResponse(AdminBase):
	createdAt: datetime
	adminID: int
	
	class Config:
		orm_mode = True

class CenterBase(Account):
	adminID: int = 16
	area: str

class CenterUpdate(CenterBase):
	password: str
	
class CenterCreate(CenterBase):
	password: str
	centerID: Optional[int]

class CenterResponse(CenterBase):
	createdAt: datetime
	centerID: int
	
	class Config:
		orm_mode = True

class Token(BaseModel):
	access_token: str
	token_type: str

class TokenData(BaseModel):
	id: Optional[str] = None

class Registry(BaseModel):
	carID: str
	centerID: int

class RegistryCreate(Registry):
	createdAt: Optional[datetime]
	endDate: Optional[datetime]
	registryID: Optional[int]

class RegistryResponse(Registry):
	registryID: int
	endDate: datetime
	createdAt: datetime

	class Config:
		orm_mode = True

class Car(BaseModel):
	carID: str
	type: str
	brand: str
	color: str
	usage: str
	ownerID: int

class CarResponse(Car):
	pass

	class Config:
		orm_mode = True

class CarCreate(Car):
	pass

class Owner(BaseModel):
	ownerID: int
	name: str
	phoneNumber: str
	address: str

class OwnerCreate(Owner):
	pass

class OwnerResponse(Owner):
	pass

	class Config:
		orm_mode = True