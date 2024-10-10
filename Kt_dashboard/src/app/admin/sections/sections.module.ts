import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { ChildComponent } from './child/child.component';
import { YoungComponent } from './young/young.component';
import { AdultComponent } from './adult/adult.component';


@NgModule({
  declarations: [
    ChildComponent,
    YoungComponent,
    AdultComponent
  ],
  imports: [
    CommonModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }
