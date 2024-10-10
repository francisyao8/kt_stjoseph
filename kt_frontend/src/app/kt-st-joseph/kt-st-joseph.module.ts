import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KtStJosephRoutingModule } from './kt-st-joseph-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodComponent } from './payment-method/payment-method.component';





@NgModule({
  declarations: [
    HomeComponent,


  ],
  imports: [
    CommonModule,
    KtStJosephRoutingModule,
    ReactiveFormsModule
  ]
})
export class KtStJosephModule { }
