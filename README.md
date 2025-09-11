# LifeLink - Blood Donation Management System

A comprehensive platform connecting blood donors, hospitals, and administrators to streamline blood donation processes and save lives efficiently.

## 🚀 Features

### For Donors
- **Easy Registration**: Quick signup with medical history tracking
- **Donation Tracking**: Monitor donation history and eligibility
- **Blood Requests**: Request specific blood types when needed
- **Dashboard Stats**: View total donations and lives saved
- **Location Services**: Find nearby donation centers

### For Hospitals
- **Inventory Management**: Track blood stock levels
- **Request Coordination**: Post urgent blood requests
- **Donor Matching**: Find compatible donors quickly
- **Emergency Response**: Rapid coordination during crises

### For Administrators
- **System Oversight**: Platform-wide monitoring
- **User Verification**: Manage donor and hospital accounts
- **Analytics Dashboard**: Comprehensive platform statistics
- **Emergency Coordination**: Oversee critical situations

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **JWT Decode** - Token handling
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LifeLink-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
db_url=mongodb://localhost:27017/lifelink
# OR for MongoDB Atlas:
# db_url=mongodb+srv://username:password@cluster.mongodb.net/lifelink?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Alternative: Docker Setup (Optional)
If you prefer using Docker:

```bash
# Make sure Docker and Docker Compose are installed
docker-compose up --build
```

This will start both frontend and backend services with MongoDB.

## 📖 API Endpoints

### Authentication
- `POST /doner/register` - Register new donor
- `POST /doner/login` - Donor login
- `POST /hospital/register` - Register hospital
- `POST /hospital/login` - Hospital login
- `POST /admin/login` - Admin login

### Donor Routes
- `GET /doner/getuser` - Get donor profile
- `POST /doner/reqblood` - Request blood
- `GET /doner/dashboard-stats` - Get donation statistics

### Hospital Routes
- `GET /hospital/getuser` - Get hospital profile
- `POST /hospital/addblood` - Add blood to inventory
- `GET /hospital/getrequests` - Get blood requests

### Admin Routes
- `GET /admin/users` - Get all users
- `GET /admin/requests` - Get all requests
- `POST /admin/verify` - Verify user/hospital

## 🎯 Usage

1. **Visit the Landing Page**: Navigate to the homepage to explore features
2. **Register**: Choose your role (Donor/Hospital/Admin) and register
3. **Login**: Use your credentials to access the dashboard
4. **Dashboard**: Manage your activities based on your role
5. **Donate/Request**: Donors can donate, hospitals can request blood

## 📁 Project Structure

```
LifeLink-main/
├── backend/
│   ├── Auth/                 # Authentication utilities
│   ├── db/                   # Database connection
│   ├── router/               # Route handlers
│   ├── schema/               # Mongoose schemas
│   ├── index.js              # Main server file
│   ├── package.json          # Backend dependencies
│   ├── .env.example          # Environment template
│   └── README.md             # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind config
│   └── README.md             # Frontend documentation
├── docker-compose.yml        # Docker configuration
├── README.md                 # This file
└── .gitignore                # Git ignore rules
```

## 🔧 Development

### Running in Development Mode
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

### Building for Production
```bash
cd frontend
npm run build
```

### Docker Commands
```bash
# Start all services
docker-compose up

# Start with rebuild
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose up --build backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for hackathons and real-world impact
- Designed to save lives through efficient blood donation management
- Inspired by the need for better healthcare coordination
