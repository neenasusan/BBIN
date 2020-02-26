import { Component, OnInit,Input } from '@angular/core';
import {BookService} from '../services/book.service';
import { NgForm } from '@angular/forms';
declare var M:any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[BookService]
})
export class BookComponent implements OnInit {
  

  constructor(private bookservice:BookService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    console.log("testing reset");
    if(form)
    form.reset();
    this.bookservice.selectedBook={
      _id: "",
      title: "",
      author: "",
      description: "",
      email:""
    }
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.bookservice.postBook(form.value).subscribe((res) =>{
      this.resetForm(form);
      M.toast({html: 'saved successfully',classes:'rounded'});
    });
  }

 

}
