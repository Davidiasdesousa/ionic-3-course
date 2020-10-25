import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private ApiBaseUrl: string = "https://api.themoviedb.org/3";
  private ApiKey: string = "ca25aba5c6835bb959c5791ad1b59965"

  constructor(public http: HttpClient) {
  }
  getLatestMovies() {
    return this.http.get(`${this.ApiBaseUrl}/movie/latest`, {
      params: {
        api_key: this.ApiKey
      }
    })
  }

  getPopular(page = 1) {
    return this.http.get(`${this.ApiBaseUrl}/movie/popular?page=${page}`, {
      params: {
        api_key: this.ApiKey
      }
    })
  }
  getMovieDetail(filmeId) {
    return this.http.get(`${this.ApiBaseUrl}/movie/${filmeId}`, {
      params: {
        api_key: this.ApiKey
      }
    })
  }
}
