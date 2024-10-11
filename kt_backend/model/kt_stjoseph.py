import datetime
from config.db import *
from sqlalchemy.sql import expression
import uuid
from datetime import datetime as dt
from sqlalchemy import Sequence
from sqlalchemy import func




class kt_users(db.Model):
 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    u_uid = db.Column(db.String(128), unique=True, default=lambda: str(uuid.uuid4()))
    u_matricule = db.Column(db.String(10), nullable=False, default= 'bad_number')
    u_firstname = db.Column(db.String(128), nullable=False, default= 'bad_user')
    u_lastname = db.Column(db.String(128), nullable=False, default= 'bad_user')
    u_username = db.Column(db.String(128), unique=True, nullable=False, default= 'bad_user')
    u_mobile = db.Column(db.String(15), nullable=False, default='+225') 
    u_address = db.Column(db.String(128), nullable=False, default= 'bad_user')
    u_email = db.Column(db.String(128), unique=True, nullable=False, default= 'bad_email')
    u_password = db.Column(db.String(128), nullable=False, default= 'bad_user')
    u_role = db.Column(db.String(128), nullable= False, default='bad_role')
    is_deleted = db.Column(db.Boolean, default=False)  # Champ pour la corbeille
    u_last_login = db.Column(db.DateTime, nullable=True, default= datetime.datetime.utcnow)
    u_creation_date = db.Column(db.DateTime, nullable=False, default= datetime.datetime.utcnow)
    u_updated_date= db.Column(db.DateTime, nullable=False, default= datetime.datetime.utcnow)
        
    def as_dict(self):
       return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class kt_catechiste(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    c_uid = db.Column(db.String(128), unique=True, default=lambda: str(uuid.uuid4()))
    c_matricule = db.Column(db.String(10), nullable=False, default='bad_number')
    c_picture = db.Column(db.String(255), nullable=True)  
    c_firstname = db.Column(db.String(50), nullable=False, default='bad_user')  
    c_lastname = db.Column(db.String(50), nullable=False, default='bad_user')  
    c_mobile = db.Column(db.String(15), nullable=False, default='+225')  
    c_email = db.Column(db.String(100), nullable=False, default='bad_email')  
    c_gender = db.Column(db.String(10), nullable=False, default='bad_gender')  
    c_seniority = db.Column(db.String(20), nullable=False, default='bad_number')  
    c_section = db.Column(db.String(50), nullable=False, default='bad_section')  
    c_birth_date = db.Column(db.Date, nullable=True)
    c_address = db.Column(db.String(255), nullable=False, default='bad_address')  
    c_creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    c_updated_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    c_ref_creation = db.Column(db.String(128), unique=True, default=lambda: f"C{str(uuid.uuid4())[:8]}")
    c_creation_number = db.Column(db.Integer,autoincrement=True , nullable=False, default=0)
    is_deleted = db.Column(db.Boolean, default=False)  # Champ pour la corbeille
    c_baptism_date = db.Column(db.Date, nullable=True)
    c_place_baptism = db.Column(db.String(100), nullable=False, default='bad_place')
    c_confirm_date = db.Column(db.Date, nullable=True)
    c_place_confirm = db.Column(db.String(100), nullable=False, default='bad_place')


    created_by = db.Column(db.String(128), db.ForeignKey('kt_users.u_uid'))
   
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.c_creation_number = self._next_creation_number()

    def _next_creation_number(self):
       
        total_inscriptions = kt_catechiste.query.count()
        return total_inscriptions + 1

   
        
    def as_dict(self):
       return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
    


class kt_catechumene(db.Model):
    __tablename__ = 'kt_catechumene'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kt_uid = db.Column(db.String(128), unique=True, default=lambda: str(uuid.uuid4()))
    kt_matricule = db.Column(db.String(10), nullable=False, default='bad_number')
    # Informations générales
    kt_picture = db.Column(db.String(255), nullable=True)
    kt_firstname = db.Column(db.String(50), nullable=False, default='bad_catechumene')
    kt_lastname = db.Column(db.String(50), nullable=False, default='bad_catechumene')
    kt_birth_date = db.Column(db.Date, nullable=True)
    kt_mobile = db.Column(db.String(15), nullable=False, default='+225')
    kt_address = db.Column(db.String(255), nullable=False, default='bad_address')
    kt_email = db.Column(db.String(100), nullable=False, default='bad_email')
    kt_gender = db.Column(db.String(10), nullable=False, default='bad_gender')
    
    # Informations sur la catéchèse
    kt_level = db.Column(db.String(15), nullable=False, default='bad_level')
    kt_section = db.Column(db.String(15), nullable=False, default='bad_section')
    kt_baptized_baby = db.Column(db.String(10), nullable=False, default='bad_choose')
    kt_baptism_date = db.Column(db.String(100), nullable=False, default='bad_date')
    kt_place_baptism = db.Column(db.String(100), nullable=False, default='bad_place')
    kt_confirm_date = db.Column(db.String(100), nullable=False, default='bad_date')
    kt_place_confirm = db.Column(db.String(100), nullable=False, default='bad_place')
    
    # Informations sur le père
    kt_father_firstname = db.Column(db.String(50), nullable=False, default='bad_father_info')
    kt_father_lastname = db.Column(db.String(50), nullable=False, default='bad_father_info')
    kt_father_nationality = db.Column(db.String(50), nullable=False, default='bad_father_info')
    kt_father_state = db.Column(db.String(50), nullable=False, default='bad_father_info')
    kt_father_occupation = db.Column(db.String(50), nullable=False, default='bad_father_info')
    kt_father_mobile = db.Column(db.String(15), nullable=False, default='+225')
    kt_father_civil_marriage = db.Column(db.String(10), nullable=True)
    kt_father_religious_marriage = db.Column(db.String(10), nullable=True)
    
    # Informations sur la mère
    kt_mother_firstname = db.Column(db.String(50), nullable=False, default='bad_mother_info' )
    kt_mother_lastname = db.Column(db.String(50), nullable=False, default='bad_mother_info' )
    kt_mother_nationality = db.Column(db.String(50), nullable=False, default='bad_mother_info' )
    kt_mother_state = db.Column(db.String(50), nullable=False, default='bad_mother_info' )
    kt_mother_occupation = db.Column(db.String(50), nullable=False, default='bad_mother_info' )
    kt_mother_mobile = db.Column(db.String(15), nullable=False, default='+225')
    kt_mother_civil_marriage = db.Column(db.String(10), nullable=True)
    kt_mother_religious_marriage = db.Column(db.String(10), nullable=True)
    
    # Informations sur le parrain
    kt_godfather_firstname = db.Column(db.String(50), nullable=False, default='bad_godfather_info')
    kt_godfather_lastname = db.Column(db.String(50), nullable=False, default='bad_godfather_info')
    kt_godfather_confirm_date = db.Column(db.Date, nullable=False, default=datetime.datetime.utcnow)
    kt_godfather_confirm_place = db.Column(db.String(50), nullable=False, default='bad_godfather_info')
    kt_godfather_occupation = db.Column(db.String(50), nullable=False, default='bad_godfather_info')
    kt_godfather_mobile = db.Column(db.String(15), nullable=False, default='+225')
    kt_godfather_civil_marriage = db.Column(db.String(10), nullable=True)
    kt_godfather_religious_marriage = db.Column(db.String(10), nullable=True)
    
    # Informations sur la marraine
    kt_godmother_firstname = db.Column(db.String(50), nullable=False, default='bad_godmother_info')
    kt_godmother_lastname = db.Column(db.String(50), nullable=False, default='bad_godmother_info')
    kt_godmother_confirm_date = db.Column(db.Date, nullable=False, default=datetime.datetime.utcnow)
    kt_godmother_confirm_place = db.Column(db.String(50), nullable=False, default='bad_godmother_info')
    kt_godmother_occupation = db.Column(db.String(50), nullable=False, default='bad_godmother_info')
    kt_godmother_mobile = db.Column(db.String(15), nullable=False, default='+225')
    kt_godmother_civil_marriage = db.Column(db.String(10), nullable=True)
    kt_godmother_religious_marriage = db.Column(db.String(10), nullable=True)
    kt_birth_certificate = db.Column(db.String(255), nullable=True)

    kt_payment_methode = db.Column(db.String(255), nullable=True)
    kt_amount = db.Column(db.Integer, nullable=True, default= 00000)
 
    kt_creation_number = db.Column(db.Integer, autoincrement=True, nullable=False, default=0)
    kt_creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    kt_updated_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    kt_ref_creation = db.Column(db.String(128), unique=True, default=lambda: f"KT{str(uuid.uuid4())[:8]}")
    
    created_by = db.Column(db.String(128), db.ForeignKey('kt_users.u_uid'))
    is_deleted = db.Column(db.Boolean, default=False)  # Champ pour la corbeille

    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.kt_creation_number = self._next_creation_number()

    def _next_creation_number(self):
       
        total_inscriptions = kt_catechumene.query.count()
        return total_inscriptions + 1

    def as_dict(self):
        # Utiliser la fonction coalesce pour remplacer les valeurs NULL par des chaînes vides
        return {c.name: str(func.coalesce(getattr(self, c.name), '')) for c in self.__table__.columns}
    


class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    log_uid = db.Column(db.String(128), unique=True, default=lambda: str(uuid.uuid4()))
    created_by = db.Column(db.String(128), db.ForeignKey('kt_users.u_uid'))
    admin_name = db.Column(db.String(128), nullable=False)
    action = db.Column(db.String(50), nullable=False)
    target_type = db.Column(db.String(50), nullable=False)
    target_id = db.Column(db.String(128), nullable=False)  
    target_matricule = db.Column(db.String(20), nullable=False)
    target_fullname = db.Column(db.String(128), nullable=False)
    details = db.Column(db.String(128), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
