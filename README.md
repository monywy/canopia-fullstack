# Prueba Técnica – Canopia (Fullstack)

Este repositorio contiene **backend (Node.js/Express/TypeScript)** y **frontend (Angular 19 + PrimeNG 19)** cumpliendo con:

- Autenticación JWT (expira a los **5 minutos**).
- Middleware de autorización para proteger el CRUD de productos.
- CRUD completo de productos con validaciones **backend + frontend**.
- Manejo de errores consistente (API + UI).
- Principios SOLID aplicados en capas (controllers, services, repositories, entities).
- Entregables solicitados: `README`, `env.example`, instrucciones claras.

## Estructura

```
/backend
/frontend
```

### Requisitos previos

- Node.js v18+
- MySQL 8+
- Angular CLI v19 (`npm i -g @angular/cli`)

### Puesta en marcha

1) **Base de datos**  
   - Crear BD `BDPruebaTecnicaCanopia` y tablas con `backend/db/schema.sql`.
2) **Backend**  
   ```bash
   cd backend
   cp .env.example .env
   # Edita credenciales
   npm install
   npm run dev
   ```
   - Endpoints: ver `backend/README.md`.
3) **Frontend**  
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

### Usuarios de prueba

Al arrancar, si la tabla `users` está vacía, se **siembra** un admin:  
`admin / Admin123!`

### Commits sugeridos

Usa mensajes descriptivos (convencional commits), por ejemplo:
- `feat(auth): implement login endpoint with 5m JWT`
- `feat(products): add zod validation and repository layer`
- `feat(fe): add login screen and CRUD with guard`
- `docs: add setup instructions and env.example`

¡Éxitos!
