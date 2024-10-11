import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

@Component({
  selector: 'app-catechumen-info',
  templateUrl: './catechumen-info.component.html',
  styleUrls: ['./catechumen-info.component.scss']
})
export class CatechumenInfoComponent implements OnInit, AfterViewInit {
  catechumene: any;
  kt_id: any;

  constructor(private catechumenes: CatechumeneService, private _activateRouter: ActivatedRoute, private router: Router) {}


  viewCatechumene() {
    let body = { kt_uid: this.kt_id };
    this.catechumenes.readSingleCatechumene(body).subscribe({
      next: (response: any) => {
        this.catechumene = response?.user;
        this.loadPdfPreview();  // Appeler ici après que les données sont chargées
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  ngAfterViewInit() {
    // Call loadPdfPreview after view initialization
    this.loadPdfPreview();
  }

  loadPdfPreview() {
    const url = this.catechumene?.kt_birth_certificate;
    if (!url) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf: any) => {
      const pdfContainer = document.getElementById('pdf-preview');
      if (pdfContainer) {
        pdf.getPage(1).then((page: any) => {
          const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale for preview
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext).promise.then(() => {
            pdfContainer.innerHTML = ''; // Clear previous content if any
            pdfContainer.appendChild(canvas);
          });
        });
      }
    }, (reason: any) => {
      console.error(reason);
    });
  }

  openBirthCertificate() {
    if (this.catechumene && this.catechumene.kt_birth_certificate) {
      window.open(this.catechumene.kt_birth_certificate, '_blank');
    } else {
      alert('Certificat de naissance non disponible pour ce catechumène.');
    }
  }

  ngOnInit() {
    this._activateRouter.params.subscribe(params => {
      this.kt_id = params['kt_uid'];
      this.viewCatechumene();
    });
  }

  convertImageToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const base64Image = canvas.toDataURL('image/png');
          console.log(base64Image); // Vérifiez le base64 dans la console
          resolve(base64Image);
        } else {
          reject('Failed to get canvas context');
        }
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  edit(){
    this.router.navigate(['/admin', 'edit-catechumene', this.catechumene.kt_uid])
  }

  downloadPage() {
    const element = document.querySelector('.container') as HTMLElement;

    if (element) {
      const images = Array.from(element.querySelectorAll('img'));
      const promises = images.map(img => new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      }));

      const profileImageUrl = this.catechumene?.kt_picture || '';
      promises.push(this.convertImageToBase64(profileImageUrl).then(base64Image => {
        const profileImage = document.querySelector('.profile-image-header') as HTMLImageElement;
        if (profileImage) {
          profileImage.src = base64Image;
        }
      }));

      Promise.all(promises).then(() => {
        document.querySelector('.download-button-container')?.setAttribute('style', 'display: none !important;');

        html2canvas(element, { 
          scale: 2, 
          useCORS: true, 
          logging: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [210, 297]
          });
          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          let heightLeft = imgHeight;

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, heightLeft - imgHeight, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          const firstName = this.catechumene?.c_firstname || 'Unknown';
          const lastName = this.catechumene?.c_lastname || 'Unknown';
          const fileName = `fiche_du_catechiste_${lastName}_${firstName}.pdf`.replace(/\s+/g, '_');

          pdf.save(fileName);

          document.querySelector('.download-button-container')?.setAttribute('style', '');
        });
      });
    }
  }
}
