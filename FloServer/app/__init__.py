from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


# Data Processing Imports
import pandas as pd
import random
from datetime import datetime
from geopy.geocoders import GeoNames
import requests
import json


# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Initialize Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
