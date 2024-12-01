import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  firstName: string = '';
  secondName: string = '';
  email: string = '';
  password: string = '';
  previousUrl: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    //logica para el registro y authservice !!
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
