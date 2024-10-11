import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import Swal from 'sweetalert2';

declare var $: any;
declare const flatpickr: any;

@Component({
  selector: 'app-create-catechiste',
  templateUrl: './create-catechiste.component.html',
  styleUrls: ['./create-catechiste.component.scss']
})
export class CreateCatechisteComponent implements OnInit, AfterViewInit {
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  // Récupérer les informations de session
  // @ts-ignore
  userInfo: any = JSON.parse(sessionStorage.getItem('infoLogin'));
  is_user_logged_in = !!$.cookie('isLoggedIn');

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
  ) {}

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
    c_section: new FormControl(null, Validators.required),
    created_by: new FormControl(this.userInfo?.u_uid, Validators.required),
    admin_name: new FormControl(this.userInfo?.u_firstname + ' ' + this.userInfo?.u_lastname, Validators.required),
    c_baptism_date : new FormControl(null, Validators.required),
    c_place_baptism : new FormControl(null, Validators.required),
    c_confirm_date : new FormControl(null, Validators.required),
    c_place_confirm : new FormControl(null, Validators.required),
  });

  cat_section = [
    { cat_section: 'children' },
    { cat_section: 'young' },
    { cat_section: 'adult' }
  ];

  cat_seniority = [
    { cat_seniority: 'New' },
    { cat_seniority: '1 year' },
    { cat_seniority: '2 years' },
    { cat_seniority: '3 years' },
    { cat_seniority: '4 years' },
    { cat_seniority: '5 years' },
    { cat_seniority: '6 years' },
    { cat_seniority: '7 years' },
    { cat_seniority: '8 years' },
    { cat_seniority: '9 years' },
    { cat_seniority: '10 years+' }
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


    console.log('File input initialized:', this.fileInput);
  }


  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click(); 
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
    this.isloading = true;
    const formData: FormData = new FormData();
    
    // Récupérer l'ID de l'utilisateur depuis sessionStorage
    const user_id = this.userInfo?.u_uid; // Utiliser u_uid au lieu de user_id
    console.log('User ID:', user_id); // Ajoutez cette ligne pour le débogage
    if (user_id) {
      formData.append('created_by', user_id);
    }
    
    formData.append('c_picture', this.file as File);
    // @ts-ignore
    formData.append('c_firstname', this.register_form.get('c_firstname')?.value);
    // @ts-ignore
    formData.append('c_lastname', this.register_form.get('c_lastname')?.value);
    // @ts-ignore
    formData.append('c_mobile', this.register_form.get('c_mobile')?.value);
    // @ts-ignore
    formData.append('c_email', this.register_form.get('c_email')?.value);
    // @ts-ignore
    formData.append('c_birth_date', this.register_form.get('c_birth_date')?.value);
    // @ts-ignore
    formData.append('c_address', this.register_form.get('c_address')?.value);
    // @ts-ignore
    formData.append('c_gender', this.register_form.get('c_gender')?.value);
    // @ts-ignore
    formData.append('c_seniority', this.register_form.get('c_seniority')?.value);
    // @ts-ignore
    formData.append('c_section', this.register_form.get('c_section')?.value);
     // @ts-ignore
    formData.append('c_baptism_date', this.register_form.get('c_baptism_date')?.value);
      // @ts-ignore
    formData.append('c_place_baptism', this.register_form.get('c_place_baptism')?.value);
     // @ts-ignore
    formData.append('c_confirm_date', this.register_form.get('c_confirm_date')?.value);
      // @ts-ignore
    formData.append('c_place_confirm', this.register_form.get('c_place_confirm')?.value);
    // Ajouter admin_name à formData
    formData.append('admin_name', this.userInfo?.u_firstname + ' ' + this.userInfo?.u_lastname);
  
    this.catechiste.createCatechiste(formData).subscribe({
      next: (response: any) => {
        this.data = response;
        if (this.data && this.data.c_uid) {
          this._router.navigate(['/admin', 'catechiste-received', this.data.c_uid]);
          Swal.fire(
            'Success!',
            'Catechiste created successfully.',
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
        this.isloading = false;
      },
      complete: () => {
        console.log('complete');
        this.isloading = false;
      }
    });
  }

  ngOnInit() {
    // Initialisation du formulaire si nécessaire
  }
}
