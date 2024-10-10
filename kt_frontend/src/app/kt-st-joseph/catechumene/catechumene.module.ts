import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatechumeneRoutingModule } from './catechumene-routing.module';

import { ReceivedComponent } from './received/received.component';
import { CatechumeneComponent } from './catechumene.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ReRegisterComponent } from './re-register/re-register.component';


@NgModule({
  declarations: [

    ReceivedComponent,
    CatechumeneComponent,
    RegisterComponent,
    ReRegisterComponent
  ],
  imports: [
    CommonModule,
    CatechumeneRoutingModule,
    ReactiveFormsModule
  ]
})
export class CatechumeneModule { }
