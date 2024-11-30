import { CanDeactivateFn } from '@angular/router';
import {ClientFormComponent} from "../../clients/components/client-form/client-form.component";

export const clientFormDeactivateGuardGuard: CanDeactivateFn<ClientFormComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.clientForm.dirty) {
    return window.confirm('Czy na pewno chesz opuscic strone ?')
  }else {
    return true;
  }
};
