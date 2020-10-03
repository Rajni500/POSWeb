import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmplyeeserviceService } from '../services/user-service';
import { User, Role } from '../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  Title = new FormControl('');
  PhoneNumber = new FormControl('');
  Email = new FormControl('');
  Password = new FormControl('');
  datasaved = false;
  regUser : User;
  constructor(private employeeservice: EmplyeeserviceService) { }

  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.regUser = new User();
    this.regUser.Id = 0;
    this.regUser.RoleId = Role.Customer;
    this.regUser.Email = this.Email.value;
    this.regUser.Title = this.Title.value;
    this.regUser.PhoneNumber = this.PhoneNumber.value;
    this.regUser.Password = this.Password.value;
  }

  onSubmit() {

    this.setFormState();
    let employee = this.regUser;

    this.createemployee(employee);
    this.regUser = new User();
  }
  createemployee(employee: User) {
    this.employeeservice.createemployee(employee).subscribe(
      (data) => {
        if (data != null) {
          localStorage.setItem('currentUser', data.profileDetails);
          localStorage.setItem('currentUserToken', data.tokenString);
          localStorage.setItem('IsLoggedIn', 'true');
        }

        this.Email.setValue("");
        this.Password.setValue("");
        this.Title.setValue("");
        this.PhoneNumber.setValue("");
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
