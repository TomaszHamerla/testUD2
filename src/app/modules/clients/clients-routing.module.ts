import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from "./clients.component";
import {ClientComponent} from "./components/client/client.component";
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {clientFormDeactivateGuardGuard} from "../core/guards/client-form-deactivate-guard.guard";

const routes: Routes = [
  {
    path: '', component: ClientsComponent,
    //canActivate: [authActivateGuard]
  },
  {path: 'dodaj', component: ClientFormComponent, canDeactivate: [clientFormDeactivateGuardGuard]},
  {
    path: ':id', component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
