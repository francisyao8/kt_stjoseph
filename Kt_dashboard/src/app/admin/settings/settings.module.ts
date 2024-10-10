import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CreateCatechisteComponent } from './create-catechiste/create-catechiste.component';
import { CreateCatechumeneComponent } from './create-catechumene/create-catechumene.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { ProgramComponent } from './program/program.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    CreateCatechisteComponent,
    CreateCatechumeneComponent,
    HistoryComponent,
    ProgramComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule

  ]
})
export class SettingsModule { }
