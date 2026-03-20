# <img src="https://i.ibb.co/v6WbSjWg/Tracr-logo.png" width="60" height="60"/> Tracr App

Tracr is a mobile application that transforms real-world movement into visual designs. Users are given a **daily challenge shape** (or can select one from a library) and attempt to recreate it by physically walking or running the route.

Using GPS tracking, the app records the user’s path and compares it to the chosen shape, evaluating how closely the route matches the intended design.

---
## 🚀 Features

* 📍 **GPS Route Tracking** – Record real-time movement using location services
* 🎯 **Daily Challenges** – Try to recreate a new shape every day
* 🧩 **Shape Library** – Choose from a collection of predefined designs
* 📊 **Route Evaluation** – Compare your path to the target shape
* 🗺️ **Map Visualisation** – View routes directly on an interactive map
* 🏆 **Stats & Leaderboard** – Track progress and compete with others
* 🔐 **Authentication** – Secure sign up and login system

---

## 🛠️ Tech Stack

### Frontend

* **React Native** – Cross-platform mobile development
* **Expo** – Simplified development and deployment
* **Expo Router** – Navigation and routing

### Backend

* **Express.js** – REST API server
* **PostgreSQL** – Database for users, routes, and shapes

### Maps & Location

* **Expo Location** – Access GPS data
* **React Native Maps** – Render maps and routes

### Image & Shape Processing

* Grid matching algorithms 

---

## 🧠 Key Technical Challenges

* Converting GPS coordinates (lat/long) into comparable shapes
* Normalising routes for accurate comparison (scale, rotation, position)
* Designing a fair and meaningful shape-matching algorithm
* Managing real-time location updates efficiently
* Creating a smooth and intuitive mobile user experience

---

# 🚀 Tracr Backend

**Tracr Backend** is a RESTful API that powers the Tracr application, a platform for tracking user expeditions and transforming real-world movement into structured geospatial data and competitive challenges.

Built with **Node.js**, **Express**, and **PostgreSQL + PostGIS**, this backend handles everything from user authentication to spatial route tracking and leaderboards.

---

## 🛠️ Tech Stack

| Category    | Technology                   |
| ----------- | ---------------------------- |
| Runtime     | Node.js                      |
| Framework   | Express.js                   |
| Database    | PostgreSQL + PostGIS         |
| Querying    | pg, pg-format                |
| Validation  | Joi (via express-validation) |
| Testing     | Jest, Supertest              |
| Linting     | ESLint                       |
| Environment | dotenv                       |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/S-Kirwan/Tracr-backend.git
cd tracr-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create your environment file:

```bash
PGDATABASE= <your-database-name>
DATABASE_URL= <your-database-url>
```

Update it with your configuration (database names, credentials, urls etc..).

---

## 🧱 Setup

### 1. Create Databases

Ensure PostgreSQL is running and create your development/test databases.

### 2. Enable PostGIS Extension

```sql
CREATE EXTENSION postgis;
```

### 3. Seed the Database

```bash
npm run seed-dev
```

For production:

```bash
npm run seed-prod
```

---

## ▶️ Usage

Start the development server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

📍 API will be available at:

```
http://localhost:3000
```

(or your configured port)

---

## 🧪 Testing

Run tests:

```bash
npm test
```

---

## 🧹 Linting

Run linter:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

---

## 📡 API Endpoints

| Resource     | Endpoint            | Description                    |
| ------------ | ------------------- | ------------------------------ |
| Users        | `/api/users`        | Signup & login                 |
| Shapes       | `/api/shapes`       | Fetch shapes & daily challenge |
| Expeditions  | `/api/expeditions`  | Create & fetch expeditions     |
| Leaderboards | `/api/leaderboards` | View rankings                  |

👉 See `/routes` directory for detailed endpoint definitions.

---

## 📬 Contact

For questions or collaboration, feel free to reach out or open an issue.

---

⭐ If you find this project useful, consider giving it a star!
