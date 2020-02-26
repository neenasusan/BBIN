import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  userName:string;
  email:string;
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
  
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userName= this.userDetails.userName;
        this.email= this.userDetails.email;
      },
      err => { 
        console.log(err);
        
      }
    );

   
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

 

}
