# le dossier resources contient la definition de toutes les route de mon application

# resources/user.py

import json
from flask_restful import Resource
from helpers.user import *
from flask import request
# from flask import jsonify

class UserApi(Resource):
    def get(self, route):
        # Méthode GET pour lire tous les utilisateurs ou un utilisateur spécifique
        if route == 'ReadAllUsers':
            return readAllUser()  
        # Méthode get pour lire un  utilisateur
        if route == 'ReadSingleUser':
            return readSingleUser()
        
        if route == 'ReadTrashedUsers':
            return readTrashedUsers()

    def post(self, route):
        # Méthode POST pour créer un nouvel utilisateur
        if route == 'CreateUser':
            return createUser()
        
        if route == 'ReadSingleUser': 
            return readSingleUser()
        
        if route == 'DeleteUser':
            return deleteUser()


    def patch(self, route):
        # Méthode PATCH pour mettre à jour un utilisateur
        if route == 'UpdateUser':
            return updateUser()

    def delete(self, route):
        # Méthode DELETE pour supprimer un utilisateur
        if route == 'DeleteUser':
            return deleteUser()