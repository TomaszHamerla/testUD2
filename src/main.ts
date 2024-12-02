import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AuthModule} from './app/modules/auth/auth.module';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {spinnerInterceptor} from "./app/modules/core/interceptors/spinner.interceptor";
import {headerInterceptor} from "./app/modules/core/interceptors/header.interceptor";
import {PreloadAllModules, provideRouter, withPreloading} from "@angular/router";
import {APP_ROUTES} from "./app/app-routes";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, AuthModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptors([spinnerInterceptor, headerInterceptor])),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
  ]
})
  .catch(err => console.error(err));
