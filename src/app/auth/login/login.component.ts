import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Validations } from '../validations/validations';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  previousUrl: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event) => {
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = null;
    const emailError = Validations.validateEmail(this.email);
    const passwordError = Validations.validatePassword(this.password);

    if (emailError || passwordError) {
      this.errorMessage = 'Invalid email or password.';
      return;
    }

    try {
      await this.authService.login(this.email, this.password);

      const returnUrl = localStorage.getItem('returnUrl') || '/home';
      localStorage.removeItem('returnUrl');

      this.router.navigate([{ outlets: { modal: null } }]).then(() => {
        this.router.navigateByUrl(returnUrl);
      });
    } catch (error: any) {
      this.errorMessage = 'Invalid email or password.';
    }
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/(modal:register)', { replaceUrl: true });
  }

}
