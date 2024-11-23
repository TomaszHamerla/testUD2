import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {PostUser} from "../../core/models/UserLoginDate";
import {Router} from "@angular/router";

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
    private router: Router
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
    if (control.hasError('required')) {
      return 'Musisz wpisac jakas wartosc'
    }

    if (control.hasError('minlength')) {
      return 'Przekazano za malo ilosc znakow'
    }

    if (control.hasError('maxlength')) {
      return 'Przekazales za duzo znakow'
    }

    return control.hasError('email') ? 'Nieprawidlowy adres email' : '';
  }
}
