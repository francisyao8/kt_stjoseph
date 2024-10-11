import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';
import QrCreator from 'qr-creator';

@Component({
  selector: 'app-catechiste-received',
  templateUrl: './catechiste-received.component.html',
  styleUrls: ['./catechiste-received.component.scss']
})
export class CatechisteReceivedComponent implements OnInit {

  catechiste_info: any
  c_id: any;

  constructor(private _activateRouter: ActivatedRoute, private catechiste: CatechisteService) { }

  viewCatechiste(){
    let body = {
      c_uid : this.c_id
    }
    return this.catechiste.readSingleCatechiste(body).subscribe({
      next: (response: any) => {
        this.catechiste_info = response.user
        setTimeout(() => {
          QrCreator.render({
            text: this.catechiste_info,
            radius: 0.5, // 0.0 to 0.5
            ecLevel: 'H', // L, M, Q, H
            fill: '#002556', // foreground color
            background: null, // color or null for transparent
            size: 100 // in pixels
          },
          // @ts-ignore
          document.querySelector('#qr-code'));
        }, 2000);
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
}
