export interface ClientResponse {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export type PostClient = Omit<ClientResponse, 'id'>;

export class Client implements ClientResponse {

  constructor(
    public address: string,
    public email: string,
    public firstname: string,
    public id: number,
    public phone: string,
    public postcode: string,
    public surname: string
  ) {
  }
}
