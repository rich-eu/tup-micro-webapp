import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public username = '';
  public password = '';

  public isAuthenticated = false;
  ngOnInit() {
    this.authenticatUser();
  }

  public authenticatUser() {
    this.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    this.password = localStorage.getItem('password') ? localStorage.getItem('password') : '';

    this.isAuthenticated = (this.username !== '' && this.password !== '')? true : false;
  }

  public logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

}
