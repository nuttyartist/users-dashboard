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
  styles: [
    `
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro,
          sans-serif;
      }

      header {
        text-align: center;
        margin-bottom: 40px;
      }

      h1 {
        color: #2c3e50;
        font-size: 2.5em;
        margin: 0;
        padding: 20px 0;
        border-bottom: 3px solid #3498db;
      }

      a {
        text-decoration: none;
      }
    `,
  ],
})
export class AppComponent {
  title = 'users-dashboard';
}
