import { Injectable } from '@angular/core';
import { MovieLinks } from '../interfaces/movie-links';

@Injectable({
  providedIn: 'root'
})
export class MovieLinksService {

  constructor() { }
  links: MovieLinks[] = [
    {
      id: '1',
      name: 'Marvel Univers'
    },
    {
      id: '3',
      name: 'DC Comics'
    },
    {
      id: '5',
      name: 'The Avengers'
    },
    {
      id: '6',
      name: 'Déjà vus'
    },
    {
      id: '7',
      name: 'Grosing films'
    }
  ]
}
