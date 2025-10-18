import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = environment.apiUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1) {
    return this.http.get(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'es-ES',
        page: page.toString()
      }
    })
  }
}
