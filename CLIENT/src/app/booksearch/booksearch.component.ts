import { Component, OnInit, Input } from '@angular/core';
import {GoogleapiService} from '../services/googleapi.service';
import { NgForm } from '@angular/forms';


import {BookService} from '../services/book.service';
import {Book} from '../shared/book.model';

declare var M:any;


@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css'],
  providers:[GoogleapiService]
})
export class BooksearchComponent implements OnInit {

  Title: string;
  Author: string;
  Des:string;
  items;
  searchText;
  @Input() childname:String;
  @Input() public childemail:any;
  
  public hideRuleContent:boolean[] = [];
  public buttonName:any = 'Expand';
  public isHidden: boolean;
  public mail:any;
  
  
  
  toggle(index) {
    // toggle based on index
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

  constructor(private googleapiservice: GoogleapiService,private bookservice:BookService) { }

  ngOnInit() {
   this.refreshBookList();
  }

  onSubmit(form:NgForm){
  this.isHidden = false;
   this.searchText = form.value.searchVariable;
    this.googleapiservice.getNews(form.value.searchVariable).subscribe((data)=>{
      this.items = data['items'];
      //console.log(data);
      //console.log("test");
      //console.log(this.items[1].volumeInfo.imageLinks.thumbnail);
      //console.log(form.value.searchVariable);
    });
  }

  resetSearch(form?:NgForm){
     if(form)
     form.reset();
     this.isHidden = true;
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
      email:this.childemail
    }
    this.bookservice.postBook(obj).subscribe((res) =>{
      //console.log(this.childemail);
      this.refreshBookList();
      M.toast({html: 'Saved Successfully',classes:'greenToast'});
    });
  }

  // refreshBookList(){
  //   this.bookservice.getBookList().subscribe((res)=>{
  //     this.bookservice.books =res as Book[];
  //     //console.log(this.bookservice.books[1].email);
  //     console.log(this.childemail);
  //      })
  // }

  refreshBookList(){ 
    this.mail = this.childemail;
    this.bookservice.getUserList(this.mail).subscribe((res)=>{
    this.bookservice.books =res as Book[];
    //alert(this.mail);
  })
  }

  onView(bk : Book){
  }

  onDelete(_id:string){
    if(confirm("Are You Sure?") == true){
        this.bookservice.deleteBook(_id).subscribe((res)=>{
        this.refreshBookList();
        M.toast({html: 'Deleted Successfully',classes:'redToast'});
      })
    }
  }



}
