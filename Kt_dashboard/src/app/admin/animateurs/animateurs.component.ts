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
    const userRole = this.userInfo?.u_role;

    if (['super admin', 'coordinateur', 'secretaire'].includes(userRole)) {
      this.catechiste.readAllCatechiste({}).subscribe({
        next: (response: any) => {
          this.handleCatechisteResponse(response);
        },
        error: this.handleError,
      });
    } else if (['responsable young', 'responsable child', 'responsable adult'].includes(userRole)) {
      const body = { c_section: userRole.split(' ')[1].toLowerCase() }; 
      this.catechiste.readCatechisteBysection(body).subscribe({
        next: (response: any) => {
          this.handleCatechisteResponse(response);
        },
        error: this.handleError,
      });
    } else {
      console.warn('User role not recognized or does not have access to catechists');
    }
  }

  handleCatechisteResponse(response: any) {
    if (response && response.status === 'success' && response.catechiste) {
      this.all_catechiste = response.catechiste;
      setTimeout(() => {
        $('.table').DataTable({
          layout: {
            topStart: {
              buttons: ['copy', 'excel', 'pdf', 'print']
            }
          }
        });
      }, 1000);
    } else {
      console.error('Error: Invalid response format or empty catechiste list');
    }
  }

  handleError(err: any) {
    console.error('Error during fetching catechists:', err);
  }

  delCatechiste(uid: any, matricule: any) {
    const userId = this.userInfo?.u_uid;  
    const name = this.userInfo?.u_firstname + ' ' + this.userInfo?.u_lastname;  
  
    if (!userId) {
      console.error('User ID not found. Cannot delete catechiste.');
      return;  
    }
  
    const body = {
      c_uid: uid,
      c_matricule: matricule,
      created_by: userId,
      admin_name: name 
    }
  
    console.log('Payload:', body); 
    
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
              this.viewCatechiste();
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
