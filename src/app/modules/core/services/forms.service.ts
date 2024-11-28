import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

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
