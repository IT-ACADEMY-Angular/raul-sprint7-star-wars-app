import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'starship', component: StarshipListComponent },
  { path: 'starship/:id', component: StarshipDetailComponent },
  { path: '', redirectTo: '/starship', pathMatch: 'full' }
];