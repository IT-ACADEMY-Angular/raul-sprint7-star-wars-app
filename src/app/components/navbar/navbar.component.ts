import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'navbar-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  navigateToLogin(): void {
    this.router.navigateByUrl('/(modal:login)', { replaceUrl: true });
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/(modal:register)', { replaceUrl: true });
  }
}
