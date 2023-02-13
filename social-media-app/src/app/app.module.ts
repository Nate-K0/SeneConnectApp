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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminpostsComponent } from './adminposts/adminposts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost/newpost.component';
import { CommentComponent } from './comment/comment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';

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
    AdminpostsComponent,
    NewpostComponent,
    CommentComponent,
    EditProfileComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    DragDropModule
  ],
  providers: [AuthService, UserService, PostService, 
    { provide: HTTP_INTERCEPTORS, useClass: InterceptTokenService, multi: true},
    GuardAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
