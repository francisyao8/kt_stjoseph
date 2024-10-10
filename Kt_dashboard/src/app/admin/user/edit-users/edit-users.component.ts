import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  user_id: any;
  user_info: any;
  isLoading: boolean = false;
  data: any;

  update_form = new FormGroup({
    u_uid: new FormControl(null),
    u_matricule: new FormControl(null),
    u_firstname: new FormControl(null, Validators.required),
    u_lastname: new FormControl(null, Validators.required),
    u_username: new FormControl(null, Validators.required),
    u_mobile: new FormControl(null, Validators.required),
    u_address: new FormControl(null, Validators.required),
    u_email: new FormControl(null, Validators.required),
    u_role: new FormControl(null, Validators.required),
    u_password: new FormControl(null),
  });

  constructor(
    private user: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.user_id = params['user_id'];
    });
    this.viewSingleUser();
  }

  viewSingleUser() {
    let body = { u_uid: this.user_id };
    this.user.readSingleUser(body).subscribe({
      next: (response: any) => {
        this.user_info = response.user;
        console.log(this.user_info);

        // Affecter les valeurs de user_info aux FormControl
        this.update_form.patchValue({
          u_uid: this.user_info?.u_uid,
          u_matricule: this.user_info?.u_matricule,
          u_firstname: this.user_info?.u_firstname,
          u_lastname: this.user_info?.u_lastname,
          u_username: this.user_info?.u_username,
          u_mobile: this.user_info?.u_mobile,
          u_address: this.user_info?.u_address,
          u_email: this.user_info?.u_email,
          u_role: this.user_info?.u_role,
          u_password: this.user_info?.u_password
        });
      },
      error: () => { },
      complete: () => console.log('complete')
    });
  }

  updateAdminInfo() {
    if (this.user_id) {
      this.isLoading = true;
      return this.user.updateUser(this.update_form.value).subscribe({
        next: (response: any) => {
          this.data = response;
          this._router.navigate(['/admin/user/view-users', this.data?.u_uid]);
          Swal.fire(
            'success!',
            'User updated successfully.',
            'success'
          );
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        }
      });
    } else {
      console.error('User ID is not defined.'); 
    }
    return;
  }

  goBack() {
    this._router.navigate(['/admin/user/read-users']);
  }
}
