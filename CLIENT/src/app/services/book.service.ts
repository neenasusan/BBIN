import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Book} from '../shared/book.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  selectedBook:Book;
  books: Book[];
  readonly baseURL ='http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  postBook(bk: Book){
    return this.http.post(this.baseURL,bk);
  }

  getBookList(){
    return this.http.get(this.baseURL);
  }

  deleteBook(_id:string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getUserList(email:any){
    //alert(email);
    return this.http.post(this.baseURL+`/${email}`,email);
  }

}
