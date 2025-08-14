import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <div class="header">
        <h2>Canopia – CRUD de Productos</h2>
        <button class="link" (click)="logout()">Cerrar sesión</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigateByUrl('/login');
  }
}
