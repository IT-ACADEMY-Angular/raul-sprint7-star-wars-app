import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Validations } from '../validations/validations';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  firstName: string = '';
  secondName: string = '';
  email: string = '';
  password: string = '';
  previousUrl: string | null = null;
  errorMessage: string | null = null;
  firstNameError: string | null = null;
  secondNameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  async onSubmit(): Promise<void> {
    this.clearErrors();

    this.firstNameError = Validations.validateFirstName(this.firstName);
    if (this.firstNameError) return;

    this.secondNameError = Validations.validateSecondName(this.secondName);
    if (this.secondNameError) return;

    this.emailError = Validations.validateEmail(this.email);
    if (this.emailError) return;

    this.passwordError = Validations.validatePassword(this.password);
    if (this.passwordError) return;

    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      if (error.message === 'Este email ya está registrado.') {
        this.emailError = error.message;
      } else {
        this.errorMessage = error.message;
      }
    }
  }

  async checkEmailAvailability(): Promise<void> {

    if (this.emailError !== 'Este email ya está registrado.') {
      this.emailError = null;
    }

    if (!Validations.validateEmail(this.email)) {
      if (this.emailError !== 'Este email ya está registrado.') {
        this.emailError = 'Por favor, introduce un email válido.';
      }
      return;
    }

    try {
      await this.authService.checkEmailExists(this.email);
    } catch (error: any) {
      if (error.message === 'Este email ya está registrado.') {
        this.emailError = error.message;
      } else {
        this.emailError = 'Ocurrió un error al validar el correo.';
      }
    }
  }

  private clearErrors(): void {
    this.firstNameError = null;
    this.secondNameError = null;
    this.emailError = null;
    this.passwordError = null;
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.previousUrl = this.router.url.split('(modal')[0];
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  closeModal(): void {
    this.router.navigateByUrl(this.previousUrl || '/');
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/(modal:login)', { replaceUrl: true });
  }
}