import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {authLoadGuard} from "./modules/core/guards/auth-load.guard";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'klienci',
    loadChildren: () => import('./modules/clients/routes').then((m) => m.ROUTES_CLIENTS)
    , canMatch: [authLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
