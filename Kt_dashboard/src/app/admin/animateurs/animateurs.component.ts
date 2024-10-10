import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-animateurs',
  templateUrl: './animateurs.component.html',
  styleUrls: ['./animateurs.component.scss']
})
export class AnimateursComponent implements OnInit {
  all_catechiste: any;
  uid: any;
// @ts-ignore
  userInfo: any = JSON.parse(sessionStorage.getItem('infoLogin'));
  is_user_logged_in = !!$.cookie('isLoggedIn');

  constructor(private catechiste: CatechisteService, private _router: Router) { }

  viewCatechiste() {
    // $('.table').DataTable().destroy();
    // this.all_catechiste = []
    let body = {};
    return this.catechiste.readAllCatechiste(body).subscribe({
      next: (response: any) => {
        if (response && response.status === 'success' && response.catechiste) {
          this.all_catechiste = response.catechiste;
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
          console.error('Error: Invalid response format or empty catechiste list');
        }
      },
      error: (err) => {
        console.error('Error during fetching catechists:', err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  delCatechiste(uid: any, matricule: any) {
    const userId = this.userInfo.user_id;  
    const body = {
      c_uid: uid,
      c_matricule: matricule,
      user_id: userId
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this catechiste?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.catechiste.deleteCatechiste(body).subscribe({
          next: (response: any) => {
            if (response && response.status === 'success') {
              Swal.fire('Deleted!', 'Catechiste has been deleted.', 'success');
              this._router.navigate(['/admin/animateurs']);
            } else {
              Swal.fire('Error!', 'Failed to delete catechiste.', 'error');
            }
          },
          error: (err) => {
            console.error('Error during deleting catechiste:', err);
            Swal.fire('Error!', 'An error occurred while deleting catechiste.', 'error');
          },
          complete: () => {
            console.log('complete');
          }
        });
      }
    });
  }

  ngOnInit() {
    this.viewCatechiste();
  }
}
