import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/UserLoginDate";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  constructor(
    private authService: AuthService
  ) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
