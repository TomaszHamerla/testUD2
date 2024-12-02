import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/UserLoginDate";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [MatToolbar, MatButton, RouterLink, NgIf]
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
