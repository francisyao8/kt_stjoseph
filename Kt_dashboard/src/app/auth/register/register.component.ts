import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  user: any
  isLoading : boolean = false;

  constructor(private register: UsersService, 
    private _router: Router,) { }


  register_form = new FormGroup({
    u_firstname : new FormControl(null, Validators.required),
    u_lastname : new FormControl(null, Validators.required),
    u_username : new FormControl(null, Validators.required),
    u_mobile : new FormControl(null, Validators.required),
    u_address : new FormControl(null, Validators.required),
    u_email : new FormControl(null, Validators.required),
    u_role : new FormControl(null, Validators.required),
    u_password : new FormControl(null, Validators.required),
  })

admin_role = [
  {role: 'super admin'},
  {role: 'coordinateur'},
  {role: 'secretaire'},
  {role: 'responsable child'},
  {role: 'responsable young'},
  {role: 'responsable adult'},
]



newUser() {
  this.isLoading = true;
  return this.register.cretaUser(this.register_form.value).subscribe({
    next: (response: any) => {
      this.user = response.result;
      this._router.navigate(['/auth/login']);
      Swal.fire(
        'Success!',
        'You are registered.',
        'success'
      );
    },
    error: (error: any) => {
      Swal.fire(
        'Error!',
        error?.error_description || '',
        'error'
      );
      this.isLoading = false;
    },
    complete: () => {
      console.log('complete');
      this.isLoading = false;
    }
  });
}



  ngOnInit() {
    
  }
}
