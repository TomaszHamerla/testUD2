import { Component } from '@angular/core';
import {UserLoginDate} from "../../core/models/UserLoginDate";
import {AuthService} from "../../core/services/auth.service";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatInput, NgIf, AlertComponent, MatIconButton, MatSuffix, MatIcon, MatButton, RouterLink]
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
