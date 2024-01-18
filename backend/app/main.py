#main driver

from fastapi import FastAPI
from . import models
from .database import engine
from .routers import admin, center, auth, userContext, registry, owner, car
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind = engine)

app = FastAPI()
# url which allow to request to backend
origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]

#middleware configuration
app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods = ["*"],
	allow_headers = ["*"]
)

app.include_router(admin.router)
app.include_router(center.router)
app.include_router(auth.router)
app.include_router(userContext.router)
app.include_router(registry.router)
app.include_router(car.router)
app.include_router(owner.router)