from flask import Flask, request, current_app,jsonify
from model.kt_stjoseph import *
from config.db import *
import uuid
from datetime import datetime
import os   
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename





def create_log(created_by, admin_name, action, target_type, target_id, target_matricule, target_fullname, details):
    try:
        new_log = Log(
            created_by=created_by,
            admin_name=admin_name,
            action=action,
            target_type=target_type,
            target_id=target_id,
            target_matricule=target_matricule,
            target_fullname=target_fullname,
            details=details
        )

        db.session.add(new_log)
        db.session.commit()
        print("Log created successfully")  # Journal pour débogage

    except Exception as e:
        db.session.rollback()  # Annuler les changements en cas d'erreur
        print("Error creating log:", e)  # Journal pour débogage
        return jsonify({'error': str(e)}), 400


def get_logs():
    response = {}
    try:
        rs = []

        all_logs = Log.query.all()

        for log in all_logs:
            log_data = {
                'log_uid': log.log_uid,
                'created_by': log.created_by,
                'admin_name': log.admin_name,
                'action': log.action,
                'target_type': log.target_type,
                'target_id': log.target_id,
                'target_matricule': log.target_matricule,
                'target_fullname': log.target_fullname,
                'details': log.details,
                'timestamp': log.timestamp
            }
            rs.append(log_data)

        # Construire la réponse finale
        response['response'] = 'success'
        response['result'] = rs

    except Exception as e:
        response['response'] = 'error'
        response['error'] = 'Unavailable'
        response['error_code'] = 'LOGS01'
        response['error_description'] = str(e)
        c = BadRequest(str(e))
        c.data = response
        raise c

    return jsonify(response)
