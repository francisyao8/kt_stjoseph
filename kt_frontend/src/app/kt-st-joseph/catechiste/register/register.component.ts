import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import Swal from 'sweetalert2';

declare const flatpickr: any;
declare var $ : any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;


  data: any;
  selectedImage: boolean = false;
  catechiste_id: any;
  file: File | null = null;
  isloading: boolean = false;
  previewImageSrc: string | ArrayBuffer | null = null;

  constructor(
    private catechiste: CatechisteService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }



  register_form = new FormGroup({
    c_uid: new FormControl(null),
    c_matricule: new FormControl(null),
    c_picture: new FormControl(null, Validators.required),
    c_firstname: new FormControl(null, Validators.required),
    c_lastname: new FormControl(null, Validators.required),
    c_mobile: new FormControl('+225', Validators.required),
    c_email: new FormControl(null, Validators.required),
    c_birth_date: new FormControl(null, Validators.required),
    c_address: new FormControl(null, Validators.required),
    c_gender: new FormControl(null, Validators.required),
    c_seniority: new FormControl(null, Validators.required),
    c_section: new FormControl(null, Validators.required)
  });

  cat_section = [
    { cat_section: 'Enfant' },
    { cat_section: 'Jeune' },
    { cat_section: 'Adulte' }
  ];

  cat_seniority = [
    { cat_seniority: 'Nouveau' },
    { cat_seniority: '1 an' },
    { cat_seniority: '2 ans' },
    { cat_seniority: '3 ans' },
    { cat_seniority: '4 ans' },
    { cat_seniority: '5 ans' },
    { cat_seniority: '6 ans' },
    { cat_seniority: '7 ans' },
    { cat_seniority: '8 ans' },
    { cat_seniority: '9 ans' },
    { cat_seniority: '10 ans+' }
  ];

  ngAfterViewInit() {
    flatpickr('#flatpickr-date', {
      dateFormat: 'Y-m-d',
      defaultDate: 'today'
    });
    $('.dropify').dropify();
  
    $('.dropify').on('change', (event: any) => {
      this.onFileChange(event);
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
  
  submitForm() {
    this.isloading= true;
    const formData: FormData = new FormData();
    //@ts-ignore
    formData.append('c_uid', this.register_form.get('c_uid')?.value)
    //@ts-ignore
    formData.append('c_matricule', this.register_form.get('c_matricule')?.value)
    formData.append('c_picture', this.file as File)
    //@ts-ignore
    formData.append('c_firstname', this.register_form.get('c_firstname')?.value)
    //@ts-ignore
    formData.append('c_lastname', this.register_form.get('c_lastname')?.value)
    //@ts-ignore
    formData.append('c_mobile', this.register_form.get('c_mobile')?.value)
    //@ts-ignore
    formData.append('c_email', this.register_form.get('c_email')?.value)
    //@ts-ignore
    formData.append('c_birth_date', this.register_form.get('c_birth_date')?.value)
    //@ts-ignore
    formData.append('c_address', this.register_form.get('c_address')?.value)
    //@ts-ignore
    formData.append('c_gender', this.register_form.get('c_gender')?.value)
    //@ts-ignore
    formData.append('c_seniority', this.register_form.get('c_seniority')?.value)
    //@ts-ignore
    formData.append('c_section', this.register_form.get('c_section')?.value)
    
    this.catechiste.createCatechiste(formData).subscribe({
      next: (response: any) => {
        this.data = response;
        if (this.data && this.data.c_uid) {
          this._router.navigate(['/kt-st-joseph','catechiste', 'received', this.data.c_uid]);
          Swal.fire(
            'Success!',
            'Event created successfully.',
            'success'
          );
        } else {
          console.error('Error: Catechiste ID not found in response.');
        }
      },
      error: (err: any) => {
        console.log(err.error_message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error_message
        });
        this.isloading= false;
      },
      complete:() =>{
        console.log('complete');
        this.isloading=false;
      }
    });
  }

  ngOnInit() {

  }

}
