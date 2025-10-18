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
  searchHistory = signal<string[]>([])

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.loadSearchHistory()
  }

  onSearch(term: string) {
    if (!term) {
      console.log('Búsqueda vacía')
      this.movies.set([])
      return
    }

    console.log('Buscando peliculas:', term)

    this.addToHistory(term.trim())

    this.tmdb.searchMovies(term).subscribe({
      next: (response) => {
        console.log('Resultados:', response.results)
        this.movies.set(response.results)
      },
      error: (error) => console.error('Error en la búsqueda:', error)
    })
  }

  searchFromHistory(searchTerm: string) {
    this.onSearch(searchTerm)
  }

  private addToHistory(searchTerm: string) {
    const currentHistory = this.searchHistory()

    const filteredHistory = currentHistory.filter(term => 
      term.toLowerCase() !== searchTerm.toLowerCase()
    )

    const newHistory = [searchTerm, ...filteredHistory].slice(0, 8)

    this.searchHistory.set(newHistory)
    this.saveSearchHistory(newHistory)
  }

  private loadSearchHistory() {
    const savedHistory = localStorage.getItem('movieSearchHistory')
    if (savedHistory) {
      try {
        this.searchHistory.set(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Error cargando historial: ', e)
        this.searchHistory.set([])
      }
    }
  }

  private saveSearchHistory(history: string[]) {
    try {
      localStorage.setItem('movieSearchHistory', JSON.stringify(history))
    } catch (e) {
      console.error('Error guardando historial: ', e)
    }
  }

  getMovieYear(releaseDate: string | null): string {
    if (!releaseDate) return ''
    return releaseDate.substring(0, 4)
  }
}
