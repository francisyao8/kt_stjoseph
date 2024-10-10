import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ReadUsersComponent } from './read-users/read-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';


const routes: Routes = [
  {path: '', component:UserComponent,
  children: [
    {path: '', redirectTo: 'read-users', pathMatch: 'full'},
    {path: 'read-users', component:ReadUsersComponent},
    {path: 'view-users/:user_id', component: ViewUsersComponent},
    {path: 'edit-users/:user_id', component: EditUsersComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
