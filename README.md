

# Paytm Clone Project (Monorepo)

Welcome to the **Paytm Clone Project** built using a monorepo architecture! This project emulates key features of a banking and peer-to-peer (P2P) payment system using **Next.js**, **Express**, **Prisma**, **Postgres**, and **NextAuth.js**.

Watch the detailed explanation of this project on [YouTube](https://youtu.be/NZJ745t-rPI).

---

## Features

- **Monorepo Structure**: Uses TurboRepo to manage multiple applications (Next.js for frontend, Express for backend) and shared packages like Prisma for database management.
  
- **P2P Transfers**: Secure peer-to-peer payment transfers between users, implementing ACID-compliant transactions.

- **Bank Transfers**: Users can initiate secure bank transfers, with transaction locking to maintain data integrity.

- **Webhook Server**: Listens for real-time updates (e.g., balance changes) and external events, ensuring consistent and up-to-date data.

- **Balance Locking**: Utilizes database locking mechanisms during transactions to prevent double-spending and ensure correct balances.

- **ACID Compliance**: Ensures atomicity, consistency, isolation, and durability across all financial operations.

- **CI/CD Pipeline**: Dockerized services, integrated with a GitHub Actions workflow to automate deployment to AWS.

---

## Prerequisites

- **Node.js** (v14 or later)
- **Docker** (for containerized deployment)
- **PostgreSQL** (Database)

---

## Getting Started

### 1. Install Dependencies

In the root of the project, run the following command to install all dependencies for the entire monorepo:

```bash
npm install
```

### 2. Database Setup

1. Navigate to the `packages/db` folder and create a `.env` file.
   
   ```bash
   cd packages/db
   touch .env
   ```

2. Add the following environment variable to the `.env` file:

   ```env
   DATABASE_URL="your_database_url_here"
   ```

3. Run the database migrations and Prisma client generation:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### 3. Frontend Setup (Next.js)

1. Navigate to the `apps/user-app` folder and create a `.env` file.

   ```bash
   cd apps/user-app
   touch .env
   ```

2. Add the following environment variables:

   ```env
   JWT_SECRET="your_jwt_secret_here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

### 4. Running the Project

Once all the environment variables are set up and migrations are done, return to the root folder and run:

```bash
npm run dev
```

This will spin up both the frontend (Next.js) and the backend (Express) in development mode using TurboRepo.

### 5. Docker Setup (Optional)

If you want to run the project in Docker containers (e.g., for production or testing), make sure Docker is installed, then use the following commands:

```bash
docker-compose up --build
```

This will spin up all the services (frontend, backend, and the database) in Docker containers.

---

## Environment Variables Summary

### For `packages/db`:
- `DATABASE_URL`: The connection string to your Postgres database.

### For `apps/user-app`:
- `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWT).
- `NEXTAUTH_URL`: The base URL for NextAuth authentication callbacks (e.g., `http://localhost:3000` for local development).

---

## Features Recap

- **Monorepo Architecture**: Efficient code management with shared packages using TurboRepo.
- **ACID-Compliant Transactions**: Secure and atomic transfers.
- **P2P and Bank Transfers**: Two types of payment mechanisms (P2P and bank transfers) are implemented with secure data integrity.
- **Real-Time Webhooks**: Webhook server to handle balance updates and external triggers.
- **Dockerized**: Easily scalable and containerized with Docker for seamless production deployment.
- **CI/CD Pipeline**: Continuous integration and deployment pipeline using GitHub Actions and Docker to AWS.

---

## License

This project is licensed under the MIT License.
