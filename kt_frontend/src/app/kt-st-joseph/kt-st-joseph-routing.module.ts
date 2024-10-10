
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KtStJosephComponent } from './kt-st-joseph.component';
import { HomeComponent } from './home/home.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';


const routes: Routes = [
  {path: '', component:KtStJosephComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component:HomeComponent},
      {path: 'payment-method', component:PaymentMethodComponent},
      {path:'catechiste', loadChildren: () => import('././catechiste/catechiste.module').then(m => m.CatechisteModule)},
      {path:'catechumene', loadChildren: () => import('././catechumene/catechumene.module').then(m => m.CatechumeneModule)},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KtStJosephRoutingModule { }
