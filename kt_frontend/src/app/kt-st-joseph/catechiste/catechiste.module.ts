import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatechisteRoutingModule } from './catechiste-routing.module';
import { CatechisteComponent } from './catechiste.component';
import { RegisterComponent } from './register/register.component';
import { ReceivedComponent } from './received/received.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReRegisterComponent } from './re-register/re-register.component';


@NgModule({
  declarations: [
    CatechisteComponent,
    RegisterComponent,
    ReceivedComponent,
    ReRegisterComponent
  ],
  imports: [
    CommonModule,
    CatechisteRoutingModule,
    ReactiveFormsModule
  ]
})
export class CatechisteModule { }
