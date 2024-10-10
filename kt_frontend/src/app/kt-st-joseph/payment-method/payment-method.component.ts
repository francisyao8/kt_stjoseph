import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit{

  isloading: boolean = false;

  uid: any
  matricule: any
  picture : any
  firstname : any
  lastname : any
  birth_date : any
  mobile : any
  address : any
  email : any
  gender : any
  birth_certificate : any
  section : any
  level : any
  baptized_baby : any
  father_firstname : any
  father_lastname : any
  father_nationality : any
  father_state : any
  father_occupation : any
  father_mobile : any
  father_civil_marriage : any
  father_religious_marriage : any
  mother_firstname : any
  mother_lastname : any
  mother_nationality : any
  mother_state : any
  mother_occupation : any
  mother_mobile : any
  mother_civil_marriage : any
  mother_religious_marriage : any
  godfather_firstname : any
  godfather_lastname : any
  godfather_confirm_date : any
  godfather_confirm_place : any
  godfather_occupation : any
  godfather_mobile : any
  godfather_civil_marriage : any
  godfather_religious_marriage : any
  godmother_firstname : any
  godmother_lastname : any
  godmother_confirm_date : any
  godmother_confirm_place : any
  godmother_occupation : any
  godmother_mobile : any
  godmother_civil_marriage : any
  godmother_religious_marriage : any

  catechumene_info: any;
  data: any;

  constructor(private catechumene: CatechumeneService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  
paymentForm = new FormGroup({
  kt_payment_methode : new FormControl('wave', Validators.required),
  kt_amount : new FormControl(null, Validators.required),
  // attribue supplementaire
  kt_uid : new FormControl(null), 
  kt_matricule : new FormControl(null), 
  kt_picture : new FormControl(null), 
  kt_firstname : new FormControl(null), 
  kt_lastname : new FormControl(null), 
  kt_birth_date : new FormControl(null), 
  kt_mobile : new FormControl(null), 
  kt_address : new FormControl(null), 
  kt_email : new FormControl(null), 
  kt_gender : new FormControl(null), 
  kt_birth_certificate : new FormControl(null), 
  kt_section : new FormControl(null), 
  kt_level : new FormControl(null), 
  kt_baptized_baby : new FormControl(null), 
  kt_father_firstname : new FormControl(null), 
  kt_father_lastname : new FormControl(null), 
  kt_father_nationality : new FormControl(null), 
  kt_father_state : new FormControl(null), 
  kt_father_occupation : new FormControl(null), 
  kt_father_mobile : new FormControl(null), 
  kt_father_civil_marriage : new FormControl(null), 
  kt_father_religious_marriage : new FormControl(null), 
  kt_mother_firstname : new FormControl(null), 
  kt_mother_lastname : new FormControl(null), 
  kt_mother_nationality : new FormControl(null), 
  kt_mother_state : new FormControl(null), 
  kt_mother_occupation : new FormControl(null), 
  kt_mother_mobile : new FormControl(null), 
  kt_mother_civil_marriage : new FormControl(null), 
  kt_mother_religious_marriage : new FormControl(null), 
  kt_godfather_firstname : new FormControl(null), 
  kt_godfather_lastname : new FormControl(null), 
  kt_godfather_confirm_date : new FormControl(null), 
  kt_godfather_confirm_place : new FormControl(null), 
  kt_godfather_occupation : new FormControl(null), 
  kt_godfather_mobile : new FormControl(null), 
  kt_godfather_civil_marriage : new FormControl(null), 
  kt_godfather_religious_marriage : new FormControl(null), 
  kt_godmother_firstname : new FormControl(null), 
  kt_godmother_lastname : new FormControl(null), 
  kt_godmother_confirm_date : new FormControl(null), 
  kt_godmother_confirm_place : new FormControl(null), 
  kt_godmother_occupation : new FormControl(null), 
  kt_godmother_mobile : new FormControl(null), 
  kt_godmother_civil_marriage : new FormControl(null), 
  kt_godmother_religious_marriage : new FormControl(null), 
})

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => { 
  
      this.uid = params['kt_uid'];
      this.matricule = params['kt_matricule'];
      this.picture = params['kt_picture'];
      this.firstname = params['kt_firstname'];
      this.lastname = params['kt_lastname'];
      this.birth_date = params['kt_birth_date'];
      this.mobile = params['kt_mobile'];
      this.address = params['kt_address'];
      this.email = params['kt_email'];
      this.gender = params['kt_gender'];
      this.birth_certificate = params['kt_birth_certificate'];
      this.section = params['kt_section'];
      this.level = params['kt_level'];
      this.baptized_baby = params['kt_baptized_baby'];
      this.father_firstname = params['kt_father_firstname'];
      this.father_lastname = params['kt_father_lastname'];
      this.father_nationality = params['kt_father_nationality'];
      this.father_state = params['kt_father_state'];
      this.father_occupation = params['kt_father_occupation'];
      this.father_mobile = params['kt_father_mobile'];
      this.father_civil_marriage = params['kt_father_civil_marriage'];
      this.father_religious_marriage = params['kt_father_religious_marriage'];
      this.mother_firstname = params['kt_mother_firstname'];
      this.mother_lastname = params['kt_mother_lastname'];
      this.mother_nationality = params['kt_mother_nationality'];
      this.mother_state = params['kt_mother_state'];
      this.mother_occupation = params['kt_mother_occupation'];
      this.mother_mobile = params['kt_mother_mobile'];
      this.mother_civil_marriage = params['kt_mother_civil_marriage'];
      this.mother_religious_marriage = params['kt_mother_religious_marriage'];
      this.godfather_firstname = params['kt_godfather_firstname'];
      this.godfather_lastname = params['kt_godfather_lastname'];
      this.godfather_confirm_date = params['kt_godfather_confirm_date'];
      this.godfather_confirm_place = params['kt_godfather_confirm_place'];
      this.godfather_occupation = params['kt_godfather_occupation'];
      this.godfather_mobile = params['kt_godfather_mobile'];
      this.godfather_civil_marriage = params['kt_godfather_civil_marriage'];
      this.godfather_religious_marriage = params['kt_godfather_religious_marriage'];
      this.godmother_firstname = params['kt_godmother_firstname'];
      this.godmother_lastname = params['kt_godmother_lastname'];
      this.godmother_confirm_date = params['kt_godmother_confirm_date'];
      this.godmother_confirm_place = params['kt_godmother_confirm_place'];
      this.godmother_occupation = params['kt_godmother_occupation'];
      this.godmother_mobile = params['kt_godmother_mobile'];
      this.godmother_civil_marriage = params['kt_godmother_civil_marriage'];
      this.godmother_religious_marriage = params['kt_godmother_religious_marriage'];
    });
      this.paymentForm.get('kt_uid')?.setValue(this.uid);
      this.paymentForm.get('kt_matricule')?.setValue(this.matricule);
      this.paymentForm.get('kt_picture')?.setValue(this.picture);
      this.paymentForm.get('kt_firstname')?.setValue(this.firstname);
      this.paymentForm.get('kt_lastname')?.setValue(this.lastname);
      this.paymentForm.get('kt_birth_date')?.setValue(this.birth_date);
      this.paymentForm.get('kt_mobile')?.setValue(this.mobile);
      this.paymentForm.get('kt_address')?.setValue(this.address);
      this.paymentForm.get('kt_email')?.setValue(this.email);
      this.paymentForm.get('kt_gender')?.setValue(this.gender);
      this.paymentForm.get('kt_birth_certificate')?.setValue(this.birth_certificate);
      this.paymentForm.get('kt_section')?.setValue(this.section);
      this.paymentForm.get('kt_level')?.setValue(this.level);
      this.paymentForm.get('kt_baptized_baby')?.setValue(this.baptized_baby);
      this.paymentForm.get('kt_father_firstname')?.setValue(this.father_firstname);
      this.paymentForm.get('kt_father_lastname')?.setValue(this.father_lastname);
      this.paymentForm.get('kt_father_nationality')?.setValue(this.father_nationality);
      this.paymentForm.get('kt_father_state')?.setValue(this.father_state);
      this.paymentForm.get('kt_father_occupation')?.setValue(this.father_occupation);
      this.paymentForm.get('kt_father_mobile')?.setValue(this.father_mobile);
      this.paymentForm.get('kt_father_civil_marriage')?.setValue(this.father_civil_marriage);
      this.paymentForm.get('kt_father_religious_marriage')?.setValue(this.father_religious_marriage);
      this.paymentForm.get('kt_mother_firstname')?.setValue(this.mother_firstname);
      this.paymentForm.get('kt_mother_lastname')?.setValue(this.mother_lastname);
      this.paymentForm.get('kt_mother_nationality')?.setValue(this.mother_nationality);
      this.paymentForm.get('kt_mother_state')?.setValue(this.mother_state);
      this.paymentForm.get('kt_mother_occupation')?.setValue(this.mother_occupation);
      this.paymentForm.get('kt_mother_mobile')?.setValue(this.mother_mobile);
      this.paymentForm.get('kt_mother_civil_marriage')?.setValue(this.mother_civil_marriage);
      this.paymentForm.get('kt_mother_religious_marriage')?.setValue(this.mother_religious_marriage);
      this.paymentForm.get('kt_godfather_firstname')?.setValue(this.godfather_firstname);
      this.paymentForm.get('kt_godfather_lastname')?.setValue(this.godfather_lastname);
      this.paymentForm.get('kt_godfather_confirm_date')?.setValue(this.godfather_confirm_date);
      this.paymentForm.get('kt_godfather_confirm_place')?.setValue(this.godfather_confirm_place);
      this.paymentForm.get('kt_godfather_occupation')?.setValue(this.godfather_occupation);
      this.paymentForm.get('kt_godfather_mobile')?.setValue(this.godfather_mobile);
      this.paymentForm.get('kt_godfather_civil_marriage')?.setValue(this.godfather_civil_marriage);
      this.paymentForm.get('kt_godfather_religious_marriage')?.setValue(this.godfather_religious_marriage);
      this.paymentForm.get('kt_godmother_firstname')?.setValue(this.godmother_firstname);
      this.paymentForm.get('kt_godmother_lastname')?.setValue(this.godmother_lastname);
      this.paymentForm.get('kt_godmother_confirm_date')?.setValue(this.godmother_confirm_date);
      this.paymentForm.get('kt_godmother_confirm_place')?.setValue(this.godmother_confirm_place);
      this.paymentForm.get('kt_godmother_occupation')?.setValue(this.godmother_occupation);
      this.paymentForm.get('kt_godmother_mobile')?.setValue(this.godmother_mobile);
      this.paymentForm.get('kt_godmother_civil_marriage')?.setValue(this.godmother_civil_marriage);
      this.paymentForm.get('kt_godmother_religious_marriage')?.setValue(this.godmother_religious_marriage);
    

      if (this.uid) {
        this.viewCatechumene();  
      } else {
        console.error('Error: No catechumene ID found.');
      }
       
  }

  viewCatechumene(){
    let body = {
      kt_uid : this.uid
    }
    return this.catechumene.readSingleCatechumene(body).subscribe({
      next: (response: any) => {
        this.catechumene_info = response.user
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete');
        
      },
    })
  }


  comfirm(){
    this.isloading= true;

    let body = this.paymentForm.value
    
    return this.catechumene.validateRegistration(body).subscribe({
      next: (response: any) => {
        this.data = response
        if (this.data && this.data?.kt_uid) {
         
          this._router.navigate(['/kt-st-joseph', 'catechumene-received', this.data?.kt_uid]);
          Swal.fire(
            'Success!',
            'Event created successfully.',
            'success'
          );
        } else {
          console.error('Error: catechumene ID not found in response.');
        }
      },
      error(err) {
        console.log(err);
      },
      complete:() =>{
        console.log('complete');
        this.isloading= false;
      }
    })
  }

 
}
