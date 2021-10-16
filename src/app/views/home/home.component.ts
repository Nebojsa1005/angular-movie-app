import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DbData } from 'src/app/interfaces/db-data';
import { Movie } from 'src/app/interfaces/movie';
import { MovieLinks } from 'src/app/interfaces/movie-links';
import { User } from 'src/app/interfaces/user';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieLinksService } from 'src/app/services/movie-links.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  updatedUserSub?: Subscription
  getUserSub?: Subscription

  isCurrentlyLoggedIn: boolean = false
  links?: MovieLinks[]
  lsitId = new BehaviorSubject<any>('')  
  dbData$?: Observable<DbData[]>
  movieList: Movie[] = []
  currentUser?: User

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private movieLinkstService: MovieLinksService,
  ) { }

  
  ngOnInit(): void {
    this.links = this.movieLinkstService.links

    this.getUserSub = this.usersService.currentUser.subscribe((data => {
      this.currentUser = data     
    }))

    this.dbData$ = this.route.params.pipe(
      switchMap((param) => {
        return this.moviesService.getMoviesList(param.id)
      }))
      
  }

  ngOnDestroy() {
    this.updatedUserSub?.unsubscribe()
    this.getUserSub?.unsubscribe()
  }

  addToFavorites(id: number) { 
    if (!this.currentUser?.favoriteMoviesIds) {
      this.currentUser!.favoriteMoviesIds = [] 
    }    
    this.currentUser?.favoriteMoviesIds.push(id)
    this.updatedUserSub = this.usersService.updateUser(this.currentUser).subscribe()
    this.usersService.currentUser.next(this.currentUser)
  }

  removeFromFavorites(id: number) {
    // const index = this.currentUser?.favoriteMoviesIds?.indexOf(id)
    this.currentUser?.favoriteMoviesIds?.splice(this.currentUser?.favoriteMoviesIds?.indexOf(id), 1)
    this.updatedUserSub = this.usersService.updateUser(this.currentUser).subscribe()
    this.usersService.currentUser.next(this.currentUser)
  }

}
