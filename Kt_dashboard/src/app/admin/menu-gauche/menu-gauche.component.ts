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

  //@ts-ignore
  userInfo:any = JSON.parse(sessionStorage.getItem('infoLogin'))
  is_user_logged_in = !!$.cookie('isLoggedIn');

  constructor(
    private users: UsersService
  ) {}

    // Méthode pour vérifier si l'utilisateur a accès
    isUserAllowed(allowedRoles: string[]): boolean {
      return allowedRoles.includes(this.userInfo.u_role);
    }

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
