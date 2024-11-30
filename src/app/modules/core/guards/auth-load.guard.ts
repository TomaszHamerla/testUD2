import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authLoadGuard: CanMatchFn = (route, segments) => {
  const isLoggedId = inject(AuthService).isLoggedId();
  return isLoggedId ? isLoggedId : inject(Router).createUrlTree(['/logowanie']);
};
