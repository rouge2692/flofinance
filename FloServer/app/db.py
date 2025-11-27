# from config import MONGODB_SETTINGS, SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_DATABASE_URI


# from pymongo import MongoClient

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import text

# SQLAlchemy requires app object, automatically searches config object for URI string
db1 = scoped_session(sessionmaker(bind=create_engine(SQLALCHEMY_DATABASE_URI)))

# Mongoclient requires connection string
# db2 = MongoClient(MONGODB_SETTINGS).get_database("SweepNoDB")
