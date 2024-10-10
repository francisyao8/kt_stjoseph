import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import Swal from 'sweetalert2';

declare var $ : any
declare const flatpickr: any
declare var dropify: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit{
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;


  selectedImage: boolean = false;
  data: any;
  file: File | null = null;
  doc: File | null = null;
  isloading: boolean = false;
  previewImageSrc: string | ArrayBuffer | null = null;
  currentStep: number = 1;


  constructor(private catechumene: CatechumeneService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  register_form= new FormGroup({
    // kt_uid :  new FormControl(''),
    // kt_matricule :  new FormControl(''),
    kt_picture :  new FormControl(null, Validators.required),
    kt_firstname :  new FormControl(null, Validators.required),
    kt_lastname :  new FormControl(null, Validators.required),
    kt_birth_date :  new FormControl(null, Validators.required),
    kt_mobile :  new FormControl('+225', Validators.required),
    kt_address :  new FormControl(null, Validators.required),
    kt_email :  new FormControl(null, Validators.required),
    kt_gender :  new FormControl(null, Validators.required),
    kt_birth_certificate :  new FormControl(null, Validators.required),

    kt_section :  new FormControl(null, Validators.required),
    kt_level :  new FormControl(null, Validators.required),
    kt_baptized_baby :  new FormControl(null, Validators.required),

    kt_father_firstname :  new FormControl(null, Validators.required),
    kt_father_lastname :  new FormControl(null, Validators.required),
    kt_father_nationality :  new FormControl(''),
    kt_father_state :  new FormControl(''),
    kt_father_occupation :  new FormControl(''),
    kt_father_mobile :  new FormControl('+225', Validators.required),
    kt_father_civil_marriage :  new FormControl(''),
    kt_father_religious_marriage :  new FormControl(''),

    kt_mother_firstname :  new FormControl(null, Validators.required),
    kt_mother_lastname :  new FormControl(null, Validators.required),
    kt_mother_nationality :  new FormControl(''),
    kt_mother_state :  new FormControl(''),
    kt_mother_occupation :  new FormControl(''),
    kt_mother_mobile :  new FormControl('+225', Validators.required),
    kt_mother_civil_marriage :  new FormControl(''),
    kt_mother_religious_marriage :  new FormControl(''),

    kt_godfather_firstname :  new FormControl(''),
    kt_godfather_lastname :  new FormControl(''),
    kt_godfather_confirm_date :  new FormControl(''),
    kt_godfather_confirm_place :  new FormControl(''),
    kt_godfather_occupation :  new FormControl(''),
    kt_godfather_mobile :  new FormControl('+225'),
    kt_godfather_civil_marriage :  new FormControl(''),
    kt_godfather_religious_marriage :  new FormControl(''),

    kt_godmother_firstname :  new FormControl(''),
    kt_godmother_lastname :  new FormControl(''),
    kt_godmother_confirm_date :  new FormControl(''),
    kt_godmother_confirm_place :  new FormControl(''),
    kt_godmother_occupation :  new FormControl(''),
    kt_godmother_mobile :  new FormControl('+225'),
    kt_godmother_civil_marriage :  new FormControl(''),
    kt_godmother_religious_marriage :  new FormControl(''),
  })

  catechesis_section = [
    { catechesis_section: 'children' },
    { catechesis_section: 'young' },
    { catechesis_section: 'adult' }
  ];

  level_of_catechism = [
    { level_of_catechism: '1st year' },
    { level_of_catechism: '2nd years' },
    { level_of_catechism: '3rd years' },
    { level_of_catechism: '4th years' },
    { level_of_catechism: '5th years' }
  ];





  ngAfterViewInit() {
    flatpickr('#flatpickr-date', {
      dateFormat: 'Y-m-d',
      defaultDate: 'today'
    });
  
    $('.dropify').dropify();
  
    $('.dropify').on('change', (event: any) => {
      const inputId = event.target.id;
      if (inputId === 'kt_picture') {
        this.onFileChange(event);
      } else if (inputId === 'birthCertificate') {
        this.onDocChange(event);
      }
    });
  
    // Vous pouvez accéder à fileInput en toute sécurité ici
    console.log('File input initialized:', this.fileInput);
  }

  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click(); // Ouvre la boîte de dialogue de sélection de fichier
    } else {
      console.error('fileInput is not available yet');
    }
  }



  onFileChange(event: any) {
    console.log(event);
    let file = event.target.files[0];
    this.file = file;
    return file;
  }

  onDocChange(event: any) {
    console.log(event);
    let doc = event.target.files[0];
    this.doc = doc;
    return doc;
  }

 submitForm() {
    this.isloading= true;
    const formData: FormData = new FormData();
    //@ts-ignore
    formData.append('kt_uid', this.register_form.get('kt_uid')?.value);
    //@ts-ignore
    formData.append('kt_matricule', this.register_form.get('kt_matricule')?.value);
    formData.append('kt_picture', this.file as File);
    //@ts-ignore
    formData.append('kt_birth_certificate',this.doc as File);
    //@ts-ignore
    formData.append('kt_firstname', this.register_form.get('kt_firstname')?.value);
    //@ts-ignore
    formData.append('kt_lastname', this.register_form.get('kt_lastname')?.value);
    //@ts-ignore
    formData.append('kt_birth_date', this.register_form.get('kt_birth_date')?.value);
    //@ts-ignore
    formData.append('kt_mobile', this.register_form.get('kt_mobile')?.value);
    //@ts-ignore
    formData.append('kt_address', this.register_form.get('kt_address')?.value);
    //@ts-ignore
    formData.append('kt_email', this.register_form.get('kt_email')?.value);
    //@ts-ignore
    formData.append('kt_gender', this.register_form.get('kt_gender')?.value);
    //@ts-ignore
    formData.append('kt_level', this.register_form.get('kt_level')?.value);
    //@ts-ignore
    formData.append('kt_section', this.register_form.get('kt_section')?.value);
    //@ts-ignore
    formData.append('kt_baptized_baby', this.register_form.get('kt_baptized_baby')?.value);
    //@ts-ignore
    formData.append('kt_father_firstname', this.register_form.get('kt_father_firstname')?.value);
    //@ts-ignore
    formData.append('kt_father_lastname', this.register_form.get('kt_father_lastname')?.value);
    //@ts-ignore
    formData.append('kt_father_nationality', this.register_form.get('kt_father_nationality')?.value);
    //@ts-ignore
    formData.append('kt_father_state', this.register_form.get('kt_father_state')?.value);
    //@ts-ignore
    formData.append('kt_father_occupation', this.register_form.get('kt_father_occupation')?.value);
    //@ts-ignore
    formData.append('kt_father_mobile', this.register_form.get('kt_father_mobile')?.value);
    //@ts-ignore
    formData.append('kt_father_civil_marriage', this.register_form.get('kt_father_civil_marriage')?.value);
    //@ts-ignore
    formData.append('kt_father_religious_marriage', this.register_form.get('kt_father_religious_marriage')?.value);
    //@ts-ignore
    formData.append('kt_mother_firstname', this.register_form.get('kt_mother_firstname')?.value);
    //@ts-ignore
    formData.append('kt_mother_lastname', this.register_form.get('kt_mother_lastname')?.value);
    //@ts-ignore
    formData.append('kt_mother_nationality', this.register_form.get('kt_mother_nationality')?.value);
    //@ts-ignore
    formData.append('kt_mother_state', this.register_form.get('kt_mother_state')?.value);
    //@ts-ignore
    formData.append('kt_mother_occupation', this.register_form.get('kt_mother_occupation')?.value);
    //@ts-ignore
    formData.append('kt_mother_mobile', this.register_form.get('kt_mother_mobile')?.value);
    //@ts-ignore
    formData.append('kt_mother_civil_marriage', this.register_form.get('kt_mother_civil_marriage')?.value);
    //@ts-ignore
    formData.append('kt_mother_religious_marriage', this.register_form.get('kt_mother_religious_marriage')?.value);
    //@ts-ignore
    formData.append('kt_godfather_firstname', this.register_form.get('kt_godfather_firstname')?.value);
    //@ts-ignore
    formData.append('kt_godfather_lastname', this.register_form.get('kt_godfather_lastname')?.value);
    //@ts-ignore
    formData.append('kt_godfather_confirm_date', this.register_form.get('kt_godfather_confirm_date')?.value);
    //@ts-ignore
    formData.append('kt_godfather_confirm_place', this.register_form.get('kt_godfather_confirm_place')?.value);
    //@ts-ignore
    formData.append('kt_godfather_occupation', this.register_form.get('kt_godfather_occupation')?.value);
    //@ts-ignore
    formData.append('kt_godfather_mobile', this.register_form.get('kt_godfather_mobile')?.value);
    //@ts-ignore
    formData.append('kt_godfather_civil_marriage', this.register_form.get('kt_godfather_civil_marriage')?.value);
    //@ts-ignore
    formData.append('kt_godfather_religious_marriage', this.register_form.get('kt_godfather_religious_marriage')?.value);
    //@ts-ignore
    formData.append('kt_godmother_firstname', this.register_form.get('kt_godmother_firstname')?.value);
    //@ts-ignore
    formData.append('kt_godmother_lastname', this.register_form.get('kt_godmother_lastname')?.value);
    //@ts-ignore
    formData.append('kt_godmother_confirm_date', this.register_form.get('kt_godmother_confirm_date')?.value);
    //@ts-ignore
    formData.append('kt_godmother_confirm_place', this.register_form.get('kt_godmother_confirm_place')?.value);
    //@ts-ignore
    formData.append('kt_godmother_occupation', this.register_form.get('kt_godmother_occupation')?.value);
    //@ts-ignore
    formData.append('kt_godmother_mobile', this.register_form.get('kt_godmother_mobile')?.value);
    //@ts-ignore
    formData.append('kt_godmother_civil_marriage', this.register_form.get('kt_godmother_civil_marriage')?.value);
    //@ts-ignore
    formData.append('kt_godmother_religious_marriage', this.register_form.get('kt_godmother_religious_marriage')?.value);

    return this.catechumene.createCatechumene(formData).subscribe({
      next: (response: any) => {
        this.data = response;
        if (this.data && this.data?.kt_uid) {
          const uid = this.data.kt_uid;
        const matricule = this.data.kt_matricule;
          console.log(formData);
          this._router.navigate(['/kt-st-joseph', 'catechumene', 'received', this.data?.kt_uid]);
          // Swal.fire(
          //   'Success!',
          //   'Event created successfully.',
          //   'success'
          // );
        } else {
          console.error('Error: catechumene ID not found in response.');
        }
      },
      error: (err: any) => {
        console.log(err);

        let errorMessage = '';
        if (err.error && err.error.error_message) {
          errorMessage = err.error.error_message;
        } else {
          errorMessage = 'Something went wrong!';
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        });
        this.isloading= false;
      },
      complete:() =>{
        console.log('complete');
        this.isloading= false;
      }
    });
  }

  // Méthode pour passer à l'étape suivante
 NextStep() {
  if (this.currentStep < 3) {
    this.currentStep++;
  }
}

// Méthode pour revenir à l'étape précédente
PreviousStep() {
  if (this.currentStep > 1) {
    this.currentStep--;

    setTimeout(() => {
      const dropifyElements = document.querySelectorAll('.dropify');
      dropifyElements.forEach((element) => {
        const dropifyInstance = dropify(element);
        dropifyInstance.destroy(); // Détruire l'instance existante
        dropify(element); // Réinitialiser l'instance
      });
    }, 0);

    setTimeout(() => {
      const flatpickrElements = document.querySelectorAll('.flatpickr');
      flatpickrElements.forEach((element) => {
        flatpickr(element, { /* options de configuration */ });
      });
    }, 0);
  }
}
}
