import { Component, OnInit } from '@angular/core';
import { EmplyeeserviceService } from './services/user-service';
import { LocationStrategy } from '@angular/common';
import { Role } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isAdminPage = false;
  AdminPageText = 'Admin Panel';
  public ShowProductDiv = false;
  constructor(private employeeservice: EmplyeeserviceService) { }

  ngOnInit() {
    this.getLoggedInValue();
    this.GetAdminValue();
    this.GetAdminPageText();
  }
  getLoggedInValue() {
    if ((localStorage.getItem('IsLoggedIn') || '') === 'true')
      this.isLoggedIn = true;
    else
      this.isLoggedIn = false;
  }

  GetAdminValue() {
    if (((localStorage.getItem('currentUserRole') || '') === ('' + Role.Admin)) && this.isLoggedIn)
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  ToggleAdminPage() {
    if (this.isAdminPage) {
      this.isAdminPage = false;
      window.location.href = '/home';
    }
    else {
      this.isAdminPage = true;
      window.location.href = '/home/admin';
    }
    this.GetAdminPageText();
  }

    GetAdminPageText(){

      if (this.isAdminPage) {
        this.AdminPageText = 'Home';
      }
      else {
        this.AdminPageText = 'Admin Panel';
      }
    }

  LogOut() {
    localStorage.setItem('IsLoggedIn', 'false');
    this.employeeservice.logOutUser().subscribe(
      (data) => {
        window.location.href = '/login';
      },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      }
    );
  }

  LogIn() {
    localStorage.setItem('IsLoggedIn', 'true');
    this.isLoggedIn = true;
  }

  title = 'POSWeb';
}
