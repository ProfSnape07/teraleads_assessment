# Teraleads Assessment

This project is a full-stack web application consisting of a backend and a frontend.

## Project Structure

- `.venv/` - Python virtual environment for backend dependencies.
- `backend/` - Contains the backend server code and related files.
    - `app/` - FastAPI backend application code.
        - `main.py` - Application entry point.
        - `auth.py` - Handles user authentication and token logic.
        - `chatbot.py` - Logic for chatbot endpoints and responses.
        - `config.py` - Application configuration (loads environment variables).
        - `crud.py` - Database operations (CRUD logic).
        - `database.py` - SQLAlchemy database engine and session.
        - `dependencies.py` - Dependency injection for routes and services.
        - `models.py` - SQLAlchemy ORM models.
        - `schemas.py` - Pydantic models for data validation and serialization.
    - `alembic/` - Database migration tool (Alembic).
        - `versions/` - Migration scripts.
    - `.env` - Environment variables for backend config.
    - `alembic.ini` - Alembic configuration file.
    - `requirements.txt` - Python package dependencies.
- `frontend/` - Contains the frontend application built with React.
    - `node_modules/` - Node.js packages.
    - `public/` - Static files and assets.
    - `src/` - Source code for the frontend React app.
    - `eslint.config.js` - ESLint configuration file for the frontend.
    - `index.html` - The main HTML page for the frontend.
    - `package.json` and `package-lock.json` - Node.js package configuration and lock files.
    - `tailwind.config.js` - Tailwind CSS configuration.
    - `vite.config.js` - Configuration for the Vite development server and build tool.

## Getting Started

### Backend

1. Activate the Python virtual environment:
   ```bash
   source .venv/bin/activate
   ```

2. Install backend dependencies if not already installed:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Set up environment variables:
   ```
   Edit backend/.env with your settings i.e.
   
   1. SECRET_KEY
   2. ALGORITHM
   3. ACCESS_TOKEN_EXPIRE_MINUTES
   4. DATABASE_URL
   5. OPENAI_API_KEY
   
   ```
4. Run database migrations:
   ```bash
   cd backend
   ```
   ```bash
   alembic upgrade head
   ```

5. Run the backend server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   The backend server will usually start on http://localhost:8000

6. API Documentation:
    ```
    Swagger UI: http://localhost:8000/docs
    ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the browser at the address displayed (usually `http://localhost:3000`).

## Technologies Used

### Backend

- FastAPI 0.115.12
- SQLAlchemy for ORM
- Alembic for database migrations
- Pydantic for schema validation

### Frontend:

- React 19.1.0
- Vite for fast development/build tooling
- Linter: ESLint for frontend code quality
- Package Manager: npm

### Tooling

- ESLint for frontend code quality
- `.env` for managing environment variables
- pip and npm for dependency management

## Scripts Available

### Backend

- `python -m uvicorn app.main:app --reload` — Start backend development server with auto-reload.
- `alembic revision --autogenerate -m "message"` — Create a new database migration.
- `alembic upgrade head` — Apply all pending migrations.

### Frontend

- `npm run dev` — Start frontend development server.
- `npm run build` — Build production frontend files.

## Deployment

## Docker

### Backend

Create an `.env` file in the root directory of `backend` if it doesn't already exist. Make sure it contains necessary
environment variables like DATABASE_URL, SECRET_KEY, etc.

Build the Docker image for backend:

1. Inside the `/backend` directory, create a Dockerfile
2. Use an official Python runtime as a parent image
    ```
    FROM python:3.13-slim
    ```
3. Configure Python to disable .pyc file generation and enable real-time output
    ```
    ENV PYTHONDONTWRITEBYTECODE=1
    ENV PYTHONUNBUFFERED=1
   ```
4. Set the working directory
    ```
    WORKDIR /app
    ```
5. Copy the requirements.txt and install dependencies
    ```
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    ```
6. Copy the rest of the application files
    ```
    COPY . .
    ```
7. Start the app using uvicorn
    ```
    CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```

### Frontend

Inside the `/frontend` directory:

1. Use an official Node.js runtime as a parent image
    ```
    FROM node:22.16
    ```
2. Set the working directory
    ```
    WORKDIR /app
    ```
3. Copy the rest of the application files
    ```
    COPY . .
    ```
4. Install dependencies
    ```
   npm install && npm run build
   ```
5. Serve with NGINX
    ```
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
    ```
6. Configure NGINX
    ```
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    ```
7. Expose HTTP port and keep NGINX running in the foreground
    ```
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

## Build and run the Docker containers:

#### Based on need use any one of given methods:

1. Starts existing containers based on the current images. If the images are already built, it skips the build step.
    ```
    docker-compose up
    ```
2. From the root directory of the project, force rebuild the images before starting the containers
    ```
    docker-compose up --build
    ```

3. Stops and removes containers, networks, and default volumes created. Run this when you want to completely reset your
   environment, including clearing persistent storage
    ```
    docker-compose down -v
    docker-compose up --build
    ```

## Notes

- Ensure the backend server is running before using the frontend to allow API communications.
- Backend environment configuration is handled via the .env file in the backend/ directory.
