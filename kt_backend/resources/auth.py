# le dossier resources contient la definition de toutes les route de mon application

# resources/auth.py

import json
from flask_restful import Resource
from helpers.auth import *
from flask import request
# from flask import jsonify

class AuthApi(Resource):

    def get(self, route):
        if route == 'GetConnectedAdmins':
            return GetConnectedAdmins()

    def post(self, route):
        if route == 'login': 
            return AdminLogin()
        
    def patch(self, route):
        return True
        
    def delete(self, route):
        return True