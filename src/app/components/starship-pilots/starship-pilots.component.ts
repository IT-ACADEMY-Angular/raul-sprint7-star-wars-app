import { Component, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'starship-pilots-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './starship-pilots.component.html',
  styleUrl: './starship-pilots.component.css'
})
export class StarshipPilotsComponent {
  @Input() pilotUrls: string[] = [];
  pilots: any[] = [];

  constructor(private appService: AppService) { }

  ngOnChanges(): void {
    if (this.pilotUrls?.length) {
      this.loadPilots();
    }
  }

  private loadPilots(): void {
    this.appService.getPilotsByUrls(this.pilotUrls).subscribe(
      (pilots) => (this.pilots = pilots),
    );
  }

  getPilotImage(id: string): string {
    return this.appService.getPilotImageUrl(id);
  }
}
