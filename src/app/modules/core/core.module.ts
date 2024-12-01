import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {SpinnerComponent} from './components/spinner/spinner.component';
import {spinnerInterceptor} from "./interceptors/spinner.interceptor";
import {headerInterceptor} from "./interceptors/header.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    RouterLink,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [provideHttpClient(withInterceptors([spinnerInterceptor, headerInterceptor]))]
})
export class CoreModule {
}
