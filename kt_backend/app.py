# app.py

# BLOCK DES IMPORTS
from flask import (Flask,render_template, request,redirect)
import os
from flask_restful import Resource,Api
from config.db import db
from flask_cors import CORS

from model.kt_stjoseph import *
from resources.catechumene import CatechumeneApi
from resources.user import UserApi
from resources.auth import AuthApi
from resources.catechiste import CatechisteApi
from config.constant import *
from flask_migrate import Migrate
import logging
from logging.handlers import RotatingFileHandler




# BLOCK DES DECLARATIONS
app = Flask(__name__)

# Configuration du logging pour enregistrer les requêtes HTTP
handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=1)
handler.setLevel(logging.DEBUG)
app.logger.addHandler(handler)

app.secret_key = os.urandom(24)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQL_DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

CORS(app)


# Log des requêtes HTTP
@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())




#user api
api.add_resource(UserApi, '/api/user/<string:route>', endpoint='user_all', methods=["GET","POST","PATCH","DELETE"])
api.add_resource(UserApi, '/api/user/<string:route>', endpoint='user_all_patch', methods=["PATCH","DELETE"])


# auth api
api.add_resource(AuthApi, '/api/auth/<string:route>', endpoint='auth_all', methods=["GET","POST"])
api.add_resource(AuthApi, '/api/auth/<string:route>', endpoint='auth_all_patch', methods=["PATCH","DELETE"])

#catechiste api
api.add_resource(CatechisteApi, '/api/catechiste/<string:route>', endpoint='catechiste_all', methods=["GET","POST"])
api.add_resource(CatechisteApi, '/api/catechiste/<string:route>', endpoint='catechiste_all_patch', methods=["PATCH","DELETE"])

# catechumene api
api.add_resource(CatechumeneApi, '/api/catechumene/<string:route>', endpoint='catechumene_all', methods=["GET","POST"])
api.add_resource(CatechumeneApi, '/api/catechumene/<string:route>', endpoint='catechumene_all_patch', methods=["PATCH","DELETE"])



# BLOCK OFFICIEL D'EXECUTION DE CODE
if __name__ == '__main__':
    app.run(debug=True,port=5000, host="0.0.0.0")
    
    
    