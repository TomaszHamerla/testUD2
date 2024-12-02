import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app/app-routing.module';
import {AuthModule} from './app/modules/auth/auth.module';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {spinnerInterceptor} from "./app/modules/core/interceptors/spinner.interceptor";
import {headerInterceptor} from "./app/modules/core/interceptors/header.interceptor";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, AppRoutingModule, AuthModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptors([spinnerInterceptor, headerInterceptor]))
  ]
})
  .catch(err => console.error(err));
