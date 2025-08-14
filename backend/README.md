# Canopia Backend (Node.js + Express + TypeScript)

Implements JWT auth (5 minutes expiry) and a protected CRUD for products with validation and SOLID-ish structure.

## Quick Start

```bash
cp .env.example .env
# Edit DB credentials
npm install
npm run dev
```

## Database

Name required: **BDPruebaTecnicaCanopia**.

You can use the provided `db/schema.sql` to create tables (users, categories, products).

Default admin seed on first run if `users` is empty:
- username: `admin`
- email: `admin@example.com`
- password: `Admin123!`

> Password is hashed with bcrypt when inserted.

## Scripts
- `npm run dev` – start in dev mode
- `npm run build` – compile TS to JS
- `npm start` – run compiled app

## API

- `POST /api/auth/login` – body: `{ usernameOrEmail, password }`, returns `{ token, user }`
- `GET /api/products` – list products (protected)
- `POST /api/products` – create product (protected)
- `PUT /api/products/:id` – update product (protected)
- `DELETE /api/products/:id` – soft delete by `status=0` (protected)

Auth: `Authorization: Bearer <token>`.
