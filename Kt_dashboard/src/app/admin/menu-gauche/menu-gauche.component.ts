import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
declare var $ : any;

@Component({
  selector: 'app-menu-gauche',
  templateUrl: './menu-gauche.component.html',
  styleUrls: ['./menu-gauche.component.scss']
})
export class MenuGaucheComponent implements OnInit{
  users_list: any;
  user_id: any;
  user_info: any;


  constructor(
    private users: UsersService
  ) {}


  viewSingleUser() {
    let body = {
      u_uid: this.user_id,
    }
    this.users.readSingleUser(body).subscribe({
      next: (response: any) => {
        this.user_info = response.user;
        console.log(this.user_info);
      },
      error: () => {
      },
      complete: () => console.log('complete')
    })
  }

  ngOnInit(): void {
    this.viewSingleUser();
    
  }
}
