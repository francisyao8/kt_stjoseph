# le dossier resources contient la definition de toutes les route de mon application

# resources/catechiste.py

import json
from flask_restful import Resource
from helpers.catechiste import *
from flask import request
# from flask import jsonify

class CatechisteApi(Resource):


    def get(self, route):
        # Méthode GET pour lire tous les catetchistes ou un catetchiste spécifique
        if route == 'ReadAllCatchiste':
            return readAllCatechiste()  
       
        elif route == 'ReadSingleCatechiste':
            return readSingleCatechiste()
        
        
        
        if route == 'ReadTrashedCatechiste':
            return readTrashedCatechiste()

    def post(self, route):
        # Méthode POST pour créer un nouvel catetchiste
        if route == 'CreateCatechiste':
            return createCatechiste()
        
        if route == 'ReadSingleCatechiste': 
            return readSingleCatechiste()

        if route == 'ReadCatechisteBysection':
            return readCatechisteBysection()
        
        if route == 'ReadAllCatchiste':
            return readAllCatechiste() 


    def patch(self, route):
        # Méthode PATCH pour mettre à jour un catetchiste
        if route == 'UpdateCatechiste':
            return updateCatechiste()

    def delete(self, route):
        # Méthode DELETE pour supprimer un catetchiste
        if route == 'DeleteCatechiste':
            return deleteCatechiste()