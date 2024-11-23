import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlertComponent } from './components/alert/alert.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, AlertComponent,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
