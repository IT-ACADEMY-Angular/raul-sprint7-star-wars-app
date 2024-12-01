import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  previousUrl: string | null = null;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
    });
  }

  onSubmit(): void {
    //lógica de login y authservice
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

  navigateToRegister(): void {
    this.router.navigateByUrl('/(modal:register)', { replaceUrl: true });
  }

}
