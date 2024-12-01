import { Component } from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
isLoading!: BehaviorSubject<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) {
    this.isLoading = this.spinnerService.isLoading;
  }

}
