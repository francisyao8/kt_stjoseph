import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-catechist-info',
  templateUrl: './catechist-info.component.html',
  styleUrls: ['./catechist-info.component.scss']
})
export class CatechistInfoComponent implements OnInit {
  catechiste_info: any;
  c_id: any;

  constructor(private catechiste: CatechisteService,
              private _activateRouter: ActivatedRoute) {}

  viewCatechiste() {
    let body = {
      c_uid : this.c_id
    }
    return this.catechiste.readSingleCatechiste(body).subscribe({
      next: (response: any) => {
        this.catechiste_info = response?.user
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    })
  }

  ngOnInit() {
    this._activateRouter.params.subscribe(params => {
      this.c_id = params['c_uid'];
      this.viewCatechiste();
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
  
      const profileImageUrl = this.catechiste_info?.c_picture || '';
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
  
          const firstName = this.catechiste_info?.c_firstname || 'Unknown';
          const lastName = this.catechiste_info?.c_lastname || 'Unknown';
          const fileName = `fiche_du_catechiste_${lastName}_${firstName}.pdf`.replace(/\s+/g, '_');
  
          pdf.save(fileName);
  
          document.querySelector('.download-button-container')?.setAttribute('style', '');
        });
      });
    }
  }
}
