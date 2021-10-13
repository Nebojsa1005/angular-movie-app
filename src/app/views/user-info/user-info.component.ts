import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MovieLinks } from 'src/app/interfaces/movie-links';
import { User } from 'src/app/interfaces/user';
import { MovieLinksService } from 'src/app/services/movie-links.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser?: User
  wantedMovies?: any = []
  links?: MovieLinks[]
  selectedCategory: boolean = false

  updatedUserSub?: Subscription

  constructor(
    private usersService: UsersService,
    private movieLinksService: MovieLinksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.currentUser.pipe(first()).subscribe(data => {
      if (!data) {
        this.router.navigate(['sign-in'])
      }
      this.currentUser = data
    })

    this.links = this.movieLinksService.links    

  }

  ngOnDestroy() {
    this.updatedUserSub?.unsubscribe()
  }

  getUserFavoriteMovies(linkId: string) {    
    this.selectedCategory = true  
    this.usersService.getUserFavoriteMovies({linkId, user: this.currentUser}).subscribe((data:any) => {  
      this.wantedMovies = data
      console.log(this.wantedMovies);
      
    })
  }

  goToMovie(id: string) {
    this.router.navigate([`/movie`, id])
  }

  removeFromFavorites(id: number) {
    this.currentUser?.favoriteMoviesIds.splice(this.currentUser?.favoriteMoviesIds.indexOf(id), 1)

    this.wantedMovies.filter(((movie: any) => movie.id === id))

    let wantedMovie 
    this.wantedMovies.forEach((movie:any) => {
      if (movie.id === id) {
        wantedMovie = movie
      }
    })
    this.wantedMovies.splice(this.wantedMovies.indexOf(wantedMovie), 1)

    this.updatedUserSub = this.usersService.updateUser(this.currentUser).subscribe()
    this.usersService.currentUser.next(this.currentUser) 
    
  }

}
