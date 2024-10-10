from flask import Flask, request, current_app
from model.kt_stjoseph import *
from config.db import *
import uuid
from datetime import datetime
import os   
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename





def create_log():
    try:
        data = request.get_json()
        
        # Extraire les données du corps de la requête
        user_id = data.get('user_id')
        user_name = data.get('user_name')
        action = data.get('action')
        target_type = data.get('target_type')
        target_id = data.get('target_id')
        target_matricule = data.get('target_matricule')
        target_fullname = data.get('target_fullname')
        details = data.get('details')


        new_log = Log(
            user_id=user_id,
            user_name=user_name,
            action=action,
            target_type=target_type,
            target_id=target_id,
            target_matricule=target_matricule,
            target_fullname=target_fullname,
            details=details
        )

        db.session.add(new_log)
        db.session.commit()

        return jsonify({'message': 'Log created successfully'}), 201
    
    except Exception as e:
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