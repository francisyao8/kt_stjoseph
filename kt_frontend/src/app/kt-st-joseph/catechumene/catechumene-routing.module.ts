import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatechumeneComponent } from './catechumene.component';
import { ReceivedComponent } from './received/received.component';
import { RegisterComponent } from './register/register.component';
import { ReRegisterComponent } from './re-register/re-register.component';

const routes: Routes = [
  {path: '', component:CatechumeneComponent,
    children: [
      {path: '', redirectTo: 'register', pathMatch: 'full'},
      {path: 'received/:kt_uid', component:ReceivedComponent},
      {path: 'register', component:RegisterComponent},
      {path: 're-register/:kt_uid', component:ReRegisterComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatechumeneRoutingModule { }
