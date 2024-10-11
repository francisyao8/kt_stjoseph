   # helpers/catechiste.py
from flask import Flask, request, current_app
from model.kt_stjoseph import kt_catechiste, Log, kt_users
from helpers.admin_log import *
from config.db import db
import uuid
from datetime import datetime
import os   
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = 'static/assets/uploads/'
IMGHOSTNAME = 'http://127.0.0.1:5000/static/assets/uploads/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif, svg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(event_name: any):
    if request.method == 'PATCH' or request.method == 'POST':
        print('is post')
        # Vérifier si la partie de la requête contient le fichier
        if 'c_picture' not in request.files:
            return None  # Champ de fichier manquant
        file = request.files['c_picture']
        # Si l'utilisateur ne sélectionne pas de fichier, le navigateur envoie un fichier vide sans nom de fichier.
        print(file.filename)
        if file.filename == '':
            return None  # Nom de fichier vide
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)  # Nettoyer le nom de fichier
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return filename
    return None



def createCatechiste():
    response = {}

    with current_app.app_context():
        # Générer un matricule unique pour le catéchiste
        c_matricule = "KT" + str(uuid.uuid4()).upper().replace('-', '')[:5]
        image = upload_file(request.form.get('c_picture'))
        print('here',image)
        if image is not None:
            c_picture = image
        
        c_firstname = request.form.get('c_firstname')
        c_lastname = request.form.get('c_lastname')
        c_mobile = request.form.get('c_mobile')
        c_email = request.form.get('c_email')
        c_gender = request.form.get('c_gender')
        c_seniority = request.form.get('c_seniority')
        c_section = request.form.get('c_section')
        c_birth_date_str = request.form.get('c_birth_date')
        c_birth_date = datetime.strptime(c_birth_date_str, '%Y-%m-%d') if c_birth_date_str else None
        c_address = request.form.get('c_address')
        c_baptism_date = request.form.get('c_baptism_date')
        c_place_baptism = request.form.get('c_place_baptism')
        c_confirm_date = request.form.get('c_confirm_date')
        c_place_confirm = request.form.get('c_place_confirm')

        created_by = request.form.get('created_by')
        print("Created By:", created_by)
        admin_name = request.form.get('admin_name')
        print("Created By:", admin_name)
        

        new_catechiste = kt_catechiste()

        new_catechiste.c_matricule = c_matricule
        new_catechiste.c_picture = c_picture
        new_catechiste.c_firstname = c_firstname
        new_catechiste.c_lastname = c_lastname
        new_catechiste.c_mobile = c_mobile
        new_catechiste.c_email = c_email
        new_catechiste.c_gender = c_gender
        new_catechiste.c_seniority = c_seniority
        new_catechiste.c_section = c_section
        new_catechiste.c_birth_date = c_birth_date
        new_catechiste.c_address = c_address
        new_catechiste.c_baptism_date = c_baptism_date
        new_catechiste.c_place_baptism = c_place_baptism
        new_catechiste.c_confirm_date = c_confirm_date
        new_catechiste.c_place_confirm = c_place_confirm
        new_catechiste.created_by = created_by
        new_catechiste.admin_name = admin_name

        try:
            db.session.add(new_catechiste)
            db.session.commit()

            create_log(created_by,admin_name,"create","Catechiste",new_catechiste.c_uid,new_catechiste.c_matricule,f'{new_catechiste.c_firstname} {new_catechiste.c_lastname}', "creating the catechist")
            print("Log added successfully") 

            response['status'] = 'success'
            response['message'] = 'Catechiste created successfully'
            response['c_matricule'] = new_catechiste.c_matricule
            response['c_uid'] = new_catechiste.c_uid

        except Exception as e:
            db.session.rollback()  # Rollback on error
            print("Error creating catechiste:", e)  
            error_msg = "Failed to create catechiste. "
            response['status'] = 'error'
            response['error'] = 'Unavailable'
            response['error_message'] = error_msg
            response['error_description'] = str(e)

    return response




# Fonction pour lire tous les utilisateurs.
def readAllCatechiste():
    response = {}

    try:
        all_catechiste = kt_catechiste.query.all()
        catechiste_list = []
        
        for catechiste in all_catechiste:
            catechiste_data = {

                'c_uid' : catechiste.c_uid,
                'c_matricule' : catechiste.c_matricule,
                'c_picture': str(IMGHOSTNAME)+str(catechiste.c_picture),
                'c_firstname' : catechiste.c_firstname,
                'c_lastname' : catechiste.c_lastname,
                'c_mobile' : catechiste.c_mobile,
                'c_email' : catechiste.c_email,
                'c_gender' : catechiste.c_gender,
                'c_seniority' : catechiste.c_seniority,
                'c_section' : catechiste.c_section,
                'c_baptism_date': catechiste.c_baptism_date,
                'c_place_baptism': catechiste.c_place_baptism,
                'c_confirm_date': catechiste.c_confirm_date,
                'c_place_confirm': catechiste.c_place_confirm,
                'c_birth_date': str(catechiste.c_birth_date),
                'c_address' : catechiste.c_address,
                'c_creation_date': str(catechiste.c_creation_date),
                'c_ref_creation': catechiste.c_ref_creation,
                'c_creation_number': catechiste.c_creation_number,
                'created_by': catechiste.created_by,

            }
            catechiste_list.append(catechiste_data)

            # Tri par date de création (du plus récent au plus ancien)
        catechiste_list = sorted(catechiste_list, key=lambda x: x['c_creation_date'], reverse=True)

        
        response['status'] = 'success'
        response['catechiste'] = catechiste_list
        
    except Exception as e:
        response['response'] = 'error'
        response['status'] = 'error'
        response['error'] = 'Unavailable'
        response['error_description'] = str(e)


    return response


# Fonction pour lire un utilisateur spécifique.
def readSingleCatechiste():
    response = {}
    try:
        c_uid = request.json.get('c_uid')
        c_matricule = request.json.get('c_matricule')  # Ajout de la récupération du matricule

        if c_uid:
            catechiste = kt_catechiste.query.filter_by(c_uid=c_uid).first()
        elif c_matricule:
            catechiste = kt_catechiste.query.filter_by(c_matricule=c_matricule).first()
        else:
            raise ValueError("Neither c_uid nor c_matricule provided")

        if catechiste:
            catechiste_data = {
                'c_uid': catechiste.c_uid,
                'c_matricule': catechiste.c_matricule,
                'c_picture': str(IMGHOSTNAME)+str(catechiste.c_picture),
                'c_firstname': catechiste.c_firstname,
                'c_lastname': catechiste.c_lastname,
                'c_mobile': catechiste.c_mobile,
                'c_email': catechiste.c_email,
                'c_gender': catechiste.c_gender,
                'c_seniority': catechiste.c_seniority,
                'c_section': catechiste.c_section,
                'c_baptism_date': catechiste.c_baptism_date,
                'c_place_baptism': catechiste.c_place_baptism,
                'c_confirm_date': catechiste.c_confirm_date,
                'c_place_confirm': catechiste.c_place_confirm,
                'c_birth_date': str(catechiste.c_birth_date),
                'c_address': catechiste.c_address,
                'c_creation_date': str(catechiste.c_creation_date),
                'c_ref_creation': catechiste.c_ref_creation,
                'c_creation_number': catechiste.c_creation_number,
                'created_by': catechiste.created_by,
                
            }
             
            response['status'] = 'success'
            response['message'] = 'Catechiste info'
            response['user'] = catechiste_data
        else:
            response['status'] = 'error'
            response['message'] = 'User not found'
        
    except Exception as e:
            response['status'] = 'error'
            response['error'] = 'Unavailable'
            response['error_description'] = str(e)

    return response

        
        
def updateCatechiste():
    response = {}

    c_uid = request.form.get('c_uid')
    c_matricule = request.form.get('c_matricule')
    
    # Initialiser c_picture avec None
    c_picture = None
    image = upload_file(request.form.get('c_picture'))
    if image is not None:
        c_picture = image
    
    c_firstname = request.form.get('c_firstname')
    c_lastname = request.form.get('c_lastname')
    c_mobile = request.form.get('c_mobile')
    c_email = request.form.get('c_email')
    c_gender = request.form.get('c_gender')
    c_seniority = request.form.get('c_seniority')
    c_section = request.form.get('c_section')
    c_birth_date_str = request.form.get('c_birth_date')
    c_birth_date = datetime.strptime(c_birth_date_str, '%Y-%m-%d') if c_birth_date_str else None
    c_address = request.form.get('c_address')
    c_baptism_date = request.form.get('c_baptism_date')
    c_place_baptism = request.form.get('c_place_baptism')
    c_confirm_date = request.form.get('c_confirm_date')
    c_place_confirm = request.form.get('c_place_confirm')
    created_by = request.form.get('created_by')
    print("Created By:", created_by)
    admin_name = request.form.get('admin_name')
    print("Created By:", admin_name)

    # Assurez-vous de rechercher le catéchiste par son c_uid uniquement, car c_matricule peut être modifié
    up_catechiste = kt_catechiste.query.filter_by(c_uid=c_uid).first()

    if up_catechiste:
        up_catechiste.c_matricule = c_matricule
        
        # Mettre à jour c_picture seulement si une nouvelle image est fournie
        if c_picture:
            up_catechiste.c_picture = c_picture
        
        up_catechiste.c_firstname = c_firstname
        up_catechiste.c_lastname = c_lastname
        up_catechiste.c_mobile = c_mobile
        up_catechiste.c_email = c_email
        up_catechiste.c_gender = c_gender
        up_catechiste.c_seniority = c_seniority
        up_catechiste.c_section = c_section
        up_catechiste.c_birth_date = c_birth_date
        up_catechiste.c_address = c_address
        up_catechiste.c_baptism_date = c_baptism_date
        up_catechiste.c_place_baptism = c_place_baptism
        up_catechiste.c_confirm_date = c_confirm_date
        up_catechiste.c_place_confirm = c_place_confirm
        up_catechiste.created_by = created_by
        up_catechiste.admin_name = admin_name

        try:
            db.session.commit()

            create_log(created_by,admin_name,"update","Catechiste",up_catechiste.c_uid,up_catechiste.c_matricule,f'{up_catechiste.c_firstname} {up_catechiste.c_lastname}', "catechist update ")
            print("Log added successfully") 

            response['status'] = 'success'
            response['message'] = 'Catechiste updated successfully'
            response['c_matricule'] = up_catechiste.c_matricule
            response['c_uid'] = up_catechiste.c_uid

        except Exception as e:
            db.session.rollback()  # Rollback on error
            response['error_description'] = str(e)
            response['status'] = 'error'
            response['error_message'] = 'Failed to update'

    else:
        response['status'] = 'error'
        response['error_message'] = 'Catechiste not found'

    return response



def deleteCatechiste():
    response = {}
    data = request.json
    print("Request Payload:", data)  # Vérifiez ici si `created_by` est bien présent dans la requête

    c_uid = data.get('c_uid')
    c_matricule = data.get('c_matricule')
    created_by = data.get('created_by') 
    admin_name = data.get('admin_name')  
    
    print("Created By:", created_by)
    print("Admin Name:", admin_name)

    # Vérification des champs obligatoires
    if c_uid and c_matricule:
        # Rechercher le catéchiste à supprimer
        del_catechiste = kt_catechiste.query.filter_by(c_uid=c_uid, c_matricule=c_matricule).first()

        if del_catechiste:
            try:
                # Supprimer le catéchiste
                del_catechiste.is_deleted = True
                db.session.delete(del_catechiste)
                db.session.commit()

                # Créer le log de suppression
                if created_by and admin_name:
                    create_log(
                        created_by, 
                        admin_name,  
                        "delete", 
                        "Catechiste", 
                        del_catechiste.c_uid, 
                        del_catechiste.c_matricule, 
                        f'{del_catechiste.c_firstname} {del_catechiste.c_lastname}',
                        "deletion of the catechist "
                    )
                    print("Log added successfully")
                else:
                    print("Admin user or created_by not found for logging")

                # Réponse de succès
                response['status'] = 'success'
                response['message'] = 'Catechiste deleted successfully'

            except Exception as e:
                db.session.rollback()  # Annuler en cas d'erreur
                print("Error deleting catechiste:", e)
                response['status'] = 'error'
                response['message'] = 'Failed to delete catechiste'
                response['error_description'] = str(e)
        else:
            # Catéchiste introuvable
            response['status'] = 'error'
            response['message'] = 'Catechiste not found'
    else:
        # Données manquantes
        response['status'] = 'error'
        response['message'] = 'c_uid and c_matricule are required'

    # Retourner la réponse JSON
    return jsonify(response)





def readCatechisteBysection():
    try:
        c_section = request.json.get('c_section')

        # Récupérer les informations de base sur les catéchumènes dans la section et le niveau spécifiés
        catchiste_info = db.session.query(kt_catechiste).filter_by(c_section=c_section).all()

        # Formatter les informations pour la réponse
        catchiste_list = []
        for catechiste in catchiste_info:
            catchiste_data = {
                
                'c_uid' : catechiste.c_uid,
                'c_matricule' : catechiste.c_matricule,
                'c_picture': str(IMGHOSTNAME)+str(catechiste.c_picture),
                'c_firstname' : catechiste.c_firstname,
                'c_lastname' : catechiste.c_lastname,
                'c_mobile' : catechiste.c_mobile,
                'c_email' : catechiste.c_email,
                'c_gender' : catechiste.c_gender,
                'c_seniority' : catechiste.c_seniority,
                'c_section' : catechiste.c_section,
                'c_birth_date': str(catechiste.c_birth_date),
                'c_address' : catechiste.c_address,
                'c_creation_date': str(catechiste.c_creation_date),
                'c_ref_creation': catechiste.c_ref_creation,
                'c_creation_number': catechiste.c_creation_number,
                'created_by': catechiste.created_by,
            }
            catchiste_list.append(catchiste_data)

        total_catchiste = len(catchiste_list)
        response = {
            'status': 'success',
            'message': 'Informations sur les catéchumènes récupérées avec succès',
            'catechiste': catchiste_list
        }
        response['total_catchiste'] = f"{total_catchiste} catchiste{'s' if total_catchiste != 1 else ''}"


    except Exception as e:
        # Gérer les erreurs éventuelles lors de l'accès à la base de données
        response = {
            'status': 'error',
            'error_message': 'Erreur lors de la récupération des informations sur les catéchumènes',
            'error_description': str(e)
        }

    return response

def readTrashedCatechiste():
    response = {}
    try:
        trashed_catechise = kt_catechiste.query.filter_by(is_deleted=True).all()
        catechiste_list = []

        for catechiste in trashed_catechise:
            catchiste_data = {
                'c_uid': catechiste.c_uid,
                'c_matricule': catechiste.c_matricule,
                'c_picture': str(IMGHOSTNAME)+str(catechiste.c_picture),
                'c_firstname': catechiste.c_firstname,
                'c_lastname': catechiste.c_lastname,
                'c_mobile': catechiste.c_mobile,
                'c_email': catechiste.c_email,
                'c_gender': catechiste.c_gender,
                'c_seniority': catechiste.c_seniority,
                'c_section': catechiste.c_section,
                'c_birth_date': str(catechiste.c_birth_date),
                'c_address': catechiste.c_address,
                'c_creation_date': str(catechiste.c_creation_date),
                'c_ref_creation': catechiste.c_ref_creation,
                'c_creation_number': catechiste.c_creation_number,
                'created_by': catechiste.created_by,
            }
            catechiste_list.append(catchiste_data)

        response['status'] = 'success'
        response['message'] = 'Trashed catechiste retrieved successfully'
        response['users'] = catechiste_list

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response
