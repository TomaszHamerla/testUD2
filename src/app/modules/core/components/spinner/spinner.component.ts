import { Component } from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";
import {BehaviorSubject} from "rxjs";
import { NgIf, AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    standalone: true,
    imports: [NgIf, MatProgressSpinner, AsyncPipe]
})
export class SpinnerComponent {
isLoading!: BehaviorSubject<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) {
    this.isLoading = this.spinnerService.isLoading;
  }

}
