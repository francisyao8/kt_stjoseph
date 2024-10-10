import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatechumeneService } from 'src/app/services/catechumene.service';
import QrCreator from 'qr-creator';
@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit{
  catechumene_info: any;
  kt_id: any;
  

  constructor(private _activateRouter: ActivatedRoute, private catechumene: CatechumeneService) { }


  viewCatechumene(){
    let body = {
      kt_uid : this.kt_id
    }
    return this.catechumene.readSingleCatechumene(body).subscribe({
      next: (response: any) => {
        this.catechumene_info = response?.user
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete');
        
      },
    })
  }

  
  Qrcode() {
    const url = `http://localhost:4200/kt-st-joseph/catechumene-received/${this.kt_id}`;
    const canvas = document.querySelector('#qr-code') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    
    if (context) {
      QrCreator.render({
        text: url,
        radius: 0.5, // 0.0 to 0.5
        ecLevel: 'H', // L, M, Q, H
        fill: '#E9967A', // foreground color
        background: null, // color or null for transparent
        size: 128 // in pixels
      }, canvas);
    
      // Assurez-vous que le QR code a été généré avant de dessiner l'image
      const image = new Image();
      image.onload = () => {
        // Réduire la taille de l'image à 50% de sa taille d'origine
        const newWidth = image.width * 0.25;
        const newHeight = image.height * 0.25;
        
        // Calcul des coordonnées pour centrer l'image
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;
        
        context.drawImage(image, x, y, newWidth, newHeight);
      };
      image.src = 'assets/logo/stj.png'; // Spécifiez le chemin de votre image
    } else {
      console.error('Impossible d\'obtenir le contexte 2D du canvas.');
    }
  }
  
  

  ngOnInit() {
    this._activateRouter.params.subscribe(params => {
       this.kt_id = params['kt_uid'];
      this.viewCatechumene();
      this.Qrcode();
    });
  }
}
