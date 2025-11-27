#######################################################
####### FloServer Server Side Flask Application
#######################################################

from config import SECRET_KEY, SQLALCHEMY_DATABASE_URI, FRONTEND_ORIGIN

# Flask Imports
from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
from flask_login import (
    LoginManager,
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from werkzeug.security import generate_password_hash, check_password_hash


# Data Processing Imports
import pandas as pd
import random
from datetime import datetime
from geopy.geocoders import GeoNames
import requests
import json

# Database Imports
from app.db import db1, db2

# Admin Routes
# from app.routes.head_routes import head_routes

# Initialize Flask App
app = Flask(__name__)

#######################################################
####### App Config
#######################################################
app.secret_key = SECRET_KEY
# Cookies for dev (same-origin or localhost)
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",  # In prod cross-site: set "None"
    SESSION_COOKIE_SECURE=False,  # In prod HTTPS: set True
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.register_blueprint(head_routes)

#######################################################
####### LoginManager requires app object
#######################################################
login_manager = LoginManager()
login_manager.init_app(app)

#######################################################
####### CORS requires app object
#######################################################
CORS(app, supports_credentials=True, origins=FRONTEND_ORIGIN)


#######################################################
####### SQLAlchemy requires session closure
#######################################################
@app.teardown_appcontext
def shutdown_session(exception=None):
    db1.remove()


################################################################
####### Flask Login User Model and Login Helper Functions
################################################################
class User(UserMixin):
    def __init__(
        self,
        user_id: str,
        email: str,
        name: str,
        picture: str,
        phone: str,
        accountStatus: str,
    ):
        self.id = user_id
        self.email = email
        self.name = name
        self.picture = picture
        self.phone = phone
        self.accountStatus = accountStatus
        self.cryp_pass = None
        self.google_sub = None

    def to_dict(self):
        return {
            "SP00D1006": self.id,
            "SP00D1002": self.email,
            "SP00D1001": self.name,
            "SP00D1004": self.phone,
            "SP00D1017": self.picture,
            "SP00D1005": self.cryp_pass,
            "SP00D1018": self.google_sub,
            "SP00D1019": self.accountStatus,
        }

    # helpers
    def set_password(self, plaintext: str):
        self.cryp_pass = generate_password_hash(plaintext)

    def check_password(self, plaintext: str) -> bool:
        return check_password_hash(self.cryp_pass, plaintext)
