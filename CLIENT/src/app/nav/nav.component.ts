import { Component,OnInit,Input } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userDetails;
  userName:string;
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userName= this.userDetails.userName;
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
