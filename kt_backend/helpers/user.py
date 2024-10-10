    # helpers/user.py
from flask import request, jsonify
from model.kt_stjoseph import (kt_users)
from config.db import db
import uuid
from werkzeug.security import generate_password_hash



def createUser():
    response = {}

    try:
        matricule = "AD" + str(uuid.uuid4()).upper().replace('-', '')[:4]
        lastname = request.json.get('u_lastname')
        firstname = request.json.get('u_firstname')
        mobile = request.json.get('u_mobile')
        address = request.json.get('u_address')
        email = request.json.get('u_email')
        username = request.json.get('u_username')
        password = request.json.get('u_password')
        role = request.json.get('u_role')

        if not (lastname and firstname and mobile and address and email and username and password):
            response['status'] = 'error'
            response['message'] = 'Missing required fields'
            return response

        new_user = kt_users()

        new_user.u_matricule = matricule
        new_user.u_lastname = lastname
        new_user.u_firstname = firstname
        new_user.u_mobile = mobile
        new_user.u_address = address
        new_user.u_email = email
        new_user.u_username = username
        new_user.u_role = role

        # Check if the password is provided
        if not password:
            response['status'] = 'error'
            response['message'] = 'Password is required'
            return response

        # Generate password hash
        new_user.u_password = generate_password_hash(password, method='pbkdf2:sha256')

        db.session.add(new_user)
        db.session.commit()

        response['status'] = 'success'
        response['message'] = 'User created successfully'
        response['u_matricule'] = new_user.u_matricule
        response['u_uid'] = new_user.u_uid

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response


# Fonction pour lire tous les utilisateurs.
def readAllUser():
    response = {}
    try:
        all_users = kt_users.query.all()
        users_list = []
        
        for user in all_users:
            user_data = {

                'u_uid' : user.u_uid,
                'u_matricule': user.u_matricule,
                'u_lastname': user.u_lastname,
                'u_firstname': user.u_firstname,
                'u_mobile': user.u_mobile,
                'u_address': user.u_address,
                'u_email': user.u_email,
                'u_username': user.u_username,
                'u_role': user.u_role,
                'u_role': user.u_role,
                'u_last_login': str(user.u_last_login),
                'u_creation_date': str(user.u_creation_date),
            }
            users_list.append(user_data)
        
        response['status'] = 'success'
        response['message'] = 'Users retrieved successfully'
        response['users'] = users_list
        
    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response


# Fonction pour lire un utilisateur spécifique.
def readSingleUser():
    response = {}
    try:
        u_uid = request.json.get('u_uid')
        user = kt_users.query.filter_by(u_uid=u_uid).first()

        if user:
            user_data = {
                'u_uid' : user.u_uid,
                'u_matricule': user.u_matricule,
                'u_lastname': user.u_lastname,
                'u_firstname': user.u_firstname,
                'u_mobile': user.u_mobile,
                'u_address': user.u_address,
                'u_email': user.u_email,
                'u_username': user.u_username,
                'u_role': user.u_role,
                'u_last_login': str(user.u_last_login),
                'u_creation_date': str(user.u_creation_date),

            }
            response['status'] = 'success'
            response['message'] = 'User retrieved successfully'
            response['user'] = user_data
        else:
            response['status'] = 'error'
            response['message'] = 'User not found'
        
    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response
  
        
        
# Fonction pour mettre à jour un utilisateur.

def updateUser():
    response = {}

    uid = request.json.get('u_uid')
    matricule = request.json.get('u_matricule')  # Récupérer le matricule depuis la requête JSON

    # Récupérer les autres informations de l'utilisateur depuis la requête JSON
    lastname = request.json.get('u_lastname')
    firstname = request.json.get('u_firstname')
    mobile = request.json.get('u_mobile')
    address = request.json.get('u_address')
    email = request.json.get('u_email')
    username = request.json.get('u_username')
    password = request.json.get('u_password')
    role = request.json.get('u_role')

    # Recherche de l'utilisateur à mettre à jour en fonction de l'ID et du matricule
    up_user = kt_users.query.filter_by(u_uid=uid).first()

    if up_user:
        # Mettre à jour les informations de l'utilisateur
        up_user.u_lastname = lastname 
        up_user.u_firstname = firstname
        up_user.u_mobile = mobile
        up_user.u_address = address
        up_user.u_email = email
        up_user.u_username = username
        up_user.u_role = role

        # Vérifier si un nouveau mot de passe est fourni
        if password:
            up_user.u_password = generate_password_hash(password, method='pbkdf2:sha256')

        try:
            db.session.commit()
            response['status'] = 'success'
            response['message'] = 'User updated successfully'
            response['u_matricule'] = up_user.u_matricule
            response['u_uid'] = up_user.u_uid

        except Exception as e:
            response['error_description'] = str(e)
            response['status'] = 'error'
            response['error_message'] = 'Failed to update user'

    else:
        response['status'] = 'error'
        response['error_message'] = 'User not found or matricule mismatch'

    return response



        
        
# Fonction pour supprimer un utilisateur.
def deleteUser():
    response = {}

    if request.method == 'POST' or request.method == 'DELETE':
        u_uid = request.json.get('u_uid')
        u_matricule = request.json.get('u_matricule')

        try:
            del_user = kt_users.query.filter_by(u_uid=u_uid, u_matricule=u_matricule).first()

            if del_user:
                db.session.delete(del_user)
                db.session.commit()

                response['status'] = 'success'
                response['message'] = 'User deleted successfully'
            else:
                response['status'] = 'error'
                response['message'] = 'User not found'
        except Exception as e:
            response['error_description'] = str(e)
            response['status'] = 'error'
            response['message'] = 'Failed to delete user.'
    else:
        response['status'] = 'error'
        response['message'] = 'Method not allowed'

    return response



