import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../../core/services/clients.service";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../../core/models/client.model";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  client!: Client;
  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute
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

}
