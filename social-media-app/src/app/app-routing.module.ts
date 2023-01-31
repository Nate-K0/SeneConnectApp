import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GuardAuthService } from './guard-auth.service';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminpostsComponent } from './adminposts/adminposts.component';
import { GuardAdminAuthService } from './guard-admin-auth.service';
import { NewpostComponent } from './newpost/newpost.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:HomeComponent, canActivate: [GuardAuthService]},
  {path:'comment/:id', component:CommentComponent, canActivate: [GuardAuthService]},
  {path:'newpost', component:NewpostComponent, canActivate: [GuardAuthService]},
  {path:'admin/users', component:AdminusersComponent, canActivate: [GuardAdminAuthService]},
  {path:'admin/posts', component:AdminpostsComponent, canActivate: [GuardAdminAuthService]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'search', component:SearchComponent, canActivate: [GuardAuthService]},
  {path:'account', component:AccountComponent, canActivate: [GuardAuthService]},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
