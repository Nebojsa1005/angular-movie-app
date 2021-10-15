import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails$?: Observable<Movie[]>

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id
    this.movieDetails$ = this.moviesService.getDetails(id)
  }
}
