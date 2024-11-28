import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://swapi.dev/api/starships';
  private imageBaseUrl = 'https://starwars-visualguide.com/assets/img/starships/';

  constructor(private http: HttpClient) { }

  getStarships(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStarshipById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }

  extractIdFromUrl(url: string): string {
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1];
  }

  getStarshipImageUrl(id: string): string {
    return `${this.imageBaseUrl}${id}.jpg`;
  }
}
