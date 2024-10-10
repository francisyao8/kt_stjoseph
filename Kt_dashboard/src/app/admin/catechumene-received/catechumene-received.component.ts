import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatechumeneService } from 'src/app/services/catechumene.service';

@Component({
  selector: 'app-catechumene-received',
  templateUrl: './catechumene-received.component.html',
  styleUrls: ['./catechumene-received.component.scss']
})
export class CatechumeneReceivedComponent implements OnInit{
  catechumene_info: any;
  kt_id: any;
  

  constructor(private _activateRouter: ActivatedRoute, private catechumene: CatechumeneService) { }


  viewCatechumene(){
    let body = {
      kt_uid : this.kt_id
    }
    return this.catechumene.readSingleCatechumene(body).subscribe({
      next: (response: any) => {
        this.catechumene_info = response.user
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
       this.kt_id = params['kt_uid'];
      this.viewCatechumene();
    });
  }

}
