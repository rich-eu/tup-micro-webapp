import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getService(url: string, param: any) {
    return this.httpClient.get(url, {params: param});
  }
}