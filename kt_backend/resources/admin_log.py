# le dossier resources contient la definition de toutes les route de mon application

# resources/user.py

import json
from flask_restful import Resource
from helpers.admin_log import *
from flask import request
# from flask import jsonify

class LogApi(Resource):
    def get(self, route):
        if route == 'getlogs':
            return  get_logs()
()  



