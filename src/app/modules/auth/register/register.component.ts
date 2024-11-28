import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {PostUser} from "../../core/models/UserLoginDate";
import {Router} from "@angular/router";
import {FormsService} from "../../core/services/forms.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.email, Validators.minLength(5), Validators.maxLength(50)], nonNullable: true}),
    username: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required], nonNullable: true}),
  })
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsService: FormsService
  ) {
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie'])
      },
      error: (err) => {
        this.errorMsg = ' Wystapil blad'
      }
    })
  }

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessages(control: FormControl) {
    return this.formsService.getErrorMessages(control);
  }
 }
