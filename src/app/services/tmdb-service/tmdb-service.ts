import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private functionUrl = '/.netlify/functions/tmdb'; // endpoint de tu Netlify Function

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.functionUrl, {
      params: {
        path: '/movie/popular',
        language: 'es-ES',
        page: page.toString()
      }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.functionUrl, {
      params: {
        path: '/search/movie',
        language: 'es-ES',
        page: page.toString(),
        query: query
      }
    });
  }
}
