import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb-service/tmdb-service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList {
  private tmdbService = inject(TmdbService);
  
  movies = signal<any[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadMovies();
  }

  loadMovies() {
    this.tmdbService.getPopularMovies().subscribe({
      next: (response: any) => {
        this.movies.set(response.results);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading.set(false);
      }
    });
  }
}
