import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
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
  getMovieListSub?: Subscription
  signInUser?: Subscription
  updatedUserSub?: Subscription

  links?: MovieLinks[]
  dbData?: DbData  
  movieList: Movie[] = []
  currentUser?: any

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private movieLinkstService: MovieLinksService,
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.usersService.currentUser.pipe(first()).subscribe(data => {     
      if(!data) {
        this.router.navigate(['/sign-in'])
      } else {
        this.links = this.movieLinkstService.links

        const userId = this.route.snapshot.queryParamMap.get('userId')
        this.usersService.getUser(userId).subscribe(data => {
          this.currentUser = data        
        })
    
        this.route.params.subscribe(param => {
          this.getMovieListSub = this.moviesService.getMoviesList(param.id).subscribe(data => {
            this.dbData = data 
            this.movieList = data.results           
          })
        })
      }
    })
  }

  ngOnDestroy() {
    this.getMovieListSub?.unsubscribe()
    this.updatedUserSub?.unsubscribe()
    this.signInUser?.unsubscribe()
  }

  goToMovie(id: number) {
    this.router.navigate([`/movie`, id])
  }

  addToFavorites(id: number) { 
    if (!this.currentUser.favoriteMoviesIds) {
      this.currentUser['favoriteMoviesIds'] = [] 
    }
    console.log(this.currentUser);
    
    this.currentUser?.favoriteMoviesIds.push(id)
    this.updatedUserSub = this.usersService.updateUser(this.currentUser).subscribe()
    this.usersService.currentUser.next(this.currentUser)
  }

  removeFromFavorites(id: number) {
    const index = this.currentUser?.favoriteMoviesIds?.indexOf(id)
    this.currentUser.favoriteMoviesIds?.splice(index, 1)
    this.updatedUserSub = this.usersService.updateUser(this.currentUser).subscribe()
    this.usersService.currentUser.next(this.currentUser)
  }

}
