# 🚀 Quick Start Guide - Blood Bank Backend API

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB installed and running (or MongoDB Atlas account)
- ✅ Postman (optional, for API testing)

---

## 📦 Step 1: Install Dependencies

```bash
cd blood-bank-backend
npm install
```

**Packages installed:**
- express, mongoose, bcryptjs, jsonwebtoken
- passport, passport-local, passport-jwt
- dotenv, cors, nodemon

---

## 🔧 Step 2: Configure Environment

The `.env` file is already created. Update it if needed:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blood_bank_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blood_bank_db
```

---

## 🗄️ Step 3: Start MongoDB

### Local MongoDB:
```bash
mongod
```

### MongoDB Atlas:
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in .env

---

## ▶️ Step 4: Start the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

**Expected Output:**
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

---

## 🧪 Step 5: Test the API

### Option A: Using Postman

1. **Import Collection:**
   - File → Import → `Blood_Bank_API.postman_collection.json`

2. **Set Variables:**
   - base_url: `http://localhost:5000/api`
   - jwt_token: (will be set after login)

3. **Test Flow:**
   ```
   1. Auth → Register User
   2. Auth → Login (copy the token from response)
   3. Update jwt_token variable with the copied token
   4. Test other endpoints (Donors, Recipients, etc.)
   ```

### Option B: Using cURL

**1. Register a Manager:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin Manager\",\"email\":\"admin@bloodbank.com\",\"password\":\"admin123\",\"role\":\"manager\"}"
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@bloodbank.com\",\"password\":\"admin123\"}"
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**3. Copy the token and test protected routes:**
```bash
curl -X GET http://localhost:5000/api/donors ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Step 6: Create Sample Data

### Create a Donor:
```bash
curl -X POST http://localhost:5000/api/donors ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Rajesh Kumar\",\"bloodGroup\":\"A+\",\"age\":30,\"sex\":\"Male\",\"phone\":\"+91-9876543210\",\"city\":\"Mumbai\"}"
```

### Create a Blood Specimen:
```bash
curl -X POST http://localhost:5000/api/blood-specimens ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"specimenNumber\":\"BB001\",\"bloodGroup\":\"A+\",\"status\":\"available\",\"collectionDate\":\"2025-10-15\",\"expiryDate\":\"2025-11-15\"}"
```

### Create a Recipient:
```bash
curl -X POST http://localhost:5000/api/recipients ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Priya Sharma\",\"bloodGroup\":\"O+\",\"bloodQuantity\":2,\"age\":28,\"sex\":\"Female\",\"phone\":\"+91-9876543211\"}"
```

---

## 🔑 Step 7: Test Role-Based Access

### As Staff (create a staff user):
```bash
# Register staff
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Staff User\",\"email\":\"staff@bloodbank.com\",\"password\":\"staff123\",\"role\":\"staff\"}"

# Login as staff
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"staff@bloodbank.com\",\"password\":\"staff123\"}"

# Try to delete (should fail - manager only)
curl -X DELETE http://localhost:5000/api/donors/DONOR_ID ^
  -H "Authorization: Bearer STAFF_TOKEN"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Forbidden - This action requires manager role"
}
```

---

## 📊 Step 8: Test Statistics Endpoints

```bash
# Get donor statistics
curl -X GET http://localhost:5000/api/donors/stats ^
  -H "Authorization: Bearer YOUR_TOKEN"

# Get inventory statistics
curl -X GET http://localhost:5000/api/blood-specimens/stats/inventory ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Common API Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/auth/register` | POST | Public | Register user |
| `/api/auth/login` | POST | Public | Login |
| `/api/auth/me` | GET | Private | Get current user |
| `/api/donors` | GET | Private | Get all donors |
| `/api/donors` | POST | Private | Create donor |
| `/api/donors/:id` | DELETE | Manager | Delete donor |
| `/api/blood-specimens` | GET | Private | Get specimens |
| `/api/recipients/:id/status` | PATCH | Manager | Update status |
| `/api/hospitals` | POST | Manager | Create hospital |

---

## ⚠️ Troubleshooting

### Server won't start:
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Use different port in .env
PORT=5001
```

### MongoDB connection error:
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
```

### Authentication not working:
- Ensure JWT_SECRET is set in .env
- Check if token is included in Authorization header
- Token format: `Bearer <token>`

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`
- **Postman Collection**: Import `Blood_Bank_API.postman_collection.json`

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] MongoDB running
- [ ] .env configured
- [ ] Server started successfully
- [ ] Registered at least one user
- [ ] Successfully logged in
- [ ] Token obtained
- [ ] Tested protected routes
- [ ] Created sample data
- [ ] Tested role-based access

---

## 🎉 Success!

Once you see this output, your API is ready:

```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

**Your Blood Bank Management System Backend API is now running!**

**Base URL:** http://localhost:5000/api

**Next Step:** Connect your React frontend to this API! 🚀
