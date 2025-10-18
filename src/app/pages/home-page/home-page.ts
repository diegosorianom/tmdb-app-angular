import { Component, signal } from '@angular/core';
import { TmdbService } from '../../services/tmdb-service/tmdb-service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  movies = signal<any[]>([])
  loading = signal(true)
  error = signal<string | null>(null)

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.tmdb.getPopularMovies().subscribe({
      next: (data: any) => {
        this.movies.set(data.results)
        this.loading.set(false)
      },
      error: (err) => {
        console.error(err)
        this.error.set('Error al cargar las películas')
        this.loading.set(false)
      }
    })
  }
}
