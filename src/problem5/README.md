# Code Challenge API Project

This project is a Node.js API built with Express and TypeScript, using PostgreSQL as the database. The application is containerized using Docker for easy deployment and development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
src/problem5/
├── docker-compose.yml    # Docker compose configuration
├── Dockerfile           # Docker build configuration
├── index.ts            # Main application entry point
├── init.sql           # Database initialization script
├── package.json       # Node.js dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TanNH863/NguyenHuuTan.git
   cd NguyenHuuTan/src/problem5
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will start the application using `ts-node-dev` which automatically restarts the server when code changes are detected.

### Production Mode with Docker (recommended)

1. Build and start the containers:

   ```bash
   docker compose up -d
   ```

   This will:

   - Pull images from Dockerhub
   - Start the PostgreSQL database
   - Start the API server

2. The API will be available at:

   ```
   http://localhost:3063
   ```

3. To stop the containers:
   ```bash
   docker compose down
   ```

## Environment Variables

The application uses the following environment variables (already configured in docker-compose.yml):

- `PORT`: Application port (default: 3063)
- `NODE_ENV`: Environment mode (production/development)
- `DATABASE_URL`: PostgreSQL connection string
- `POSTGRES_HOST`: Database host
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `POSTGRES_PORT`: Database port

## Scripts

- `npm run build` - Builds the TypeScript code
- `npm run start` - Runs the built application
- `npm run dev` - Runs the application in development mode with hot-reloading

## Database

Create the database initialized in init.sql using the following command:

```bash
docker cp init.sql code_challenge_db:/tmp/script.sql
docker exec -it code_challenge_db psql -U postgres -d code_challenge -f /tmp/script.sql
```

Populate the database using curl commands defined in README.txt.

## API Testing

Use defined curl commands or any API testing tools with given request body in README.txt.
