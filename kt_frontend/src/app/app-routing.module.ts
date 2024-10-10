import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
   {path:'', redirectTo: 'kt-st-joseph', pathMatch: 'full'},
  {path:'kt-st-joseph', loadChildren: () => import('./kt-st-joseph/kt-st-joseph.module').then(m => m.KtStJosephModule)},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
