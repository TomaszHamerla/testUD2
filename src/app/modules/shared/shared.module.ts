import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from './components/alert/alert.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {PhoneControlComponent} from './controls/phone-control/phone-control.component';


@NgModule({
  declarations: [
    AlertComponent,
    PhoneControlComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule
  ],
  exports: [CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, AlertComponent,
    BrowserAnimationsModule, PhoneControlComponent
  ],
  providers: [provideHttpClient()]
})
export class SharedModule {
}
