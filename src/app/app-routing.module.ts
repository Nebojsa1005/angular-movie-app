import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './services/auth-guard.service';

import {HomeComponent} from './views/home/home.component'
import { MovieComponent } from './views/movie/movie.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { UserMoviesListComponent } from './views/user-movies-list/user-movies-list.component';

const routes: Routes = [
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'list/:id', component: HomeComponent, canActivate: [CanActivateGuard]
    
  },
  {
    path: 'movie/:id', component: MovieComponent, canActivate: [CanActivateGuard] 
  },
  {
    path: 'user/:id', component: UserInfoComponent, canActivate: [CanActivateGuard]
  },
  {
    path: '**', redirectTo: '/list/1', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
