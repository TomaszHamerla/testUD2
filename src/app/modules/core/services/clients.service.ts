import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Client, ClientResponse, GetClientResponse, PostClient} from "../models/client.model";
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

  getClients(pageIndesx: number, itemsPerPage: number, sortDirection: string, sortColumnName: string, value =''): Observable<GetClientResponse> {
    let params = new HttpParams()
      .append('_page', pageIndesx)
      .append('_limit', itemsPerPage);
    if (sortColumnName) {
      params = params
        .append('_sort', sortColumnName)
        .append('_order', sortDirection);
    }

    if (value) {
      params = params.append('firstname_like', value);
    }

    return this.http.get<ClientResponse[]>(`${this.apiUrl}/clients`, {observe: 'response', params}).pipe(
      map(
        (response) => {
          if (!response.body) {
            return {clients: [], totalCount: 0};
          }

          const clientArr: Client[] = response.body.map(
            ({id, firstname, surname, email, phone, address, postcode}) =>
              new Client(id, firstname, surname, email, phone, address, postcode));

          const totalCount = Number(response.headers.get('X-Total-Count'))
          return {clients: clientArr, totalCount}
        })
    );
  }

  postClient(clientData: PostClient): Observable<Client> {
    return this.http.post<ClientResponse>(`${this.apiUrl}/clients`, clientData).pipe(
      map(({id, firstname, surname, email, phone, address, postcode}) =>
        new Client(id, firstname, surname, email, phone, address, postcode))
    );
  }
}
