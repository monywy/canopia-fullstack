# Canopia Frontend (Angular 19 + PrimeNG 19)

Simple UI to login and perform CRUD on products, validating fields in forms.

## Quick Start

```bash
npm install
npm start
```

Default backend URL is `http://localhost:4000/api` (see `src/app/shared/environment.ts`).

## Screens

- Login
- Product list with create/edit/delete dialog

## Notes

- Uses standalone components (Angular 15+) and a simple Http interceptor for JWT.
- PrimeNG is included in dependencies; the sample uses basic HTML for lean demo,
  but you can switch templates to PrimeNG components easily.
