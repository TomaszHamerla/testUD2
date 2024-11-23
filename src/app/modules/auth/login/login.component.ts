import { Component } from '@angular/core';
import {UserLoginDate} from "../../core/models/UserLoginDate";
import {AuthService} from "../../core/services/auth.service";

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
  errorMsg = '';

  constructor(
    private authService: AuthService
  ) {
  }
  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        if (value.length === 0) {
          this.errorMsg = 'Podano nieprawidłowe dane do logowania'
        }
      },
      error: (err) => {
        this.errorMsg = ' Wystapil blad'
      }
    })
  }
}
