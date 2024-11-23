import { Component } from '@angular/core';
import {UserLoginDate} from "../../core/models/UserLoginDate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  userData: UserLoginDate = {
    username: '',
    password: '',
  }
  onLogin() {
    console.log(this.userData)
  }
}
