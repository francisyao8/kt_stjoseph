import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatechisteComponent } from './catechiste.component';
import { RegisterComponent } from './register/register.component';
import { ReceivedComponent } from './received/received.component';
import { ReRegisterComponent } from './re-register/re-register.component';

const routes: Routes = [
  {path: '', component:CatechisteComponent,
    children: [
      {path: '', redirectTo: 'register', pathMatch: 'full'},
      {path: 'register', component:RegisterComponent},
      {path: 're-register/:c_uid', component:ReRegisterComponent},
      {path: 'received/:c_uid', component:ReceivedComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatechisteRoutingModule { }
