
import { Component, OnInit } from '@angular/core';
import { EmplyeeserviceService } from '../services/user-service';
import { User, Role } from '../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  Email = new FormControl('');
  Password = new FormControl('');
  datasaved = false;
  loggingUser: User;
  constructor(private employeeservice: EmplyeeserviceService) { }

  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.loggingUser = new User();
    this.loggingUser.Email = this.Email.value;
    this.loggingUser.Password = this.Password.value;
  }

  onSubmit() {

    this.setFormState();
    let employee = this.loggingUser;

    this.Login(employee);
    this.loggingUser = new User();
  }
  Login(employee: User) {
    this.employeeservice.loginUser(employee).subscribe(
      (data) => {
        if (data != null) {
          localStorage.setItem('currentUser', data.profileDetails);
          localStorage.setItem('currentUserToken', data.tokenString);
          localStorage.setItem('IsLoggedIn', 'true');
        }

        this.Email.setValue("");
        this.Password.setValue("");
        window.location.href = '/home';
      },
      (error) => {
        //window.alert(error.error);

        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      }
    )
  }
}
