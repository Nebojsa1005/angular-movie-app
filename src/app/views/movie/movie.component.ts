import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails: any = null

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.currentUser.subscribe(data => {
      if (!data) {
        this.router.navigate(['sign-up'])
      } else {
        const id = this.route.snapshot.params.id
        this.moviesService.getDetails(id).subscribe(data => {
          console.log(data);
          
          this.movieDetails = data
        })
      }
    })
  }
}
