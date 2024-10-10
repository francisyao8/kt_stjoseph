import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReadUsersComponent } from './read-users/read-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReadUsersComponent,
    ViewUsersComponent,
    EditUsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
