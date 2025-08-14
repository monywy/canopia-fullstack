import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/pages/login.component';
import { ProductsComponent } from './app/pages/products.component';
import { authInterceptor } from './app/shared/auth.interceptor';
import { AuthGuard } from './app/shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'products' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Todos los servicios ya usan providedIn: 'root', no se necesita agregar nada más
  ]
}).catch(err => console.error(err));
