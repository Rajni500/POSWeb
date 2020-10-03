import { Component, OnInit } from '@angular/core';
import { EmplyeeserviceService } from './services/user-service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  constructor(private employeeservice: EmplyeeserviceService) { }

  ngOnInit() {
    this.getLoggedInValue();
  }
  getLoggedInValue() {
    if ((localStorage.getItem('IsLoggedIn') || '') === 'true')
      this.isLoggedIn = true;
    else
      false;
  }

  LogOut() {
    localStorage.setItem('IsLoggedIn', 'false');
    this.isLoggedIn = false;
    this.employeeservice.logOutUser().subscribe(data => {
    });
  }

  LogIn() {
    localStorage.setItem('IsLoggedIn', 'true');
    this.isLoggedIn = true;
  }

  title = 'POSWeb';
}
