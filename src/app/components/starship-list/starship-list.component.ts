import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'starship-list-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, InfiniteScrollModule],
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.css'],
  providers: [AppService],
})
export class StarshipListComponent implements OnInit {
  starships: any[] = [];
  nextUrl: string | null = null;
  loading = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(url: string | null | undefined = this.appService['apiUrl']): void {
    if (this.loading || !url) return;
    this.loading = true;

    this.appService.getStarships(url).subscribe((data) => {
      this.starships = [...this.starships, ...data.results];
      this.nextUrl = data.next;
      this.loading = false;
    });
  }

  onScroll(): void {
    this.loadStarships(this.nextUrl);
  }
}
