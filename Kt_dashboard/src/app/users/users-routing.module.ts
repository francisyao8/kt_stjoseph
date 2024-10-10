import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component:UsersComponent,
  children:[
      {path:'',redirectTo: 'home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    // { path:'catechiste-info/:c_uid', component:CatechistInfoComponent},
    // { path:'catechumene-info/:kt_uid', component:CatechumenInfoComponent},
    // {
    //   path: 'sections', loadChildren: () => import('./sections/sections.module')
    //     .then(m => m.SectionsModule), 
    // },
    // {
    //   path: 'user', 
    //   loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    // },
    // {
    //   path: 'settings', 
    //   loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    // },
    // {path: 'animateurs', component:AnimateursComponent},
    // {path: 'catechiste-received/:c_uid', component:CatechisteReceivedComponent},
    // {path: 'catechumene-received/:kt_uid', component:CatechumeneReceivedComponent},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
