import { Component, OnInit,Input } from '@angular/core';
import {GoogleapiService} from '../services/googleapi.service';
import { NgForm } from '@angular/forms';
import {BookService} from '../services/book.service';
import {Book} from '../shared/book.model';
declare var M:any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[GoogleapiService]
})
export class BookComponent implements OnInit {
  
  Title: string;
  Author: string;
  Des:string;
  items;
  public mail:any;
  constructor(private googleapiservice: GoogleapiService,private bookservice:BookService) { }

   
  ngOnInit() {
   this.categoryAdventure();
   this.refreshBookList();
   //alert(localStorage.keyEmail);
  }

     categoryAdventure(){
      var search = 'subject:adventure';
      this.googleapiservice.getNews(search).subscribe((data)=>{
        this.items = data['items'];
        console.log(data);
      });
    }

    setTitle(item){
      this.Title =item.volumeInfo.title;
      this.Author = item.volumeInfo.authors;
      this.Des= item.volumeInfo.description;
    }
  
    passToDB(item){
      var authorString=item.volumeInfo.authors;
      if(authorString){
      authorString =  authorString.toString();
      }
      else{
        authorString= "unknown";
      }
      var obj ={
        _id:"",
        title:item.volumeInfo.title,
        author:authorString,
        description:item.volumeInfo.description,
        email:localStorage.keyEmail
      }
      this.bookservice.postBook(obj).subscribe((res) =>{
        //console.log(this.childemail);
        this.refreshBookList();
        M.toast({html: 'Saved Successfully',classes:'greenToast'});
      });
    }
    refreshBookList(){ 
      this.mail = localStorage.keyEmail;
      this.bookservice.getUserList(this.mail).subscribe((res)=>{
      this.bookservice.books =res as Book[];
      //alert(this.mail);
    })
    }
      
 
  

}
