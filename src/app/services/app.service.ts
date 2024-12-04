import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://swapi.dev/api/starships';
  private imageBaseUrl = 'https://starwars-visualguide.com/assets/img/';

  constructor(private http: HttpClient) { }

  getStarships(url: string = this.apiUrl): Observable<any> {
    return this.http.get(url).pipe(
      map((data: any) => ({
        ...data,
        results: data.results.map((starship: any) => ({
          ...starship,
          id: this.extractIdFromUrl(starship.url),
        })),
      }))
    );
  }

  getStarshipById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }

  extractIdFromUrl(url: string): string {
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1];
  }

  getStarshipImageUrl(id: string): string {
    return `${this.imageBaseUrl}starships/${id}.jpg`;
  }

  getFilmsByUrls(urls: string[]): Observable<any[]> {
    return this.getEntitiesByUrls(urls, 'films').pipe(
      map((films) =>
        films.map((film) => ({
          ...film,
          episode: `Episode ${film.episode_id}`
        }))
      )
    );
  }

  getPilotsByUrls(urls: string[]): Observable<any[]> {
    return this.getEntitiesByUrls(urls, 'characters');
  }

  private getEntitiesByUrls(urls: string[], type: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const requests = urls.map((url) => this.http.get(url));
      Promise.all(requests.map((req) => req.toPromise()))
        .then((entities) => {
          observer.next(
            entities.map((entity: any) => ({
              ...entity,
              id: this.extractIdFromUrl(entity.url),
            }))
          );
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getFilmImageUrl(id: string): string {
    return `${this.imageBaseUrl}films/${id}.jpg`;
  }

  getPilotImageUrl(id: string): string {
    return `${this.imageBaseUrl}characters/${id}.jpg`;
  }

}
