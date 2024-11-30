import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../../../core/models/client.model";
import {ClientsService} from "../../../../core/services/clients.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrl: './delete-client-dialog.component.scss'
})
export class DeleteClientDialogComponent implements OnInit {

  client!: Client;
  errorMsg = '';

  constructor(
    private dialogref: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { client: Client },
    private clientService: ClientsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.client = this.data.client;
  }

  onDelete() {
    this.clientService.deleteClient(this.client.id).subscribe({
        next: () => {
          this.dialogref.close();
          this.router.navigate(['/klienci'])
        },
        error: err => {
          this.errorMsg = 'Wystapil blad'
        }
      }
    )
  }
}