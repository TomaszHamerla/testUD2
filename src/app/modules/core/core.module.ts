import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    RouterLink,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [provideHttpClient()]
})
export class CoreModule {
}
