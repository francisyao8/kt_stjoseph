   # helpers/catechumene.py
from flask import Flask, request, current_app
from model.kt_stjoseph import kt_catechumene, Log, kt_users
from config.db import db
from helpers.admin_log import *
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
import os






UPLOAD_FOLDER = 'static/assets/uploads'
IMGHOSTNAME = 'http://127.0.0.1:5000/static/assets/uploads/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'svg','xlsx'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_picture(event_name: any):
    if request.method == 'PATCH' or request.method == 'POST':
        print('is post')
        # Vérifier si la partie de la requête contient le fichier
        if 'kt_picture' not in request.files:
            return None  # Champ de fichier manquant
        file = request.files['kt_picture']
        # Si l'utilisateur ne sélectionne pas de fichier, le navigateur envoie un fichier vide sans nom de fichier.
        print(file.filename)
        if file.filename == '':
            return None  # Nom de fichier vide
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)  # Nettoyer le nom de fichier
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return filename
    return None

def upload_file(event_name: any):
    if request.method == 'PATCH' or request.method == 'POST':
        print('is post')
        # Vérifier si la partie de la requête contient le fichier
        if 'kt_birth_certificate' not in request.files:
            return None  # Champ de fichier manquant
        file = request.files['kt_birth_certificate']
        # Si l'utilisateur ne sélectionne pas de fichier, le navigateur envoie un fichier vide sans nom de fichier.
        print(file.filename)
        if file.filename == '':
            return None  # Nom de fichier vide
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)  # Nettoyer le nom de fichier
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return filename
    return None


def createCatechumene():
    response = {}

    # Générer un matricule unique pour le catéchiste
    kt_matricule = "KT" + str(uuid.uuid4()).upper().replace('-', '')[:5]
    
    # Récupérer l'image
    image = upload_file_picture(request.form.get('kt_picture'))
    kt_picture = image if image is not None else None
    
    # Récupérer le certificat de naissance
    birth_certificate = upload_file(request.form.get('kt_birth_certificate'))
    kt_birth_certificate = birth_certificate if birth_certificate is not None else None
    
    kt_firstname = request.form.get('kt_firstname')
    kt_lastname = request.form.get('kt_lastname')
    
    # Conversion de la date de naissance
    kt_birth_date_str = request.form.get('kt_birth_date')
    kt_birth_date = datetime.strptime(kt_birth_date_str, '%Y-%m-%d') if kt_birth_date_str else None
    
    kt_mobile = request.form.get('kt_mobile')
    kt_address = request.form.get('kt_address')
    kt_email = request.form.get('kt_email')
    kt_gender = request.form.get('kt_gender')
    kt_section = request.form.get('kt_section')
    kt_level = request.form.get('kt_level')
    kt_baptized_baby = request.form.get('kt_baptized_baby')
    kt_father_firstname = request.form.get('kt_father_firstname')
    kt_father_lastname = request.form.get('kt_father_lastname')
    kt_father_nationality = request.form.get('kt_father_nationality')
    kt_father_state = request.form.get('kt_father_state')
    kt_father_occupation = request.form.get('kt_father_occupation')
    kt_father_mobile = request.form.get('kt_father_mobile')
    kt_father_civil_marriage = request.form.get('kt_father_civil_marriage')
    kt_father_religious_marriage = request.form.get('kt_father_religious_marriage')
    kt_mother_firstname = request.form.get('kt_mother_firstname')
    kt_mother_lastname = request.form.get('kt_mother_lastname')
    kt_mother_nationality = request.form.get('kt_mother_nationality')
    kt_mother_state = request.form.get('kt_mother_state')
    kt_mother_occupation = request.form.get('kt_mother_occupation')
    kt_mother_mobile = request.form.get('kt_mother_mobile')
    kt_mother_civil_marriage = request.form.get('kt_mother_civil_marriage')
    kt_mother_religious_marriage = request.form.get('kt_mother_religious_marriage')
    kt_godfather_firstname = request.form.get('kt_godfather_firstname')
    kt_godfather_lastname = request.form.get('kt_godfather_lastname')
    
    # Conversion de la date de confirmation du parrain
    kt_godfather_confirm_date_str = request.form.get('kt_godfather_confirm_date')
    kt_godfather_confirm_date = datetime.strptime(kt_godfather_confirm_date_str, '%Y-%m-%d') if kt_godfather_confirm_date_str and kt_godfather_confirm_date_str != 'null' else None
    
    kt_godfather_confirm_place = request.form.get('kt_godfather_confirm_place')
    kt_godfather_occupation = request.form.get('kt_godfather_occupation')
    kt_godfather_mobile = request.form.get('kt_godfather_mobile')
    kt_godfather_civil_marriage = request.form.get('kt_godfather_civil_marriage')
    kt_godfather_religious_marriage = request.form.get('kt_godfather_religious_marriage')
    kt_godmother_firstname = request.form.get('kt_godmother_firstname')
    kt_godmother_lastname = request.form.get('kt_godmother_lastname')
    
    # Conversion de la date de confirmation de la marraine
    kt_godmother_confirm_date_str = request.form.get('kt_godmother_confirm_date')
    kt_godmother_confirm_date = datetime.strptime(kt_godmother_confirm_date_str, '%Y-%m-%d') if kt_godmother_confirm_date_str and kt_godmother_confirm_date_str != 'null' else None
    
    kt_godmother_confirm_place = request.form.get('kt_godmother_confirm_place')
    kt_godmother_occupation = request.form.get('kt_godmother_occupation')
    kt_godmother_mobile = request.form.get('kt_godmother_mobile')
    kt_godmother_civil_marriage = request.form.get('kt_godmother_civil_marriage')
    kt_godmother_religious_marriage = request.form.get('kt_godmother_religious_marriage')
    
    created_by = request.form.get('created_by')
    print("Created By:", created_by)
    admin_name = request.form.get('admin_name')
    print("Created By:", admin_name)

    new_catechumene = kt_catechumene()

    new_catechumene.kt_matricule = kt_matricule
    new_catechumene.kt_picture = kt_picture
    new_catechumene.kt_firstname = kt_firstname
    new_catechumene.kt_lastname = kt_lastname
    new_catechumene.kt_birth_date = kt_birth_date
    new_catechumene.kt_mobile = kt_mobile
    new_catechumene.kt_address = kt_address
    new_catechumene.kt_email = kt_email
    new_catechumene.kt_gender = kt_gender
    new_catechumene.kt_section = kt_section
    new_catechumene.kt_level = kt_level
    new_catechumene.kt_baptized_baby = kt_baptized_baby
    new_catechumene.kt_father_firstname = kt_father_firstname
    new_catechumene.kt_father_lastname = kt_father_lastname
    new_catechumene.kt_father_nationality = kt_father_nationality
    new_catechumene.kt_father_state = kt_father_state
    new_catechumene.kt_father_occupation = kt_father_occupation
    new_catechumene.kt_father_mobile = kt_father_mobile
    new_catechumene.kt_father_civil_marriage = kt_father_civil_marriage
    new_catechumene.kt_father_religious_marriage = kt_father_religious_marriage
    new_catechumene.kt_mother_firstname = kt_mother_firstname
    new_catechumene.kt_mother_lastname = kt_mother_lastname
    new_catechumene.kt_mother_nationality = kt_mother_nationality
    new_catechumene.kt_mother_state = kt_mother_state
    new_catechumene.kt_mother_occupation = kt_mother_occupation
    new_catechumene.kt_mother_mobile = kt_mother_mobile
    new_catechumene.kt_mother_civil_marriage = kt_mother_civil_marriage
    new_catechumene.kt_mother_religious_marriage = kt_mother_religious_marriage
    new_catechumene.kt_godfather_firstname = kt_godfather_firstname
    new_catechumene.kt_godfather_lastname = kt_godfather_lastname
    new_catechumene.kt_godfather_confirm_date = kt_godfather_confirm_date
    new_catechumene.kt_godfather_confirm_place = kt_godfather_confirm_place
    new_catechumene.kt_godfather_occupation = kt_godfather_occupation
    new_catechumene.kt_godfather_mobile = kt_godfather_mobile
    new_catechumene.kt_godfather_civil_marriage = kt_godfather_civil_marriage
    new_catechumene.kt_godfather_religious_marriage = kt_godfather_religious_marriage
    new_catechumene.kt_godmother_firstname = kt_godmother_firstname
    new_catechumene.kt_godmother_lastname = kt_godmother_lastname
    new_catechumene.kt_godmother_confirm_date = kt_godmother_confirm_date
    new_catechumene.kt_godmother_confirm_place = kt_godmother_confirm_place
    new_catechumene.kt_godmother_occupation = kt_godmother_occupation
    new_catechumene.kt_godmother_mobile = kt_godmother_mobile
    new_catechumene.kt_godmother_civil_marriage = kt_godmother_civil_marriage
    new_catechumene.kt_godmother_religious_marriage = kt_godmother_religious_marriage
    new_catechumene.kt_birth_certificate = kt_birth_certificate
    new_catechumene.created_by = created_by
    new_catechumene.admin_name = admin_name

    try:
        db.session.add(new_catechumene)
        db.session.commit()

        create_log(created_by,admin_name,"creation","Catechumene",new_catechumene.kt_uid,new_catechumene.kt_matricule,f'{new_catechumene.kt_firstname} {new_catechumene.kt_lastname}')
        print("Log added successfully") 

        response['status'] = 'success'
        response['message'] = 'catechumene created successfully'
        response['kt_matricule'] = new_catechumene.kt_matricule
        response['kt_uid'] = new_catechumene.kt_uid

    except Exception as e:
        # Format the error message for the user
        error_msg = "Failed to create catechumene. "
        response['status'] = 'error'
        response['error_message'] = error_msg
        response['error_description'] = str(e)

    return response



def readAllCatechumene():
    response = {}
    try:
        all_catechumene = kt_catechumene.query.all()
        catechumene_list = []

        for catechumene in all_catechumene:
            catechumene_data = {
                'kt_uid': catechumene.kt_uid,   
                'kt_matricule': catechumene.kt_matricule,
                'kt_picture': str(IMGHOSTNAME)+str(catechumene.kt_picture),
                'kt_firstname': catechumene.kt_firstname,
                'kt_lastname': catechumene.kt_lastname,
                'kt_mobile': catechumene.kt_mobile,
                'kt_email': catechumene.kt_email,
                'kt_gender': catechumene.kt_gender,
                'kt_birth_certificate':str(IMGHOSTNAME)+str(catechumene.kt_birth_certificate),
                'kt_level': catechumene.kt_level,
                'kt_birth_date': str(catechumene.kt_birth_date),
                'kt_address': catechumene.kt_address,
                'kt_section': catechumene.kt_section,
                'kt_baptized_baby': catechumene.kt_baptized_baby,
                'kt_baptism_date': catechumene.kt_baptism_date,
                'kt_place_baptism': catechumene.kt_place_baptism,
                'kt_confirm_date': catechumene.kt_confirm_date,
                'kt_place_confirm': catechumene.kt_place_confirm,
                'kt_father_firstname': catechumene.kt_father_firstname,
                'kt_father_lastname': catechumene.kt_father_lastname,
                'kt_father_nationality': catechumene.kt_father_nationality,
                'kt_father_state': catechumene.kt_father_state,
                'kt_father_occupation': catechumene.kt_father_occupation,
                'kt_father_mobile': catechumene.kt_father_mobile,
                'kt_father_civil_marriage': catechumene.kt_father_civil_marriage,
                'kt_father_religious_marriage': catechumene.kt_father_religious_marriage,
                'kt_mother_firstname': catechumene.kt_mother_firstname,
                'kt_mother_lastname': catechumene.kt_mother_lastname,
                'kt_mother_nationality': catechumene.kt_mother_nationality,
                'kt_mother_state': catechumene.kt_mother_state,
                'kt_mother_occupation': catechumene.kt_mother_occupation,
                'kt_mother_mobile': catechumene.kt_mother_mobile,
                'kt_mother_civil_marriage': catechumene.kt_mother_civil_marriage,
                'kt_mother_religious_marriage': catechumene.kt_mother_religious_marriage,
                'kt_godfather_firstname': catechumene.kt_godfather_firstname,
                'kt_godfather_lastname': catechumene.kt_godfather_lastname,
                'kt_godfather_confirm_date': str(catechumene.kt_godfather_confirm_date),
                'kt_godfather_confirm_place': catechumene.kt_godfather_confirm_place,
                'kt_godfather_occupation': catechumene.kt_godfather_occupation,
                'kt_godfather_mobile': catechumene.kt_godfather_mobile,
                'kt_godfather_civil_marriage': catechumene.kt_godfather_civil_marriage,
                'kt_godfather_religious_marriage': catechumene.kt_godfather_religious_marriage,
                'kt_godmother_firstname': catechumene.kt_godmother_firstname,
                'kt_godmother_lastname': catechumene.kt_godmother_lastname,
                'kt_godmother_confirm_date': str(catechumene.kt_godmother_confirm_date),
                'kt_godmother_confirm_place': catechumene.kt_godmother_confirm_place,
                'kt_godmother_occupation': catechumene.kt_godmother_occupation,
                'kt_godmother_mobile': catechumene.kt_godmother_mobile,
                'kt_godmother_civil_marriage': catechumene.kt_godmother_civil_marriage,
                'kt_godmother_religious_marriage': catechumene.kt_godmother_religious_marriage,
                'kt_payment_methode': catechumene.kt_payment_methode,
                'kt_amount': catechumene.kt_amount,
                'kt_creation_date': str(catechumene.kt_creation_date),
                'kt_ref_creation': catechumene.kt_ref_creation,
                'kt_creation_number': catechumene.kt_creation_number,
            }
            catechumene_list.append(catechumene_data)

            # Tri par date de création (du plus récent au plus ancien)
        catechumene_list = sorted(catechumene_list, key=lambda x: x['kt_creation_date'], reverse=True)

        total_catechumene = len(catechumene_list)
        response['status'] = 'success'
        response['total_catechumene'] = f"{total_catechumene} catechumene{'s' if total_catechumene != 1 else ''}"
        response['catechumene'] = catechumene_list

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response



def readSingleCatechumene():
    response = {}
    try:
        kt_uid = request.json.get('kt_uid')
        kt_matricule = request.json.get('kt_matricule')  # Ajout de la récupération du matricule

        if kt_uid:
            catechumene = kt_catechumene.query.filter_by(kt_uid=kt_uid).first()
        elif kt_matricule:
            catechumene = kt_catechumene.query.filter_by(kt_matricule=kt_matricule).first()
        else:
            raise ValueError("Neither kt_uid nor kt_matricule provided")

        if catechumene:
            catechumene_data = {
                'kt_uid': catechumene.kt_uid,   
                'kt_matricule': catechumene.kt_matricule,
                'kt_picture': str(IMGHOSTNAME)+str(catechumene.kt_picture),
                'kt_firstname': catechumene.kt_firstname,
                'kt_lastname': catechumene.kt_lastname,
                'kt_mobile': catechumene.kt_mobile,
                'kt_email': catechumene.kt_email,
                'kt_gender': catechumene.kt_gender,
                'kt_birth_certificate':str(IMGHOSTNAME)+str(catechumene.kt_birth_certificate),
                'kt_level': catechumene.kt_level,
                'kt_birth_date': str(catechumene.kt_birth_date),
                'kt_address': catechumene.kt_address,
                'kt_section': catechumene.kt_section,
                'kt_baptized_baby': catechumene.kt_baptized_baby,
                'kt_baptism_date': catechumene.kt_baptism_date,
                'kt_place_baptism': catechumene.kt_place_baptism,
                'kt_confirm_date': catechumene.kt_confirm_date,
                'kt_place_confirm': catechumene.kt_place_confirm,
                'kt_father_firstname': catechumene.kt_father_firstname,
                'kt_father_lastname': catechumene.kt_father_lastname,
                'kt_father_nationality': catechumene.kt_father_nationality,
                'kt_father_state': catechumene.kt_father_state,
                'kt_father_occupation': catechumene.kt_father_occupation,
                'kt_father_mobile': catechumene.kt_father_mobile,
                'kt_father_civil_marriage': catechumene.kt_father_civil_marriage,
                'kt_father_religious_marriage': catechumene.kt_father_religious_marriage,
                'kt_mother_firstname': catechumene.kt_mother_firstname,
                'kt_mother_lastname': catechumene.kt_mother_lastname,
                'kt_mother_nationality': catechumene.kt_mother_nationality,
                'kt_mother_state': catechumene.kt_mother_state,
                'kt_mother_occupation': catechumene.kt_mother_occupation,
                'kt_mother_mobile': catechumene.kt_mother_mobile,
                'kt_mother_civil_marriage': catechumene.kt_mother_civil_marriage,
                'kt_mother_religious_marriage': catechumene.kt_mother_religious_marriage,
                'kt_godfather_firstname': catechumene.kt_godfather_firstname,
                'kt_godfather_lastname': catechumene.kt_godfather_lastname,
                'kt_godfather_confirm_date': str(catechumene.kt_godfather_confirm_date),
                'kt_godfather_confirm_place': catechumene.kt_godfather_confirm_place,
                'kt_godfather_occupation': catechumene.kt_godfather_occupation,
                'kt_godfather_mobile': catechumene.kt_godfather_mobile,
                'kt_godfather_civil_marriage': catechumene.kt_godfather_civil_marriage,
                'kt_godfather_religious_marriage': catechumene.kt_godfather_religious_marriage,
                'kt_godmother_firstname': catechumene.kt_godmother_firstname,
                'kt_godmother_lastname': catechumene.kt_godmother_lastname,
                'kt_godmother_confirm_date': str(catechumene.kt_godmother_confirm_date),
                'kt_godmother_confirm_place': catechumene.kt_godmother_confirm_place,
                'kt_godmother_occupation': catechumene.kt_godmother_occupation,
                'kt_godmother_mobile': catechumene.kt_godmother_mobile,
                'kt_godmother_civil_marriage': catechumene.kt_godmother_civil_marriage,
                'kt_godmother_religious_marriage': catechumene.kt_godmother_religious_marriage,
                'kt_payment_methode': catechumene.kt_payment_methode,
                'kt_amount': catechumene.kt_amount,
                'kt_creation_date': str(catechumene.kt_creation_date),
                'kt_ref_creation': catechumene.kt_ref_creation,
                'kt_creation_number': catechumene.kt_creation_number,
            }

            response['status'] = 'success'
            response['message'] = 'Catechumene info'
            response['user'] = catechumene_data
        else:
            response['status'] = 'error'
            response['message'] = 'Catechumene not found'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'
        response['error_message'] = 'Catechumene not found'

    return response

  
        
        
# Fonction pour mettre à jour un catéchumène.
def updateCatechumene():
    response = {}

    kt_uid = request.form.get('kt_uid')
    kt_matricule = request.form.get('kt_matricule')
    image = upload_file_picture(request.form.get('kt_picture'))
    print('here', image)
    kt_picture = image if image is not None else None
    
    kt_firstname = request.form.get('kt_firstname')
    kt_lastname = request.form.get('kt_lastname')
    
    # Conversion de la date de naissance
    kt_birth_date_str = request.form.get('kt_birth_date')
    kt_birth_date = datetime.strptime(kt_birth_date_str, '%Y-%m-%d') if kt_birth_date_str else None
    
    kt_mobile = request.form.get('kt_mobile')
    kt_address = request.form.get('kt_address')
    kt_email = request.form.get('kt_email')
    kt_gender = request.form.get('kt_gender')
    kt_section = request.form.get('kt_section')
    kt_level = request.form.get('kt_level')
    kt_baptized_baby = request.form.get('kt_baptized_baby')
    kt_baptism_date = request.form.get('kt_baptism_date')
    kt_place_baptism = request.form.get('kt_place_baptism')
    kt_confirm_date = request.form.get('kt_confirm_date')
    kt_place_confirm = request.form.get('kt_place_confirm')
    kt_father_firstname = request.form.get('kt_father_firstname')
    kt_father_lastname = request.form.get('kt_father_lastname')
    kt_father_nationality = request.form.get('kt_father_nationality')
    kt_father_state = request.form.get('kt_father_state')
    kt_father_occupation = request.form.get('kt_father_occupation')
    kt_father_mobile = request.form.get('kt_father_mobile')
    kt_father_civil_marriage = request.form.get('kt_father_civil_marriage')
    kt_father_religious_marriage = request.form.get('kt_father_religious_marriage')
    kt_mother_firstname = request.form.get('kt_mother_firstname')
    kt_mother_lastname = request.form.get('kt_mother_lastname')
    kt_mother_nationality = request.form.get('kt_mother_nationality')
    kt_mother_state = request.form.get('kt_mother_state')
    kt_mother_occupation = request.form.get('kt_mother_occupation')
    kt_mother_mobile = request.form.get('kt_mother_mobile')
    kt_mother_civil_marriage = request.form.get('kt_mother_civil_marriage')
    kt_mother_religious_marriage = request.form.get('kt_mother_religious_marriage')
    kt_godfather_firstname= request.form.get('kt_godfather_firstname')
    kt_godfather_lastname= request.form.get('kt_godfather_lastname')
    # Conversion de la date de confirmation du parrain
    kt_godfather_confirm_date_str = request.form.get('kt_godfather_confirm_date')
    kt_godfather_confirm_date = datetime.strptime(kt_godfather_confirm_date_str, '%Y-%m-%d') if kt_godfather_confirm_date_str and kt_godfather_confirm_date_str != 'null' else None
    
    kt_godfather_confirm_place = request.form.get('kt_godfather_confirm_place')
    kt_godfather_occupation = request.form.get('kt_godfather_occupation')
    kt_godfather_mobile = request.form.get('kt_godfather_mobile')
    kt_godfather_civil_marriage = request.form.get('kt_godfather_civil_marriage')
    kt_godfather_religious_marriage = request.form.get('kt_godfather_religious_marriage')
    kt_godmother_firstname = request.form.get('kt_godmother_firstname')
    kt_godmother_lastname = request.form.get('kt_godmother_lastname')
    
    # Conversion de la date de confirmation de la marraine
    kt_godmother_confirm_date_str = request.form.get('kt_godmother_confirm_date')
    kt_godmother_confirm_date = datetime.strptime(kt_godmother_confirm_date_str, '%Y-%m-%d') if kt_godmother_confirm_date_str and kt_godmother_confirm_date_str != 'null' else None
    
    kt_godmother_confirm_place = request.form.get('kt_godmother_confirm_place')
    kt_godmother_occupation = request.form.get('kt_godmother_occupation')
    kt_godmother_mobile = request.form.get('kt_godmother_mobile')
    kt_godmother_civil_marriage = request.form.get('kt_godmother_civil_marriage')
    kt_godmother_religious_marriage = request.form.get('kt_godmother_religious_marriage')

    birth_certificate = upload_file(request.form.get('kt_birth_certificate'))
    print('here', birth_certificate)
    kt_birth_certificate = birth_certificate if birth_certificate is not None else None

    # Récupérer le catéchumène à mettre à jour
    up_catechumene = kt_catechumene.query.filter_by(kt_uid=kt_uid, kt_matricule=kt_matricule).first()

    if up_catechumene:
        # Mettre à jour les propriétés du catéchumène
        up_catechumene.kt_uid = kt_uid
        up_catechumene.kt_matricule = kt_matricule
        up_catechumene.kt_picture = kt_picture
        up_catechumene.kt_firstname = kt_firstname
        up_catechumene.kt_lastname = kt_lastname
        up_catechumene.kt_birth_date = kt_birth_date
        up_catechumene.kt_mobile = kt_mobile
        up_catechumene.kt_address = kt_address
        up_catechumene.kt_email = kt_email
        up_catechumene.kt_gender = kt_gender
        up_catechumene.kt_section = kt_section
        up_catechumene.kt_level = kt_level
        up_catechumene.kt_baptized_baby = kt_baptized_baby
        up_catechumene.kt_baptism_date = kt_baptism_date,
        up_catechumene.kt_place_baptism = kt_place_baptism,
        up_catechumene.kt_confirm_date = kt_confirm_date,
        up_catechumene.kt_place_confirm = kt_place_confirm
        up_catechumene.kt_father_firstname = kt_father_firstname
        up_catechumene.kt_father_lastname = kt_father_lastname
        up_catechumene.kt_father_nationality = kt_father_nationality
        up_catechumene.kt_father_state = kt_father_state
        up_catechumene.kt_father_occupation = kt_father_occupation
        up_catechumene.kt_father_mobile = kt_father_mobile
        up_catechumene.kt_father_civil_marriage = kt_father_civil_marriage
        up_catechumene.kt_father_religious_marriage = kt_father_religious_marriage
        up_catechumene.kt_mother_firstname = kt_mother_firstname
        up_catechumene.kt_mother_lastname = kt_mother_lastname
        up_catechumene.kt_mother_nationality = kt_mother_nationality
        up_catechumene.kt_mother_state = kt_mother_state
        up_catechumene.kt_mother_occupation = kt_mother_occupation
        up_catechumene.kt_mother_mobile = kt_mother_mobile
        up_catechumene.kt_mother_civil_marriage = kt_mother_civil_marriage
        up_catechumene.kt_mother_religious_marriage = kt_mother_religious_marriage
        up_catechumene.kt_godfather_firstname = kt_godfather_firstname
        up_catechumene.kt_godfather_lastname = kt_godfather_lastname
        up_catechumene.kt_godfather_confirm_date = kt_godfather_confirm_date
        up_catechumene.kt_godfather_confirm_place = kt_godfather_confirm_place
        up_catechumene.kt_godfather_occupation = kt_godfather_occupation
        up_catechumene.kt_godfather_mobile = kt_godfather_mobile
        up_catechumene.kt_godfather_civil_marriage = kt_godfather_civil_marriage
        up_catechumene.kt_godfather_religious_marriage = kt_godfather_religious_marriage
        up_catechumene.kt_godmother_firstname = kt_godmother_firstname
        up_catechumene.kt_godmother_lastname = kt_godmother_lastname
        up_catechumene.kt_godmother_confirm_date = kt_godmother_confirm_date
        up_catechumene.kt_godmother_confirm_place = kt_godmother_confirm_place
        up_catechumene.kt_godmother_occupation = kt_godmother_occupation
        up_catechumene.kt_godmother_mobile = kt_godmother_mobile
        up_catechumene.kt_godmother_civil_marriage = kt_godmother_civil_marriage
        up_catechumene.kt_godmother_religious_marriage = kt_godmother_religious_marriage
        up_catechumene.kt_birth_certificate = kt_birth_certificate,
        

        try:
            # Committer les changements dans la base de données
            db.session.commit()

            response['status'] = 'success'
            response['message'] = 'Catechumene updated successfully'
            response['kt_matricule'] = up_catechumene.kt_matricule
            response['kt_uid'] = up_catechumene.kt_uid

        except Exception as e:
            response['error_description'] = str(e)
            response['status'] = 'error'
            response['error_message'] = 'Failed to update Catechumene'

    else:
        response['status'] = 'error'
        response['error_message'] = 'Catechumene not found'

    return response



def deleteCatechumene():
    response = {}
    data = request.json
    print("Request Payload:", data)  # Vérifiez ici si `created_by` est bien présent dans la requête

    kt_uid = request.json.get('kt_uid')
    kt_matricule = request.json.get('kt_matricule')
    created_by = data.get('created_by') 
    admin_name = data.get('admin_name') 
    
    print("Created By:", created_by)
    print("Admin Name:", admin_name)

    # Vérification des champs obligatoires
    if kt_uid and kt_matricule:
        # Rechercher le catéchiste à supprimer
        del_catechumene = kt_catechumene.query.filter_by(kt_uid=kt_uid, kt_matricule=kt_matricule).first()

        if del_catechumene:
            try:
                # Supprimer le catéchiste
                del_catechumene.is_deleted = True
                db.session.delete(del_catechumene)
                db.session.commit()

                # Créer le log de suppression
                if created_by and admin_name:
                    create_log(
                        created_by, 
                        admin_name,  
                        "delete", 
                        "catechumene", 
                        del_catechumene.c_uid, 
                        del_catechumene.c_matricule, 
                        f'{del_catechumene.c_firstname} {del_catechumene.c_lastname}',
                        "deletion of the catechist "
                    )
                    print("Log added successfully")
                else:
                    print("Admin user or created_by not found for logging")

                # Réponse de succès
                response['status'] = 'success'
                response['message'] = 'catechumene deleted successfully'

            except Exception as e:
                db.session.rollback()  # Annuler en cas d'erreur
                print("Error deleting catechumene:", e)
                response['status'] = 'error'
                response['message'] = 'Failed to delete catechumene'
                response['error_description'] = str(e)
        else:
            # Catéchiste introuvable
            response['status'] = 'error'
            response['message'] = 'catechumene not found'
    else:
        # Données manquantes
        response['status'] = 'error'
        response['message'] = 'c_uid and c_matricule are required'

    # Retourner la réponse JSON
    return jsonify(response)


def readCatechumeneBySectionAndLevel():
    try:
        kt_section = request.json.get('kt_section')
        kt_level = request.json.get('kt_level')

        # Récupérer les informations de base sur les catéchumènes dans la section et le niveau spécifiés
        catechumene_info = db.session.query(kt_catechumene).filter_by(kt_section=kt_section, kt_level=kt_level).all()

        # Formatter les informations pour la réponse
        catechumene_list = []
        for catechumene in catechumene_info:
            catechumene_data = {
                'kt_uid': catechumene.kt_uid,
                'kt_matricule': catechumene.kt_matricule,
                'kt_firstname': catechumene.kt_firstname,
                'kt_lastname': catechumene.kt_lastname,
                'kt_mobile': catechumene.kt_mobile,
                'kt_gender': catechumene.kt_gender,
                'kt_baptized_baby': catechumene.kt_baptized_baby,
                'kt_level': catechumene.kt_level,
                'kt_section': catechumene.kt_section,
                'kt_creation_date': str(catechumene.kt_creation_date),
                'kt_ref_creation': catechumene.kt_ref_creation,
                'kt_creation_number': catechumene.kt_creation_number,
            }
            catechumene_list.append(catechumene_data)

        total_catechumene = len(catechumene_list)
        response = {
            'status': 'success',
            'catechumenes': catechumene_list
        }
        response['total_catechumene'] = f"{total_catechumene} catechumene{'s' if total_catechumene != 1 else ''}"


    except Exception as e:
        # Gérer les erreurs éventuelles lors de l'accès à la base de données
        response = {
            'status': 'error',
            'error_message': 'Erreur lors de la récupération des informations sur les catéchumènes',
            'error_description': str(e)
        }

    return response



def confirmation():
    response = {}

    kt_uid = request.json.get('kt_uid')
    kt_matricule = request.json.get('kt_matricule')

    existing_user = kt_catechumene.query.filter_by(kt_uid=kt_uid, kt_matricule=kt_matricule).first()

    if existing_user:
        try:
            existing_user.kt_payment_methode = request.json.get('kt_payment_methode')
            existing_user.kt_amount = request.json.get('kt_amount')

            db.session.commit()

            response['status'] = 'success'
            response['message'] = 'registration validated'
            response['kt_matricule'] = existing_user.kt_matricule
            response['kt_uid'] = existing_user.kt_uid
        except Exception as e:
            error_msg = "Failed to update user information."
            response['status'] = 'error'
            response['error_message'] = error_msg
            response['error_description'] = str(e)
    else:
        error_msg = "User not found with the provided kt_uid: {}".format(kt_uid)
        response['status'] = 'error'
        response['error_message'] = error_msg

    return response
