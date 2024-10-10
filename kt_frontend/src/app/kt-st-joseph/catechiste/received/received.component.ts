import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatechisteService } from 'src/app/services/catechiste.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit{

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
