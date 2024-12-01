import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/starship', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'starship', component: StarshipListComponent },
  { path: 'starship/:id', component: StarshipDetailComponent },
  { path: 'login', component: LoginComponent, outlet: 'modal' },
  { path: 'register', component: RegisterComponent, outlet: 'modal' }
];