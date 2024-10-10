import { Component, OnInit } from '@angular/core';
import { CatechumeneService } from 'src/app/services/catechumene.service';
declare var $: any;
@Component({
  selector: 'app-adult',
  templateUrl: './adult.component.html',
  styleUrls: ['./adult.component.scss']
})
export class AdultComponent implements OnInit{

  section : string = 'adult';
  catechumenesByYear: {[key: string]: any[]} = {}; 
  activeYear: string = '1st year'; 
  loading: boolean = false;
  dataTable: any;


  constructor(private catechumene: CatechumeneService) { }

  getCatechumenesBySectionAndLevel() {
    this.loading = true; 
    // $('.table').DataTable().destroy();

    const body = {
      kt_section: this.section,
      kt_level: this.activeYear
    };

    this.catechumene.readCatechumeneBySectionAndLevel(body).subscribe({
      next: (response: any) => {
        if (response && response?.status === 'success' && response?.catechumenes) {
          setTimeout(() => {
            // Vérifier si le DataTable existe déjà
            if (this.dataTable) {
              this.dataTable.destroy(); // Détruire l'instance existante
            }

            // Initialiser le DataTable
            this.dataTable = $('.table').DataTable({
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
          console.error('Erreur lors de la récupération des catéchumènes:', response?.error_message);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catéchumènes:', error);
        this.loading = false;

      },
      complete() {
        console.log('complete');
      },
    });
  }

    // Function to update active year when tab is changed
    updateActiveYear(year: string) {
      this.activeYear = year;
      if (!this.catechumenesByYear[year]) {
        this.getCatechumenesBySectionAndLevel(); 
      }
    }

  ngOnInit() {
    this.getCatechumenesBySectionAndLevel();
  }
}
