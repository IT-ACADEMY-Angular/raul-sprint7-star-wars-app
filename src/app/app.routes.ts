import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'starship', component: StarshipListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
