import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
    public root_url = 'https://api.weletemwc.agelgel.net/'; // Production URL
    // public root_url = 'http://127.0.0.1:8000/'; // Production URL
  public admin_url = this.root_url + 'api/';

  constructor(private httpRequest: HttpClient) { }
  public sendGetRequest(routeName) {
    return this.httpRequest.get(this.admin_url + routeName);
  }
  public sendPostRequest(routeName, body, header) {
    return this.httpRequest.post(this.admin_url + routeName, body, header);
  }
  public sendPutRequest(routeName, body, header) {
    return this.httpRequest.put(this.admin_url + routeName, body, header);
  }
  public sendPatchRequest(routeName, body, header) {
    return this.httpRequest.patch(this.admin_url + routeName, body, header);
  }
  public sendDeleteRequest(routeName) {
    return this.httpRequest.delete(this.admin_url + routeName);
  }
  public sendCustomGetRequest(full_url) {
    return this.httpRequest.get(full_url);
  }
  public sendCustomPostRequest(full_url, body, header) {
    return this.httpRequest.post(full_url, body, header);
  }
  public getRootUrl() {
    return this.root_url;
  }
}
