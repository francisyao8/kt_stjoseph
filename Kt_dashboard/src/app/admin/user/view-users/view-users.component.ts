import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit{

  body: any;
  user_id: any;
  user_info: any;
  isLoading: any
// @ts-ignore
userInfo: any = JSON.parse(sessionStorage.getItem('infoLogin'));
is_user_logged_in = !!$.cookie('isLoggedIn');
  constructor(
    private user: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }


  viewSingleUser() {
    let body = {
      u_uid: this.user_id,
    }
    this.user.readSingleUser(body).subscribe({
      next: (response: any) => {
        this.user_info = response.user;
        console.log(this.user_info);
      },
      error: () => {
      },
      complete: () => console.log('complete')
    })
  }

  delAdmin(uid: string, matricule: string) {
    const userId = this.userInfo?.u_uid;
    const name = this.userInfo?.u_firstname + ' ' + this.userInfo?.u_lastname;
    const userRole = this.userInfo?.u_role;
  
    // Vérifiez si le rôle de l'utilisateur est autorisé à supprimer un admin
    if (userRole !== 'super admin' && userRole !== 'coordinateur' && userRole !== 'secretaire') {
      Swal.fire('Permission Denied', 'You do not have permission to delete users.', 'error');
      return;
    }
  
    const body = {
      u_uid: uid,
      u_matricule: matricule,
      created_by: userId,
      admin_name: name
    };
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.user.deleteUser(body).subscribe({
          next: (response: any) => {
            if (response && response.status === 'success') {
              Swal.fire('Deleted!', 'Admin has been deleted.', 'success');
              this._router.navigate(['/admin/user/read-users']);
            } else {
              Swal.fire('Error!', 'Failed to delete admin.', 'error');
            }
          },
          error: (err) => {
            console.error('Error during deleting admin:', err);
            Swal.fire('Error!', 'An error occurred while deleting admin.', 'error');
          },
          complete: () => {
            console.log('complete');
            this.isLoading = false;
          }
        });
      }
    });
  }
  

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.user_id = params['user_id']; // (+) converts string 'id' to a number
    });

    this.viewSingleUser();
  }
}
