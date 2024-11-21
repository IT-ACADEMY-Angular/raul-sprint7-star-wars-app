import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'star-wars-app';
}
