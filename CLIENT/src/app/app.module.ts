import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { BookComponent } from './book/book.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import {UserService} from './services/user.service';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BooksearchComponent,
    BookComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    StorageServiceModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },AuthGuard,AuthInterceptor,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

