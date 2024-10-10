import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatechisteService } from 'src/app/services/catechiste.service';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('baptizedBabyChart') baptizedBabyChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('catechumeneSectionChart') catechumeneSectionChartRef!: ElementRef<HTMLCanvasElement>;

  // Données des catéchistes et des catéchumènes
  catechisteData: any;
  catechumeneData: any;

  // Graphiques
  baptizedBabyChart: any;
  catechumeneSectionChart: any;

  // Données des administrateurs connectés
  connectedAdmins: any;

  constructor(
    private catechiste: CatechisteService,
    private catechumene: CatechumeneService,
    private admin: AuthService
  ) {}

  ngAfterViewInit() {}

  // Créer le graphique des bébés baptisés
  createBaptizedBabyChart() {
    this.baptizedBabyChart = new Chart(this.baptizedBabyChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Baptized Babies', 'Not Baptized Babies'],
        datasets: [{
          data: [this.getBaptizedBabiesCount(), this.getTotalCatechumeneCount() - this.getBaptizedBabiesCount()],
          backgroundColor: ['rgb(46, 204, 113)', 'rgb(241, 196, 15)'], // Jaune et vert
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: '#fff',
            formatter: (value: any, ctx: any) => {
              return ctx.chart.data.labels[ctx.dataIndex] + ': ' + value.toLocaleString();
            }
          }
        }
      }
    });
  }

// Créer le graphique des sections des catéchumènes
createCatechumeneSectionChart() {
  // Vérifier si les données des catéchumènes existent
  if (!this.catechumeneData) {
    console.error('No catechumene data available. Cannot create catechumene section chart.');
    return;
  }

  this.catechumeneSectionChart = new Chart(this.catechumeneSectionChartRef.nativeElement, {
    type: 'pie',
    data: {
      labels: ['Children', 'Young', 'Adult'],
      datasets: [{
        data: this.calculateCatechumeneSectionCounts(),
        backgroundColor: ['#8E44AD', '#3498DB', '#C0392B'],
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: '#fff',
      formatter: (value: any, ctx: any) => {
        // Calculer le pourcentage
        const total = ctx.chart.data.datasets[0].data.reduce((acc: any, data: any) => acc + data, 0);
        const percentage = Math.round((value / total) * 100);
        return percentage + '%';
          }
        }
      }
    }
  });
}


  getSectionCount(section: string): number {
    return this.catechumeneData.filter((catechumene: any) => catechumene.kt_section.toLowerCase() === section.toLowerCase()).length;
  }
    

  // Obtenir l'historique d'inscription des catéchistes
  getCatechisteRegistrationHistory() {
    let body = {};
    this.catechiste.readAllCatechiste(body).subscribe({
      next: (response: any) => {
        if (response && response.status === 'success') {
          this.catechisteData = response.catechiste;
          setTimeout(() => {
            $('.table').DataTable();
          }, 1000);
        } else {
          console.error('Error fetching catechiste registration history:', response.error_description);
        }
      },
      error: (error) => {
        console.error('Error fetching catechiste registration history:', error);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  // Obtenir l'historique d'inscription des catéchumènes
getCatechumeneRegistrationHistory() {
  let body = {};
  this.catechumene.readAllCatechumene(body).subscribe({
    next: (response: any) => {
      if (response && response.status === 'success') {
        this.catechumeneData = response.catechumene;

         // Créer le graphique de la section des catéchumènes une fois que les données sont disponibles
         if (this.catechumeneData.length > 0 && this.createCatechumeneSectionChart) {
          this.createCatechumeneSectionChart();
        }

        if (this.baptizedBabyChart) {
          this.updateBaptizedBabyChart();
        } else {
          this.createBaptizedBabyChart();
        }
      } else {
        console.error('Error fetching catechumene registration history:', response.error_description);
      }
    },
    error: (error) => {
      console.error('Error fetching catechumene registration history:', error);
    },
    complete() {
      console.log('complete');
    },
  });
}


  // Mettre à jour le graphique des bébés baptisés
  updateBaptizedBabyChart() {
    this.baptizedBabyChart.data.datasets[0].data = [this.getBaptizedBabiesCount(), this.getTotalCatechumeneCount() - this.getBaptizedBabiesCount()];
    this.baptizedBabyChart.update();
  }

  // Obtenir le nombre de bébés baptisés
  getBaptizedBabiesCount(): number {
    return this.catechumeneData.filter((catechumene: any) => catechumene?.kt_baptized_baby === 'yes').length;
  }

  // Obtenir le nombre total de catéchumènes
  getTotalCatechumeneCount(): number {
    return this.catechumeneData.length;
  }

  // Calculer le nombre de catéchumènes dans chaque section
  calculateCatechumeneSectionCounts(): number[] {
    const childrenCount = this.catechumeneData.filter((catechumene: any) => catechumene.kt_section === 'children').length;
    const youngCount = this.catechumeneData.filter((catechumene: any) => catechumene.kt_section === 'young').length;
    const adultCount = this.catechumeneData.filter((catechumene: any) => catechumene.kt_section === 'adult').length;
  
    return [childrenCount, youngCount, adultCount];
  }

  // Obtenir les administrateurs connectés
  getConnectedAdmins() {
    let body = {};
    return this.admin.GetConnectedAdmins(body).subscribe({
      next: (response: any) => {
        if (response && response.status === 'success') {
          this.connectedAdmins = response?.result;
          setTimeout(() => {
            $('.table').DataTable();
          }, 1000);
        } else {
          console.error('Error fetching connected admins:', response.message);
        }
      },
      error: (error: any) =>{
        console.log(error);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  ngOnInit() {
    this.getCatechisteRegistrationHistory();
    this.getCatechumeneRegistrationHistory();
    this.getConnectedAdmins();
  }

}
