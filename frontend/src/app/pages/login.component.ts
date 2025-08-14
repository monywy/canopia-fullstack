import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../shared/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card" style="max-width:420px;margin:3rem auto;">
    <h3>Iniciar sesión</h3>
    <form (ngSubmit)="submit()" #f="ngForm">
      <label>Usuario o email</label>
      <input name="usernameOrEmail" [(ngModel)]="usernameOrEmail" required minlength="3"/>
      <div *ngIf="f.submitted && !usernameOrEmail" style="color:#ff6b6b;margin:.25rem 0">Requerido.</div>

      <label style="margin-top:.75rem; display:block">Contraseña</label>
      <input type="password" name="password" [(ngModel)]="password" required minlength="6"/>
      <div *ngIf="f.submitted && !password" style="color:#ff6b6b;margin:.25rem 0">Requerido.</div>

      <div style="margin-top:1rem; display:flex; gap:.5rem; align-items:center;">
        <button class="button-primary" [disabled]="f.invalid">Entrar</button>
        <span *ngIf="error" style="color:#ff6b6b;">{{error}}</span>
      </div>
    </form>
  </div>
  `
})
export class LoginComponent {
  usernameOrEmail = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  submit() {
    this.error = '';
    this.auth.login(this.usernameOrEmail, this.password).subscribe({
      next: (res) => {
        // Solo usar localStorage si estamos en el navegador
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        this.error = err?.error?.error || 'Credenciales inválidas';
      }
    });
  }
}
