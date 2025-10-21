# Blood Bank Management System - Backend API

A complete RESTful API for Blood Bank Management System built with Node.js, Express.js, MongoDB, and JWT authentication.

## 📋 Features

- **User Authentication & Authorization** (JWT + Passport.js)
- **Role-Based Access Control** (Staff & Manager roles)
- **Complete CRUD Operations** for all entities
- **Advanced Filtering & Pagination**
- **Data Validation** with Mongoose
- **Secure Password Hashing** with bcrypt
- **RESTful API Design**
- **Error Handling & Validation**

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
blood-bank-backend/
├── config/
│   ├── database.js           # MongoDB connection
│   └── passport.js            # Passport strategies (Local & JWT)
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── donorController.js     # Donor CRUD operations
│   ├── recipientController.js # Recipient CRUD operations
│   ├── bloodSpecimenController.js # Blood specimen CRUD
│   └── hospitalController.js  # Hospital CRUD operations
├── middleware/
│   ├── isAuthenticated.js     # JWT authentication middleware
│   └── isAuthorized.js        # Role-based authorization
├── models/
│   ├── User.js                # User schema (staff/manager)
│   ├── Donor.js               # Donor schema
│   ├── Recipient.js           # Recipient schema
│   ├── BloodSpecimen.js       # Blood specimen schema
│   └── Hospital.js            # Hospital schema
├── routes/
│   ├── auth.routes.js         # Auth routes
│   ├── donor.routes.js        # Donor routes
│   ├── recipient.routes.js    # Recipient routes
│   ├── bloodSpecimen.routes.js # Blood specimen routes
│   └── hospital.routes.js     # Hospital routes
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── server.js                   # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd blood-bank-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Update the `.env` file with your configurations:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/blood_bank_db
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"  // Optional: "staff" or "manager"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "6501234567890abcdef12345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "6501234567890abcdef12345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

## 👥 Donor Endpoints

### Get All Donors
```http
GET /api/donors?bloodGroup=A+&city=Mumbai&page=1&limit=10
Authorization: Bearer <token>
Access: staff, manager
```

### Get Single Donor
```http
GET /api/donors/:id
Authorization: Bearer <token>
Access: staff, manager
```

### Create Donor
```http
POST /api/donors
Authorization: Bearer <token>
Access: staff, manager
```

**Body:**
```json
{
  "name": "Rajesh Kumar",
  "bloodGroup": "A+",
  "age": 30,
  "sex": "Male",
  "phone": "+91-9876543210",
  "city": "Mumbai"
}
```

### Update Donor
```http
PUT /api/donors/:id
Authorization: Bearer <token>
Access: staff, manager
```

### Delete Donor
```http
DELETE /api/donors/:id
Authorization: Bearer <token>
Access: manager ONLY
```

### Get Donor Statistics
```http
GET /api/donors/stats
Authorization: Bearer <token>
Access: staff, manager
```

---

## 🏥 Recipient Endpoints

### Get All Recipients
```http
GET /api/recipients?bloodGroup=O+&status=pending&page=1&limit=10
Authorization: Bearer <token>
Access: staff, manager
```

### Create Recipient
```http
POST /api/recipients
Authorization: Bearer <token>
Access: staff, manager
```

**Body:**
```json
{
  "name": "Priya Sharma",
  "bloodGroup": "O+",
  "bloodQuantity": 2,
  "age": 28,
  "sex": "Female",
  "phone": "+91-9876543211"
}
```

### Update Recipient Status
```http
PATCH /api/recipients/:id/status
Authorization: Bearer <token>
Access: manager ONLY
```

**Body:**
```json
{
  "status": "approved"  // pending, approved, fulfilled, rejected
}
```

---

## 🩸 Blood Specimen Endpoints

### Get All Blood Specimens
```http
GET /api/blood-specimens?bloodGroup=B+&status=available&page=1&limit=10
Authorization: Bearer <token>
Access: staff, manager
```

### Create Blood Specimen
```http
POST /api/blood-specimens
Authorization: Bearer <token>
Access: staff, manager
```

**Body:**
```json
{
  "specimenNumber": "BB001",
  "bloodGroup": "A+",
  "status": "available",
  "collectionDate": "2025-10-15",
  "expiryDate": "2025-11-15",
  "donor": "6501234567890abcdef12345"  // Optional: Donor ID
}
```

### Update Specimen Status
```http
PATCH /api/blood-specimens/:id/status
Authorization: Bearer <token>
Access: staff, manager
```

**Body:**
```json
{
  "status": "reserved"  // available, reserved, used, contaminated
}
```

### Get Inventory Statistics
```http
GET /api/blood-specimens/stats/inventory
Authorization: Bearer <token>
Access: staff, manager
```

---

## 🏢 Hospital Endpoints

### Get All Hospitals
```http
GET /api/hospitals?city=Delhi&page=1&limit=10
Authorization: Bearer <token>
Access: staff, manager
```

### Create Hospital
```http
POST /api/hospitals
Authorization: Bearer <token>
Access: manager ONLY
```

**Body:**
```json
{
  "name": "City Hospital",
  "city": "Mumbai",
  "phone": "+91-9876543212",
  "address": "123 Main Street",
  "email": "contact@cityhospital.com"
}
```

### Update Hospital
```http
PUT /api/hospitals/:id
Authorization: Bearer <token>
Access: manager ONLY
```

### Delete Hospital
```http
DELETE /api/hospitals/:id
Authorization: Bearer <token>
Access: manager ONLY
```

---

## 🔒 Role-Based Access Control

### Staff Role
- Can view all resources
- Can create/update donors, recipients, and blood specimens
- Cannot delete any resources
- Cannot manage hospitals

### Manager Role
- Full access to all resources
- Can delete donors, recipients, and blood specimens
- Can create, update, and delete hospitals
- Can update recipient and specimen statuses

---

## 📝 Data Models

### User
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['staff', 'manager']),
  createdAt: Date
}
```

### Donor
```javascript
{
  name: String,
  bloodGroup: String (enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  age: Number (18-65),
  sex: String (enum: ['Male', 'Female', 'Other']),
  phone: String,
  city: String,
  registrationDate: Date
}
```

### Recipient
```javascript
{
  name: String,
  bloodGroup: String,
  bloodQuantity: Number,
  age: Number,
  sex: String,
  phone: String,
  requestDate: Date,
  status: String (enum: ['pending', 'approved', 'fulfilled', 'rejected'])
}
```

### BloodSpecimen
```javascript
{
  specimenNumber: String (unique),
  bloodGroup: String,
  status: String (enum: ['available', 'reserved', 'used', 'contaminated']),
  collectionDate: Date,
  expiryDate: Date,
  donor: ObjectId (ref: 'Donor')
}
```

### Hospital
```javascript
{
  name: String (unique),
  city: String,
  phone: String,
  address: String,
  email: String
}
```

---

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **cURL** - Command line testing
- **Thunder Client** - VS Code extension

### Example: Login and Make Authenticated Request

1. **Login to get token:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

2. **Use token for protected routes:**
```bash
curl -X GET http://localhost:5000/api/donors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 NPM Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS enabled
- ✅ Environment variables for secrets

---

## 📦 Database Schema Indexes

Optimized indexes for faster queries:
- Donors: `bloodGroup`, `city`
- Recipients: `bloodGroup`, `status`
- Blood Specimens: `specimenNumber`, `bloodGroup`, `status`
- Hospitals: `city`

---

## 🚨 Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 📄 License

This project is created for educational purposes.

---

## 👨‍💻 Author

Created as part of the Blood Bank Management System project.

---

## 🎯 Next Steps

1. Connect frontend React app to this API
2. Add more advanced features (reports, analytics)
3. Implement email notifications
4. Add file upload for documents
5. Deploy to production (Heroku, AWS, etc.)
