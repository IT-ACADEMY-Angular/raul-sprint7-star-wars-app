import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'starship-list-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.css'],
  providers: [AppService],
})
export class StarshipListComponent implements OnInit {
  starships: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(): void {
    this.appService.getStarships().subscribe((data) => {
      this.starships = data.results;
    });
  }
}