import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private catechisteService: CatechisteService, private _router: Router, private catechumeneService: CatechumeneService) {}

  showMatriculeLookupDialog() {
    Swal.fire({
      title: "Enter your matricule",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (c_matricule) => {
        try {
          // Envoie d'une requête pour vérifier l'existence du catéchiste
          const response = await this.catechisteService.readSingleCatechiste({ c_matricule: c_matricule }).toPromise();
          
          // Si le catéchiste est trouvé, afficher un message de confirmation
          // @ts-ignore
          if (response.status === 'success') {
          // @ts-ignore
            const catechisteNom = response?.user?.c_lastname; 
          // @ts-ignore
            const catechistePrenom = response?.user?.c_firstname; 
            Swal.fire({
                icon: 'success',
                title: 'Catechiste found',
                text: `${catechistePrenom} ${catechisteNom} ` 
            });
            // Redirection vers une autre page avec l'identifiant du catéchiste
          // @ts-ignore
            this._router.navigate(['/kt-st-joseph', 'catechiste', 're-register', response?.user?.c_uid]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Catechiste not found',
              text: 'Please check your matricule and try again.'
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Request failed',
            text: `Failed to check matricule: ${error}`
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
  showMatriculeLookupDialogKt() {
    Swal.fire({
      title: "Enter your matricule",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (kt_matricule) => {
        try {
          // Envoie d'une requête pour vérifier l'existence du catechumene
          const response = await this.catechumeneService.readSingleCatechumene({ kt_matricule: kt_matricule }).toPromise();
          
          // Si le catechumene est trouvé, afficher un message de confirmation
          // @ts-ignore
          if (response.status === 'success') {
          // @ts-ignore
            const catechumeneeNom = response?.user?.kt_lastname; 
          // @ts-ignore
            const catechumenePrenom = response?.user?.kt_firstname; 
            Swal.fire({
                icon: 'success',
                title: 'catechumene found',
                text: `${catechumenePrenom} ${catechumeneeNom} ` 
            });
            // Redirection vers une autre page avec l'identifiant du catechumene
          // @ts-ignore
            this._router.navigate(['/kt-st-joseph', 'catechumene', 're-register', response?.user?.kt_uid]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'catechumene not found',
              text: 'Please check your matricule and try again.'
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Request failed',
            text: `Failed to check matricule: ${error}`
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
  ngOnInit() {
  }
}
