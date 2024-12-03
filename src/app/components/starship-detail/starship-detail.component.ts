import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StarshipFilmsComponent } from '../starship-films/starship-films.component';
import { StarshipPilotsComponent } from '../starship-pilots/starship-pilots.component';

@Component({
  selector: 'starship-detail-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StarshipFilmsComponent, StarshipPilotsComponent],
  templateUrl: './starship-detail.component.html',
  styleUrl: './starship-detail.component.css'
})
export class StarshipDetailComponent implements OnInit {
  starship: any;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStarshipDetails(id);
    }
  }

  loadStarshipDetails(id: string): void {
    this.appService.getStarshipById(id).subscribe((data) => {
      this.starship = data;
    });
  }

  getStarshipImage(): string {
    const id = this.appService.extractIdFromUrl(this.starship.url);
    return this.appService.getStarshipImageUrl(id);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }
}
