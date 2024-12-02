import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentUser$;
  constructor(private router: Router, private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/(modal:login)', { replaceUrl: true });
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/(modal:register)', { replaceUrl: true });
  }

  logout(): void {
    this.authService.logout();
  }
}
