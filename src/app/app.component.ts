import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
  <main>
  <a [routerLink]="['/']">
    <header>
      <h1>Users Dashboard</h1>
    </header>
  </a> 
    <section>
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users-dashboard';
}
