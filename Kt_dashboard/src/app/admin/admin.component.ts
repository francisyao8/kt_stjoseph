import { Component } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //@ts-ignore
userInfo:any = JSON.parse(sessionStorage.getItem('infoLogin'))
is_user_logged_in = !!$.cookie('isLoggedIn');

  constructor() {}

  logout(){
    $.removeCookie('isLoggedIn', { path: '/' });
    sessionStorage.removeItem('infoLogin')
    window.location.href = '/'
  }

}
