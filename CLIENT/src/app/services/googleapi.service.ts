import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable({
  providedIn: 'root'
})
export class GoogleapiService {

  
  API_KEY = '';

  constructor(private httpClient: HttpClient) { }

  getNews(searchText):Observable<any>{
    const encodedURI = encodeURI("https://www.googleapis.com/books/v1/volumes?q="+searchText+"&maxResults=15&key=AIzaSyDHDCI5JYsbDRGRa5nx252a0kv43XwCpvE");
    return this.httpClient.get(encodedURI);
  }



}

