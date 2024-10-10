import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnimateursComponent } from './animateurs/animateurs.component';
import { CatechistInfoComponent } from './catechist-info/catechist-info.component';
import { CatechumenInfoComponent } from './catechumen-info/catechumen-info.component';
import { CatechisteReceivedComponent } from './catechiste-received/catechiste-received.component';
import { CatechumeneReceivedComponent } from './catechumene-received/catechumene-received.component';

const routes: Routes = [
  {path:'', component:AdminComponent,
  children:[
      {path:'',redirectTo: 'dashboard', pathMatch:'full'},
    {path:'dashboard', component: DashboardComponent},
    { path:'catechiste-info/:c_uid', component:CatechistInfoComponent},
    { path:'catechumene-info/:kt_uid', component:CatechumenInfoComponent},
    {
      path: 'sections', loadChildren: () => import('./sections/sections.module')
        .then(m => m.SectionsModule), 
    },
    {
      path: 'user', 
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
      path: 'settings', 
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    },
    {path: 'animateurs', component:AnimateursComponent},
    {path: 'catechiste-received/:c_uid', component:CatechisteReceivedComponent},
    {path: 'catechumene-received/:kt_uid', component:CatechumeneReceivedComponent},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
