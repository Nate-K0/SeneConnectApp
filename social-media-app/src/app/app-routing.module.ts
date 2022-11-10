import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:HomeComponent, canActivate: [GuardAuthService]},
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
