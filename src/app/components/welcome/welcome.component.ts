import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'welcome-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
