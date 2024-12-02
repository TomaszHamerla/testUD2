import {Routes} from '@angular/router';
import {ClientsComponent} from "./clients.component";
import {ClientComponent} from "./components/client/client.component";
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {clientFormDeactivateGuardGuard} from "../core/guards/client-form-deactivate-guard.guard";

export const ROUTES_CLIENTS: Routes = [
  {
    path: '', component: ClientsComponent,
    //canActivate: [authActivateGuard]
  },
  {path: 'dodaj', component: ClientFormComponent, canDeactivate: [clientFormDeactivateGuardGuard]},
  {
    path: ':id', component: ClientComponent
  }
];

