from flask import Flask, request, current_app,jsonify
from model.kt_stjoseph import *
from config.db import *
import uuid
from datetime import datetime
import os   
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename





def create_log(created_by, admin_name, action, target_type, target_id, target_matricule, target_fullname):
    try:
        new_log = Log(
            created_by=created_by,
            admin_name=admin_name,
            action=action,
            target_type=target_type,
            target_id=target_id,
            target_matricule=target_matricule,
            target_fullname=target_fullname,
        )

        db.session.add(new_log)
        db.session.commit()
        print("Log created successfully")  # Journal pour débogage

    except Exception as e:
        db.session.rollback()  # Annuler les changements en cas d'erreur
        print("Error creating log:", e)  # Journal pour débogage
        return jsonify({'error': str(e)}), 400


def get_logs():
    try:
        # Optionnel : Filtrer par user_id ou action
        user_id = request.args.get('user_id')
        action = request.args.get('action')

        # Récupérer les logs
        query = Log.query
        
        if user_id:
            query = query.filter_by(user_id=user_id)
        if action:
            query = query.filter_by(action=action)
        
        logs = query.all()
        return jsonify([log.as_dict() for log in logs]), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400