import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },         // Ruta para Home
  { path: 'starship', component: StarshipListComponent }, // Ruta para Starship
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Ruta predeterminada
];