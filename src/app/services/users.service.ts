import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser = new BehaviorSubject<any>(null)
  currentToken: any

  baseUrl: string = 'https://angular-movie-app-a61c9-default-rtdb.firebaseio.com/users.json?auth='
  listBaseUrl: string = 'https://api.themoviedb.org/4/list/'
  movieDetailsUrl: string = 'https://api.themoviedb.org/3/movie/'
  afterAuthUrl: string = 'https://angular-movie-app-a61c9-default-rtdb.firebaseio.com/users/'
  apiKey: string = '?api_key=0f0f45efef6bdd14d1de380408bd937d'

  constructor(
    private http: HttpClient,
    private authService: AuthService,    
  ) { }

  storeUser(data:any) {    
    
    return this.authService.signUpUser({
      email: data.email,
      password: data.password
    }).pipe(exhaustMap(user => {
      this.currentToken = user.idToken     
      this.currentUser.next(user)
       
      return this.http.post<any>(this.baseUrl + this.currentToken, data)
    }))
  }

  getUser(data: any) {
    return this.http.get(`${this.afterAuthUrl}${data}.json?auth=${this.currentToken}`).pipe(map((user: any) => {
      let formatedUser = {
        ...user,
        id: data
      }    
      this.currentUser.next(formatedUser) 
      return formatedUser
    }))
  }

  getUserAfterSignIn(data: any) {
    return this.authService.signInUser(data).pipe(exhaustMap(user => {
      this.currentToken = user.idToken
      return this.http.get<any>(`${this.afterAuthUrl}.json?auth=${this.currentToken}`)
    }))
  } 

  updateUser(user: any) {    
    return this.http.put<any>(`${this.afterAuthUrl}/${user.id}.json?auth=${this.currentToken}`, user)
  }

  getUserFavoriteMovies(data: any) {    
    return this.http.get<any>(this.listBaseUrl + data.linkId + this.apiKey).pipe(map(listData => {                        
      let wantedMoviesIds: any = []      
      listData.results.forEach((movie: any) => {
        if (data.user.favoriteMoviesIds) {
          data.user.favoriteMoviesIds.forEach((favoriteMovie:any) => {                    
            if (movie.id === favoriteMovie) {
              wantedMoviesIds.push(movie)
            }
          })
        }
      })            
      return wantedMoviesIds
    }))
  }
}
