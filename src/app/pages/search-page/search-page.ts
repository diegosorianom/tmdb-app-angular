import { Component, signal } from '@angular/core';
import { ReturnComponent } from "../../components/return-component/return-component";
import { SearchBar } from "../../components/search-bar/search-bar";
import { Movie } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb-service/tmdb-service';

@Component({
  selector: 'app-search-page',
  imports: [ReturnComponent, SearchBar],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {
  movies = signal<Movie[]>([])

  constructor(private tmdb: TmdbService) {}

  onSearch(term: string) {
    if (!term) {
      console.log('Búsqueda vacía')
      this.movies.set([])
      return
    }

    console.log('Buscando peliculas:', term)

    this.tmdb.searchMovies(term).subscribe({
      next: (response) => {
        console.log('Resultados:', response.results)
        this.movies.set(response.results)
      },
      error: (error) => console.error('Error en la búsqueda:', error)
    })
  }

  getMovieYear(releaseDate: string | null): string {
    if (!releaseDate) return ''
    return releaseDate.substring(0, 4)
  }
}
