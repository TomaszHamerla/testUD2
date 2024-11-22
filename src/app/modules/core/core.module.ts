import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    RouterLink,
    SharedModule
  ]
})
export class CoreModule {
}
