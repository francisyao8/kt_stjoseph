# le dossier resources contient la definition de toutes les route de mon application

# resources/catechumene.py

import json
from flask_restful import Resource
from helpers.catechumene import *
from flask import request
# from flask import jsonify

class CatechumeneApi(Resource):



    def get(self, route):
        # Méthode GET pour lire tous les catechumenes ou un catechumene spécifique
        if route == 'ReadAllCatechumene':
            return readAllCatechumene()  
       
        if route == 'ReadSingleCatechumene':
            return readSingleCatechumene()
        
        elif route == 'ReadCatechumeneBySectionAndLevel':
            return readCatechumeneBySectionAndLevel()  

    def post(self, route):
        # Méthode POST pour créer un nouvel catechumene
        if route == 'CreateCatechumene':
            return createCatechumene()
        
        if route == 'validateRegistration':
            return confirmation()

        if route == 'ReadSingleCatechumene': 
            return readSingleCatechumene()
        
        elif route == 'ReadCatechumeneBySectionAndLevel':
            return readCatechumeneBySectionAndLevel()  


    def patch(self, route):
        # Méthode PATCH pour mettre à jour un catechumene
        if route == 'UpdateCatechumene':
            return updateCatechumene()

    def delete(self, route):
        # Méthode DELETE pour supprimer un catechumene
        if route == 'DeleteCatechumene':
            return deleteCatechumene()