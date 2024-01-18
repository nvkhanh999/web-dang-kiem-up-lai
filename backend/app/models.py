#database models using sqlalchemy ORM library

from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql.expression import text

class Admin(Base):
	__tablename__ = "admin"

	adminID = Column(Integer, primary_key = True, nullable = False)
	username = Column(String, nullable = False, unique = True)
	password = Column(String, nullable = False)
	name = Column(String, nullable = False)
	email = Column(String, nullable = False, unique = True)
	phoneNumber = Column(String, nullable = False, unique = True)
	address = Column(String, nullable = False)
	createdAt = Column(DateTime, nullable = False, server_default = text('now()'))

class Center(Base):
	__tablename__ = "center"

	centerID = Column(Integer, primary_key = True, nullable = False)
	username = Column(String, nullable = False, unique = True)
	password = Column(String, nullable = False)
	name = Column(String, nullable = False, unique = True)
	email = Column(String, nullable = False, unique = True)
	phoneNumber = Column(String, nullable = False, unique = True)
	address = Column(String, nullable = False)
	area = Column(String, nullable = False)
	createdAt = Column(DateTime, nullable = False, server_default = text('now()'))
	adminID = Column(Integer, ForeignKey("admin.adminID", ondelete="CASCADE", onupdate = "CASCADE"), primary_key = False, nullable = False)

class Car(Base):
	__tablename__ = "car"

	carID = Column(String, primary_key = True, nullable = False)
	type = Column(String, nullable = False)
	brand = Column(String, nullable = False)
	color = Column(String, nullable = False)
	usage = Column(String, nullable = False)
	createdAt = Column(DateTime, nullable = False, server_default = text('now()'))
	ownerID = Column(Integer, ForeignKey("owner.ownerID", ondelete="CASCADE", onupdate = "CASCADE"), primary_key = False, nullable = False)

class Owner(Base):
	__tablename__ = "owner"

	ownerID = Column(Integer, primary_key = True, nullable = False)
	name = Column(String, nullable = False)
	phoneNumber = Column(String, nullable = False, unique = True)
	address = Column(String, nullable = False)
	createdAt = Column(DateTime, nullable = False, server_default = text('now()'))

class Registry(Base):
	__tablename__ = "registry"

	registryID = Column(Integer, primary_key = True, nullable = False)
	createdAt = Column(DateTime, nullable = False, server_default = text('now()'))
	endDate = Column(DateTime, nullable = False, server_default = text("now() + interval '6 months'"))
	carID = Column(String, ForeignKey("car.carID", ondelete="CASCADE", onupdate = "CASCADE"), primary_key = False, nullable = False)
	centerID = Column(Integer, ForeignKey("center.centerID", ondelete="CASCADE", onupdate = "CASCADE"), primary_key = False, nullable = False)