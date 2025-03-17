# React-Docker-Template with FastAPI

This repository provides a basic template for a React web application built with TypeScript and React Bootstrap that talks to a FastAPI backend. The backend uses JWT-based role authentication (only required for protected endpoints) and connects to a PostgreSQL database. pgAdmin is provided for database management, and configuration is handled via a .env file.

## Structure

- **client/**: Contains the React application.
- **server/**: Contains the FastAPI application.
- **docker-compose.yml**: Orchestrates the client, server, PostgreSQL, and pgAdmin containers.

## Getting Started

1. Clone the repository.
2. Update `server/.env` if necessary.
3. Run `docker-compose up --build` to start all services.
4. Access the React app at `http://localhost:3000`, the API at `http://localhost:8000`, and pgAdmin at `http://localhost:5050`.

## API Endpoints

- **Public endpoints** (no authentication required): `/api/public/...`
- **Auth endpoints** (register/login): `/api/auth/...`
- **Protected endpoints** (JWT required): `/api/protected/...`

Let me know if you’d like to adjust or add more features!
