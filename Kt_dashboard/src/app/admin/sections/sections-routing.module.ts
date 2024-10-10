import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './sections.component';
import { ChildComponent } from './child/child.component';
import { YoungComponent } from './young/young.component';
import { AdultComponent } from './adult/adult.component';

const routes: Routes = [
  {path: '', component:SectionsComponent,
    children: [

      {path:'',redirectTo: 'child', pathMatch:'full'},
      {path: 'child', component: ChildComponent},
      {path: 'young', component: YoungComponent},
      {path: 'adult', component: AdultComponent},

    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
