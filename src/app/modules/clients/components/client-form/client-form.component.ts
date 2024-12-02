import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {Client, PostClientForm} from "../../../core/models/client.model";
import {FormsService} from "../../../core/services/forms.service";
import {ClientsService} from "../../../core/services/clients.service";
import {Router} from "@angular/router";
import {Observer} from "rxjs";
import {ClientValidators} from "../../../shared/validators/client.validators";
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PhoneControlComponent } from '../../../shared/controls/phone-control/phone-control.component';
import { MatButton } from '@angular/material/button';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, PhoneControlComponent, MatButton, AlertComponent]
})
export class ClientFormComponent implements OnInit {

  clientForm!: FormGroup<PostClientForm>;
  errorMsg = '';
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMsg = '';
      this.router.navigate(['/klienci'])
    },
    error: err => {
      this.errorMsg = 'Wystapil blad';
    },
    complete: () => {

    }
  }


  constructor(
    private formsService: FormsService,
    private clientService: ClientsService,
    private router: Router
  ) {
  }

  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  getErrorMessages(control: FormControl) {
    return this.formsService.getErrorMessages(control);
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required, ClientValidators.postcode()]
      })
    })
  }

  onAddCliennnt() {
    if (this.editMode) {
      this.clientService.putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }
    this.clientService.postClient(this.clientForm.getRawValue()).subscribe(this.observer)
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
