# Blood Bank Management System

A comprehensive full-stack web application for managing blood bank operations including donor management, blood inventory tracking, recipient requests, and hospital network coordination.

## 🚀 Features

- **Dashboard**: Real-time statistics and blood group inventory visualization
- **Donor Management**: Register and manage blood donors with complete CRUD operations
- **Blood Inventory**: Track blood specimens with status management (available, reserved, used)
- **Recipient Management**: Process blood requests with approval workflow
- **Hospital Network**: Manage partner hospitals (Manager-only access)
- **Role-Based Access Control**: Manager and Staff roles with different permissions
- **Authentication**: Secure JWT-based authentication system

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Passport.js
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd DBMS_PROJECT
```

### 2. Backend Setup
```bash
cd blood-bank-backend
npm install
```

Create a `.env` file in the `blood-bank-backend` directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### 3. Frontend Setup
```bash
cd blood-bank-app
npm install
```

Create a `.env` file in the `blood-bank-app` directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Seed Demo Data (Optional)
```bash
cd blood-bank-backend
node seedData.js
```

This will populate your database with:
- 20 Donors
- 20 Blood Specimens
- 20 Recipients
- 20 Hospitals

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd blood-bank-backend
node server.js
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd blood-bank-app
npm start
```
Frontend will run on `http://localhost:3000`

## 🔐 Login Credentials

### Manager Account (Full Access)
- **Email**: admin@bloodbank.com
- **Password**: admin123

### Staff Account (Limited Access)
- **Email**: staff@bloodbank.com
- **Password**: staff123

## 📁 Project Structure

```
DBMS_PROJECT/
├── blood-bank-app/          # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable components
│       ├── context/         # Auth context
│       ├── pages/           # Page components
│       ├── services/        # API services
│       └── App.js
│
├── blood-bank-backend/      # Express backend
│   ├── config/              # Database config
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── seedData.js          # Database seeding
│   └── server.js
│
└── FUNCTIONALITY_GUIDE.md   # Detailed feature guide
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Donors
- `GET /api/donors` - Get all donors
- `POST /api/donors` - Create donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor (Manager only)
- `GET /api/donors/stats` - Get donor statistics

### Blood Specimens
- `GET /api/blood-specimens` - Get all specimens
- `POST /api/blood-specimens` - Create specimen
- `PUT /api/blood-specimens/:id` - Update specimen
- `DELETE /api/blood-specimens/:id` - Delete specimen (Manager only)
- `PATCH /api/blood-specimens/:id/status` - Update status
- `GET /api/blood-specimens/stats/inventory` - Get inventory stats

### Recipients
- `GET /api/recipients` - Get all recipients
- `POST /api/recipients` - Create recipient
- `PUT /api/recipients/:id` - Update recipient
- `DELETE /api/recipients/:id` - Delete recipient (Manager only)
- `GET /api/recipients/stats` - Get recipient statistics

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `POST /api/hospitals` - Create hospital (Manager only)
- `PUT /api/hospitals/:id` - Update hospital (Manager only)
- `DELETE /api/hospitals/:id` - Delete hospital (Manager only)

## 🎨 Features by Role

### Manager (Full Access)
✅ View all modules
✅ Create, Read, Update, Delete operations on all entities
✅ Manage hospitals
✅ View all statistics
✅ Approve/Reject recipient requests

### Staff (Limited Access)
✅ View all modules
✅ Create and Update donors, inventory, recipients
✅ View hospitals (cannot modify)
❌ Cannot delete any records
❌ Cannot manage hospitals

## 🔒 Environment Variables for Deployment

### Backend Environment Variables
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your_production_mongodb_uri>
JWT_SECRET=<generate_strong_random_secret>
JWT_EXPIRE=7d
```

### Frontend Environment Variables
```
REACT_APP_API_URL=<your_backend_api_url>
```

## 📦 Deployment

### Backend (Node.js/Express)
Recommended platforms:
- **Render**: Create Web Service, connect GitHub, set environment variables
- **Railway**: Deploy from GitHub with automatic builds
- **Heroku**: Use Heroku CLI or connect GitHub repository

### Frontend (React)
Recommended platforms:
- **Vercel**: Import GitHub repository, auto-detects React
- **Netlify**: Connect GitHub, set build command `npm run build`
- **GitHub Pages**: Build and deploy static files

### Database
- **MongoDB Atlas**: Create cluster, whitelist IP addresses (use 0.0.0.0/0 for development)
- Get connection string from Atlas dashboard
- Add to backend environment variables

## 🐛 Troubleshooting

### "Objects are not valid as a React child" error
- Clear browser cache (Ctrl+Shift+R)
- Visit `/logout` to clear localStorage
- Restart backend and frontend servers

### Database connection issues
- Verify MongoDB URI in .env file
- Check MongoDB Atlas IP whitelist
- Ensure network access is configured

### CORS errors
- Backend CORS is configured for `http://localhost:3000`
- Update CORS settings in `server.js` for production domain

## 📝 License

This project is created for educational purposes.

## 👥 Contributors

- Your Name

## 📧 Support

For issues and questions, please open an issue in the GitHub repository.
