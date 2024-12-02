import {Component, OnDestroy} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators, ReactiveFormsModule } from "@angular/forms";
import {combineLatest, Subscription} from "rxjs";
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-phone-control',
    templateUrl: './phone-control.component.html',
    styleUrl: './phone-control.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PhoneControlComponent,
            multi: true,
        }
    ],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule, NgIf, MatError]
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  numberPrefixControl = new FormControl('', [Validators.required]);
  numberControl = new FormControl('', [Validators.required]);
  sub = new Subscription();

  onChange = (value: string | null) => {
  };

  onTouch = () => {
  };

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      })
    );
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberControl.disable();
      this.numberPrefixControl.disable();
    } else {
      this.numberControl.enable();
      this.numberPrefixControl.enable();
    }
  }

  writeValue(value: string): void {
    const valueWihtoutPlus = value.replace('+', '');
    const prefix = valueWihtoutPlus.slice(0, 2);
    const number = valueWihtoutPlus.slice(2);

    this.numberPrefixControl.setValue(prefix);
    this.numberControl.setValue(number);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
