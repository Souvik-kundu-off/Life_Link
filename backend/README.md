# LifeLink Backend

This is the backend API for the LifeLink blood donation management system.

## Features

- RESTful API built with Node.js and Express
- MongoDB database with Mongoose ODM
- JWT-based authentication and authorization
- Role-based access control (Donor, Hospital, Admin)
- Password hashing with bcrypt
- CORS support for cross-origin requests
- Request logging with Morgan
- API documentation with Swagger UI

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB connection string and JWT secret

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
db_url=mongodb://localhost:27017/lifelink
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## API Endpoints

### Authentication
- `POST /doner/register` - Register a new donor
- `POST /doner/login` - Donor login
- `POST /hospital/register` - Register a new hospital
- `POST /hospital/login` - Hospital login
- `POST /admin/login` - Admin login

### Donor Endpoints
- `GET /doner/getuser` - Get donor profile (requires authentication)
- `POST /doner/reqblood` - Request blood (requires authentication)
- `GET /doner/dashboard-stats` - Get donation statistics (requires authentication)

### Hospital Endpoints
- `GET /hospital/getuser` - Get hospital profile (requires authentication)
- `POST /hospital/addblood` - Add blood to inventory (requires authentication)
- `GET /hospital/getrequests` - Get blood requests (requires authentication)

### Admin Endpoints
- `GET /admin/users` - Get all users (requires admin authentication)
- `GET /admin/requests` - Get all requests (requires admin authentication)
- `POST /admin/verify` - Verify user/hospital (requires admin authentication)

## Project Structure

```
backend/
├── Auth/                 # Authentication utilities
├── db/                   # Database connection
├── router/               # Route handlers
├── schema/               # Mongoose schemas
├── index.js              # Main server file
├── package.json          # Project dependencies
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- CORS
- Morgan
- Swagger UI Express

## Database Schema

### User Schema
- name: String
- age: Number
- email: String
- phone_number: Number
- address: String
- blood_group: String
- medical_history: String
- type: String (donor/hospital)
- password: String (hashed)
- role: String

### Request Schema
- uid: ObjectId (user reference)
- name: String
- quantity: Number
- blood_group: String
- reason: String
- request_date: Date

### Donated Schema
- uid: ObjectId (user reference)
- blood_group: String
- quantity: Number
- donation_date: Date

## Notes

- All protected routes require a valid JWT token in the Authorization header
- Passwords are hashed using bcrypt before storage
- CORS is enabled for frontend-backend communication
- Request logging is enabled in development mode

---

**Made with ❤️ for saving lives**
