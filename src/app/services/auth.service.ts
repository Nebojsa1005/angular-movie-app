import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser?: User
  apiKey: string = '?key=AIzaSyAPDaLHJ8BSmRfpqEPYDviEh0TqVIJJ2pM'
  signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
  signInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'

  constructor(
    private http: HttpClient
  ) { }

  signUpUser(user: any) {
    return this.http.post<any>(this.signUpUrl + this.apiKey, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
  }


  signInUser(data:any) {
    return this.http.post<any>(this.signInUrl + this.apiKey, {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    })
  }
}
