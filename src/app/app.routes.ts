import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'starship', component: StarshipListComponent, canActivate: [AuthGuard] },
  { path: 'starship/:id', component: StarshipDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, outlet: 'modal' },
  { path: 'register', component: RegisterComponent, outlet: 'modal' }
];