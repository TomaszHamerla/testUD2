import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../../core/services/clients.service";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../../core/models/client.model";
import {switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeleteClientDialogComponent} from "./delete-client-dialog/delete-client-dialog.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  client!: Client;
  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params) => this.clientService.getClient(+params['id'])))
      .subscribe({
        next: client => {
          console.log(client)
          this.client = client;
        }
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      data: {
        client: this.client
      }
    })
  }
}
