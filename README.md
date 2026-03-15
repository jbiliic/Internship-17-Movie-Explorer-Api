# Movie Explorer

A full-stack web application for browsing a catalog of classic movies, filtering by genre, sorting, and managing a personal favourites list.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS 11, Prisma 6, TypeScript |
| Frontend | React 19, TypeScript, Vite, React Router v6, Axios |
| Database | PostgreSQL 16 (via Docker) |

---

## About the Project

Movie Explorer lets you:

- Browse a catalog of 30 classic movies (Inception, The Dark Knight, Pulp Fiction, and more)
- Search movies by name with a debounced input
- Filter movies by genre (Sci-Fi, Action, Crime, Drama, Animation, Horror, Adventure, Biography)
- Sort movies by name (A-Z), release year, or rating
- View a movie detail page (description, rating, year, genres, runtime, poster)
- Toggle favourites and browse a dedicated Favourites page

The backend exposes a REST API documented with Swagger at `http://localhost:3000/api`.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) and Docker Compose

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd dom17-nestJS
```

---

## 2. Environment Setup

Create a `.env` file inside the `be/` directory:

```bash
cp be/.env.example be/.env   # if the example exists, otherwise create manually
```

`be/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nest_project_db?schema=public"
```

> The database runs on host port **5433** (not the default 5432) as configured in `docker-compose.yml`.

---

## 3. Start the Database

```bash
cd be
docker-compose up -d
```

This starts a PostgreSQL 16 container named `nestjs_db` with the following defaults:

| Setting | Value |
|---------|-------|
| User | `postgres` |
| Password | `postgres` |
| Database | `nest_project_db` |
| Host port | `5433` |

---

## 4. Install Dependencies

Install dependencies for the backend and frontend separately:

```bash
# Backend
cd be && npm install

# Frontend
cd fe && npm install

# Root (concurrency utilities)
npm install
```

---

## 5. Run Database Migrations and Seed

From the `be/` directory:

```bash
# Apply migrations
npx prisma migrate deploy

# Seed the database with 30 movies and genres
npx prisma db seed
```

---

## 6. Run the Project

### Run both frontend and backend concurrently (from root):

```bash
npm run dev
```

The root script waits for the backend to be ready before starting the frontend.

### Or run them individually:

```bash
# Backend (port 3000)
cd be && npm run start:dev

# Frontend (port 5173)
cd fe && npm run dev
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/movie` | List movies; supports `?search=`, `?genre=`, `?sortBy=` |
| GET | `/genre` | List all genres |
| GET | `/favorite` | List all favourited movies |
| PUT | `/favorite/toggle/:movieId` | Toggle favourite status |

Full interactive API docs: `http://localhost:3000/api` (Swagger UI)

---

## Project Structure

```
dom17-nestJS/
├── be/                     # NestJS backend
│   ├── src/
│   │   ├── movie/          # Movie module (controller, service, DTOs)
│   │   ├── genre/          # Genre module
│   │   ├── favorite/       # Favorite module
│   │   └── prisma/         # Prisma service and module
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── seed.ts         # Seed script
│   │   └── migrations/     # SQL migrations
│   ├── docker-compose.yml
│   └── .env
├── fe/                     # React + Vite frontend
│   └── src/
│       ├── api/            # Axios client
│       ├── hooks/          # Data fetching hooks
│       ├── pages/          # Route pages
│       └── components/     # Shared UI components
└── package.json            # Root orchestrator (runs both apps)
```

---

## Database Schema

```
Movie       <--> Genre    (many-to-many via _MovieToGenre)
Movie        --> Favorite (one-to-one, optional)
```
