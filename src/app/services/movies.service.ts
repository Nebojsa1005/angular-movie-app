import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  listBaseUrl: string = 'https://api.themoviedb.org/4/list/'
  apiKey: string = '?api_key=0f0f45efef6bdd14d1de380408bd937d'
  movieDetailsUrl = `https://api.themoviedb.org/3/movie/`

  constructor(
    private http: HttpClient,
  ) { }

  getMoviesList(id: string) {    
    return this.http.get<any>(this.listBaseUrl + id + this.apiKey).pipe(toArray())
  }

  getDetails(id: string) {
    return this.http.get<any>(`${this.movieDetailsUrl}${id}${this.apiKey}`).pipe(map(data => [{...data}]))
  }
}


