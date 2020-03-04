import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksearchComponent} from './booksearch/booksearch.component';
import {BookComponent} from './book/book.component';
import {AboutComponent} from './about/about.component';
import {UserComponent} from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';

import {NavComponent} from './nav/nav.component';



const routes: Routes = [
  {
    path: 'nav',
    component:NavComponent,
  },
  {
    path: 'signup',
    component:UserComponent,
    children:[{path:'',component:SignUpComponent }]
  },
  {
      path: 'login',
      component:UserComponent,
      children:[{path:'',component:SignInComponent }]
  },
  { 
    path:'userprofile',component:UserProfileComponent,canActivate:[AuthGuard],
    children:[{path:'',component:NavComponent},{path:'',component:BooksearchComponent}]
  },

  { path: 'about', component: AboutComponent},
  { path: 'book', component: BookComponent,canActivate:[AuthGuard]},
  {
    path:'',
    redirectTo:'userprofile',
    pathMatch: 'prefix'
  }
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
