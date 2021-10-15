import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieLinks } from 'src/app/interfaces/movie-links';
import { User } from 'src/app/interfaces/user';
import { MovieLinksService } from 'src/app/services/movie-links.service';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';

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
  currentUserSub?: Subscription

  constructor(
    private usersService: UsersService,
    private movieLinksService: MovieLinksService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.currentUserSub = this.usersService.currentUser.subscribe(data => {
      this.currentUser = data
    })

    this.links = this.movieLinksService.links    

  }

  ngOnDestroy() {
    this.updatedUserSub?.unsubscribe()
    this.currentUserSub?.unsubscribe()
  }

  back() {
    this.location.back()
  }

  getUserFavoriteMovies(linkId: string) {    
    this.selectedCategory = true  
    this.usersService.getUserFavoriteMovies({linkId, user: this.currentUser}).subscribe((data:any) => {  
      this.wantedMovies = data     
    })
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
