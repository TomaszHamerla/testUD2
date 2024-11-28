import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostClientForm} from "../../../core/models/client.model";
import {FormsService} from "../../../core/services/forms.service";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {

  clientForm!: FormGroup<PostClientForm>;

  constructor(
    private formsService: FormsService
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
      firstname: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      surname: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      phone: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      address: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      postcode: new FormControl('', {nonNullable: true, validators: [Validators.required]})
    })
  }

  onAddCliennnt() {

  }
}
