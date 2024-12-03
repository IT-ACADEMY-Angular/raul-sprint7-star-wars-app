import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'starship-films-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './starship-films.component.html',
  styleUrl: './starship-films.component.css'
})
export class StarshipFilmsComponent {
  @Input() filmUrls: string[] = [];
  films: any[] = [];

  constructor(private appService: AppService) { }

  ngOnChanges(): void {
    if (this.filmUrls?.length) {
      this.loadFilms();
    }
  }

  private loadFilms(): void {
    this.appService.getFilmsByUrls(this.filmUrls).subscribe(
      (films) => (this.films = films),
    );
  }

  getFilmImage(id: string): string {
    return this.appService.getFilmImageUrl(id);
  }
}
