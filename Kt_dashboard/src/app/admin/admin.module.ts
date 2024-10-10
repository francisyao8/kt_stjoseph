import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuGaucheComponent } from './menu-gauche/menu-gauche.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectionsComponent } from './sections/sections.component';
import { AnimateursComponent } from './animateurs/animateurs.component';
import { CatechistInfoComponent } from './catechist-info/catechist-info.component';
import { CatechumenInfoComponent } from './catechumen-info/catechumen-info.component';
import { CatechisteReceivedComponent } from './catechiste-received/catechiste-received.component';
import { CatechumeneReceivedComponent } from './catechumene-received/catechumene-received.component';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    MenuGaucheComponent,
    SettingsComponent,
    UserComponent,
    AdminComponent,
    DashboardComponent,
    SectionsComponent,
    AnimateursComponent,
    CatechistInfoComponent,
    CatechumenInfoComponent,
    CatechisteReceivedComponent,
    CatechumeneReceivedComponent,
   

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FullCalendarModule
  ]
})
export class AdminModule { }
