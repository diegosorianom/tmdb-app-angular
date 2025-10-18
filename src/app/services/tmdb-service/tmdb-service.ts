import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private functionUrl = '/.netlify/functions/tmdb'; // endpoint de tu Netlify Function

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1) {
    return this.http.get(this.functionUrl, {
      params: {
        path: '/movie/popular',
        language: 'es-ES',
        page: page.toString()
      }
    });
  }
}
