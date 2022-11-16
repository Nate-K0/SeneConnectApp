import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { InterceptTokenService } from './intercept-token.service';
import { GuardAuthService } from './guard-auth.service';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminpostsComponent } from './adminposts/adminposts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent,
    SearchComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    AdminusersComponent,
    AdminpostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [AuthService, UserService, PostService, 
    { provide: HTTP_INTERCEPTORS, useClass: InterceptTokenService, multi: true},
    GuardAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
