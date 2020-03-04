import { Component, OnInit } from '@angular/core';
import {BookService} from '../services/book.service';
import { NgForm } from '@angular/forms';
declare var M:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers:[BookService]
})
export class AboutComponent implements OnInit {

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
