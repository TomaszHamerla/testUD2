import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Client, ClientResponse, PostClient} from "../models/client.model";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get<ClientResponse[]>(`${this.apiUrl}/clients`).pipe(
      map(
        (clients) => clients.map(
          ({id, firstname, surname, email, phone, address, postcode}) =>
            new Client(id, firstname, surname, email, phone, address, postcode)))
    );
  }

  postClient(clientData: PostClient): Observable<Client> {
    return this.http.post<ClientResponse>(`${this.apiUrl}/clients`, clientData).pipe(
      map(({id, firstname, surname, email, phone, address, postcode}) =>
        new Client(id, firstname, surname, email, phone, address, postcode))
    );
  }
}
