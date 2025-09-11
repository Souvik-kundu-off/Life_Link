# LifeLink Frontend

This is the frontend application for the LifeLink blood donation management system.

## Features

- Responsive React application built with Vite and Tailwind CSS
- User roles: Donor, Hospital Staff, Administrator
- Registration and login pages for different user types
- Dashboards tailored to each user role
- Interactive landing page with animations using Framer Motion
- Routing handled by React Router
- API communication via Axios
- Form handling with React Hook Form

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

To build the frontend for production deployment:
```bash
npm run build
```

### Linting

To run ESLint checks:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components for routing
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main app component with routes
│   └── main.jsx          # Entry point
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
```

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- React Hook Form
- Lucide React Icons

## Notes

- Ensure the backend server is running and accessible for API calls.
- Update API base URLs in the frontend if backend is hosted remotely.

---

**Made with ❤️ for saving lives**
