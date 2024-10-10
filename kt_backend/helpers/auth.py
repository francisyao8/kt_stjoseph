# helpers/user.py
from flask import request, jsonify
from model.kt_stjoseph import kt_users
from config.db import db
from werkzeug.security import check_password_hash
import json
from datetime import datetime
import logging

# ...

# Fonction pour permettre au user de se connecter.
def AdminLogin():
    response = {}
    u_username = request.json.get('u_username')
    u_password = request.json.get('u_password')
    try:
        rs = {}
        admin_user = kt_users.query.filter_by(u_username=u_username).first()
        if admin_user and check_password_hash(admin_user.u_password, u_password):
           
            admin_user.u_last_login = datetime.utcnow()
            db.session.commit() 
            
            rs['u_matricule'] = admin_user.u_matricule
            rs['u_uid'] = admin_user.u_uid
            rs['u_firstname'] = admin_user.u_firstname
            rs['u_lastname'] = admin_user.u_lastname
            rs['u_username'] = admin_user.u_username
            rs['u_mobile'] = admin_user.u_mobile
            rs['u_address'] = admin_user.u_address
            rs['u_email'] = admin_user.u_email
            rs['u_role'] = admin_user.u_role
            rs['u_last_login'] = str(admin_user.u_last_login)
            rs['u_creation_date'] = str(admin_user.u_creation_date)
            rs['u_updated_date'] = str(admin_user.u_updated_date)

            response['status'] = 'success'
            response['message'] = 'Admin login successful'
            response['result'] = rs
            return response, 200, {'Content-Type': 'application/json'}
        else:
            response['status'] = 'error'
            response['message'] = 'Invalid username or password'
            return response, 401, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error(f"An error occurred during login: {str(e)}")
        response['status'] = 'error'
        response['error_description'] = str(e)
        response['message'] = 'An error occurred during login'
        return response, 500, {'Content-Type': 'application/json'}



# Fonction pour obtenir la liste des administrateurs connectés.
def GetConnectedAdmins():
    response = {}
    try:
        connected_admins = kt_users.query.filter(kt_users.u_last_login != None).all()
        connected_admins_data = []  
        for admin in connected_admins:
            admin_data = {
                'u_matricule': admin.u_matricule,
                'u_uid': admin.u_uid,
                'u_firstname': admin.u_firstname,
                'u_lastname': admin.u_lastname,
                'u_username': admin.u_username,
                'u_mobile': admin.u_mobile,
                'u_address': admin.u_address,
                'u_email': admin.u_email,
                'u_role': admin.u_role,
                'u_last_login': admin.u_last_login.strftime("%Y-%m-%d %H:%M:%S"),
                'u_creation_date': admin.u_creation_date.strftime("%Y-%m-%d %H:%M:%S"),
                'u_updated_date': admin.u_updated_date.strftime("%Y-%m-%d %H:%M:%S")
            }
            connected_admins_data.append(admin_data)  
        
        rs = {}
        rs['status'] = 'success'
        rs['message'] = 'Connected admins retrieved successfully'
        rs['result'] = connected_admins_data
        return rs, 200
    except Exception as e:
        response = {}
        response['status'] = 'error'
        response['error_description'] = str(e)
        response['message'] = 'An error occurred while retrieving connected admins'
        return response, 500
