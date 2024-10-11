import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import Swal from 'sweetalert2';

declare var $: any
declare const flatpickr: any;
declare var dropify: any;
@Component({
  selector: 'app-edit-catechiste',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-catechiste.component.html',
  styleUrl: './edit-catechiste.component.scss'
})
export class EditCatechisteComponent implements OnInit {

  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;


  data: any;
  selectedImage: boolean = false;
  c_id: any;
  body: any;
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
    c_section: new FormControl(null, Validators.required),
    created_by: new FormControl(null),
    admin_name: new FormControl(null),
    c_baptism_date: new FormControl(null, Validators.required),
    c_place_baptism: new FormControl(null, Validators.required),
    c_confirm_date: new FormControl(null, Validators.required),
    c_place_confirm: new FormControl(null, Validators.required),
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

  getCatechiste() {
    let body = {
      c_uid: this.c_id
    }
    return this.catechiste.readSingleCatechiste(body).subscribe({
      next: (response: any) => {
        this.body = response?.user;
        console.log(this.body);
        this.patchFormValues();
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  patchFormValues() {
    if (this.register_form) {
      this.register_form.patchValue({
        c_uid: this.body?.c_uid,
        c_matricule: this.body?.c_matricule,
        c_firstname: this.body?.c_firstname,
        c_lastname: this.body?.c_lastname,
        c_mobile: this.body?.c_mobile,
        c_email: this.body?.c_email,
        c_birth_date: this.body?.c_birth_date,
        c_address: this.body?.c_address,
        c_gender: this.body?.c_gender,
        c_seniority: this.body?.c_seniority,
        c_section: this.body?.c_section,
        c_baptism_date: this.body?.c_baptism_date,
        c_place_baptism: this.body?.c_place_baptism,
        c_confirm_date: this.body?.c_confirm_date,
        c_place_confirm: this.body?.c_place_confirm,
      });
    } else {
      console.error('Le formulaire register_form n\'est pas initialisé.');
    }
  }

  submitForm() {
    this.isloading = true;
    if (this.c_id) {
      const formData: FormData = new FormData();
      //@ts-ignore
      formData.append('c_uid', this.register_form.get('c_uid')?.value)
      //@ts-ignore
      formData.append('c_matricule', this.register_form.get('c_matricule')?.value)
      //@ts-ignore
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
      // @ts-ignore
      formData.append('c_baptism_date', this.register_form.get('c_baptism_date')?.value);
      // @ts-ignore
      formData.append('c_place_baptism', this.register_form.get('c_place_baptism')?.value);
      // @ts-ignore
      formData.append('c_confirm_date', this.register_form.get('c_confirm_date')?.value);
      // @ts-ignore
      formData.append('c_place_confirm', this.register_form.get('c_place_confirm')?.value);

      return this.catechiste.updateCatechiste(formData).subscribe({
        next: (response: any) => {
          this.data = response;
          console.log(formData);
          if (this.data && this.data.c_uid) {
            this._router.navigate(['/admin', 'catechiste-received', this.data.c_uid]);
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
          console.log(err);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
          this.isloading = false;
        },
        complete: () => {
          console.log('complete');
          this.isloading = false;
        }
      });

    } else {
      // Si this.c_id n'est pas défini, afficher un message d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      return;
    }
  }



  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.c_id = params['c_uid'];
    });
    if (this.c_id) {
      this.getCatechiste();
    }
  }

}
