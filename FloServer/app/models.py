from dataclasses import dataclass
import datetime

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, JSON, Computed
from sqlalchemy.dialects.postgresql import ARRAY

from pydantic import BaseModel


class Base(DeclarativeBase):
    pass
