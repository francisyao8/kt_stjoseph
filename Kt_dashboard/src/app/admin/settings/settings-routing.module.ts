import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CreateCatechisteComponent } from './create-catechiste/create-catechiste.component';
import { CreateCatechumeneComponent } from './create-catechumene/create-catechumene.component';
import { HistoryComponent } from './history/history.component';
import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  {path: '', component:SettingsComponent,
  children: [
    {path: '', redirectTo: 'create-catechiste', pathMatch: 'full'},
    {path: 'create-catechiste', component:CreateCatechisteComponent},
    {path: 'create-catechumene', component: CreateCatechumeneComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'program', component: ProgramComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
