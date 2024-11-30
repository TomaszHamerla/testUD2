import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../../../core/models/client.model";

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.scss'
})
export class EditClientDialogComponent {

  constructor(
    private dialogref: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
  ) {
  }
  closeDialog() {
    this.dialogref.close();
  }
}
