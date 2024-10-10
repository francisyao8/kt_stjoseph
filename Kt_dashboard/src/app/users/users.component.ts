import { Component } from '@angular/core';
import { SidebarComponent } from "./includes/sidebar/sidebar.component";
import { HeaderComponent } from "./includes/header/header.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
