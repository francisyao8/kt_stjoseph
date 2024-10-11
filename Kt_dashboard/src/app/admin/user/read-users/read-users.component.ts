import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-read-users',
  templateUrl: './read-users.component.html',
  styleUrls: ['./read-users.component.scss']
})
export class ReadUsersComponent implements OnInit{


  users_list: any;
  isLoading: boolean = false;

  // @ts-ignore
  userInfo: any = JSON.parse(sessionStorage.getItem('infoLogin'));
  is_user_logged_in = !!$.cookie('isLoggedIn');

  constructor(private users: UsersService,
    private _router: Router,
    ) {}

  ngOnInit()  {
    this.showUsers();
   }
 
   showUsers() {
    this.users.readAllUsers().subscribe({
      next: (response: any) => {
        if (response && response.status === 'success' && response.users) {
          this.users_list = response.users;
          console.log(this.users_list);
          setTimeout(() => {
            $('.table').DataTable({
              layout: {
                topStart: {
                    buttons: [
                        'copy', 'excel', 'pdf', 'print'
                    ]
                }
            }
            });
          }, 1000);
        } else {
          console.error('Error: Invalid response format or empty user list');
          // Affichez un message ou effectuez une action appropriée pour informer l'utilisateur
        }
      },
      error: (err) => {
        console.error('Error during fetching users:', err);
        // Affichez un message d'erreur ou effectuez une action appropriée pour informer l'utilisateur
      },
      complete: () => {
        console.log('Request completed');
      },
    });
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
        this.users.deleteUser(body).subscribe({
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
  
  

  
}
