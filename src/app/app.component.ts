import {Component, OnInit} from '@angular/core';
import {AuthService} from "./modules/core/services/auth.service";
import { HeaderComponent } from './modules/core/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './modules/core/components/footer/footer.component';
import { SpinnerComponent } from './modules/core/components/spinner/spinner.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent, SpinnerComponent]
})
export class AppComponent implements OnInit{
  title = 'rejestr-klientow';

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }


}
