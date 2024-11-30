import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authActivateGuard: CanActivateFn = (route, state) => {
  const isLoggedId = inject(AuthService).isLoggedId();
  return isLoggedId ? isLoggedId : inject(Router).createUrlTree(['/logowanie']);
};
