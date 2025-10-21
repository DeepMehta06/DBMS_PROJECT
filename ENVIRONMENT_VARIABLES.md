# 🔐 ENVIRONMENT VARIABLES REFERENCE

## Complete List of All Environment Variables Required for Deployment

---

## BACKEND Environment Variables
**File Location**: `blood-bank-backend/.env`
**Platform**: Render, Railway, Heroku, etc.

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/blood_bank_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
```

### Variable Descriptions:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | ✅ Yes | development | Set to `production` for deployment |
| `PORT` | ⚠️ Optional | 5000 | Port number (hosting platforms may override) |
| `MONGODB_URI` | ✅ Yes | - | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ Yes | - | Secret key for JWT token generation (min 32 chars) |
| `JWT_EXPIRE` | ⚠️ Optional | 7d | JWT token expiration time |

---

## FRONTEND Environment Variables
**File Location**: `blood-bank-app/.env`
**Platform**: Vercel, Netlify, GitHub Pages

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Variable Descriptions:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | ✅ Yes | http://localhost:5000/api | Your deployed backend API URL (must include `/api`) |

---

## 🔑 How to Generate Secure Values

### 1. JWT_SECRET (CRITICAL - Must be secure!)

**Method 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Output example:
```
8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
```

**Method 2 - PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Method 3 - Online:**
- Visit: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Key" or "Fort Knox Password"

**⚠️ NEVER use weak secrets like:**
- ❌ "mysecret"
- ❌ "12345678"
- ❌ "password123"

### 2. MONGODB_URI

**Get from MongoDB Atlas:**

1. **Login**: https://cloud.mongodb.com
2. **Navigate**: Clusters → Connect → Connect your application
3. **Select**: Driver: Node.js, Version: 4.1 or later
4. **Copy the connection string**:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
5. **Replace**:
   - `<username>` with your database username
   - `<password>` with your database password
   - `<dbname>` with `blood_bank_db`

**Example:**
```
mongodb+srv://bloodbankuser:MySecurePass123@cluster0.56heszx.mongodb.net/blood_bank_db?retryWrites=true&w=majority
```

**⚠️ Important Notes:**
- URL encode special characters in password
- If password has `@`, replace with `%40`
- If password has `#`, replace with `%23`
- If password has `$`, replace with `%24`

---

## 📋 Platform-Specific Setup

### Render.com (Backend)

**Dashboard → Environment Variables → Add:**
```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/blood_bank_db
JWT_SECRET = 8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
JWT_EXPIRE = 7d
```

### Railway.app (Backend)

**Variables Tab → Add:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blood_bank_db
JWT_SECRET=8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
JWT_EXPIRE=7d
```

### Vercel (Frontend)

**Settings → Environment Variables → Add:**
```
REACT_APP_API_URL = https://your-backend-name.onrender.com/api
```

**⚠️ Important:**
- Must start with `REACT_APP_`
- Must include `/api` at the end
- No trailing slash

### Netlify (Frontend)

**Site settings → Environment → Environment variables:**
```
Key: REACT_APP_API_URL
Value: https://your-backend-name.onrender.com/api
```

---

## ✅ Complete Example Setup

### Example 1: Render (Backend) + Vercel (Frontend)

**Backend (Render):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://bloodbankadmin:xK9mP2nQ5rL8@cluster0.abcde.mongodb.net/blood_bank_db?retryWrites=true&w=majority
JWT_SECRET=8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
JWT_EXPIRE=7d
```

**Backend URL after deployment:**
```
https://blood-bank-backend.onrender.com
```

**Frontend (Vercel):**
```env
REACT_APP_API_URL=https://blood-bank-backend.onrender.com/api
```

**Frontend URL after deployment:**
```
https://blood-bank-app.vercel.app
```

### Example 2: Railway (Backend) + Netlify (Frontend)

**Backend (Railway):**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://bloodbankadmin:xK9mP2nQ5rL8@cluster0.abcde.mongodb.net/blood_bank_db
JWT_SECRET=9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8
JWT_EXPIRE=7d
```

**Backend URL:**
```
https://blood-bank-backend-production.up.railway.app
```

**Frontend (Netlify):**
```env
REACT_APP_API_URL=https://blood-bank-backend-production.up.railway.app/api
```

**Frontend URL:**
```
https://blood-bank-management.netlify.app
```

---

## 🔒 Security Best Practices

### DO:
✅ Use strong, random JWT secrets (minimum 32 characters)
✅ Use environment variables for all secrets
✅ Different secrets for development and production
✅ Keep .env files in .gitignore
✅ Use MongoDB Atlas IP whitelist for production

### DON'T:
❌ Commit .env files to GitHub
❌ Use weak or predictable secrets
❌ Share secrets in public channels
❌ Reuse the same JWT secret across projects
❌ Use default or example secrets in production

---

## 🧪 Testing Environment Variables

### Test Backend Variables:
```bash
# Test if backend can start
node server.js

# Should see:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
```

### Test Frontend Variables:
```bash
# Build the app
npm run build

# Check if API URL is correct in network tab
```

---

## 🆘 Common Issues

### Issue: "MongooseError: The `uri` parameter to `openUri()` must be a string"
**Solution**: MONGODB_URI is missing or incorrectly formatted

### Issue: "JsonWebTokenError: invalid signature"
**Solution**: JWT_SECRET doesn't match between requests (likely different secret in env)

### Issue: "Network Error" or CORS issues
**Solution**: 
- Check REACT_APP_API_URL includes `/api`
- Verify backend CORS settings include frontend domain
- Ensure backend is actually deployed and running

### Issue: "Failed to fetch" errors
**Solution**:
- Backend URL in REACT_APP_API_URL is incorrect
- Backend is not deployed or crashed
- Check backend logs for errors

---

## 📝 Environment Variables Checklist

Before deployment, confirm:

**Backend:**
- [ ] NODE_ENV set to `production`
- [ ] MONGODB_URI is correct and connection tested
- [ ] JWT_SECRET is strong and secure (32+ characters)
- [ ] JWT_EXPIRE is set (optional, defaults to 7d)
- [ ] No .env file committed to GitHub

**Frontend:**
- [ ] REACT_APP_API_URL points to deployed backend
- [ ] URL includes `/api` at the end
- [ ] URL uses `https://` not `http://` (in production)
- [ ] Rebuild app after changing env variables

**MongoDB Atlas:**
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0 for development)
- [ ] Connection string tested locally
- [ ] Database name is `blood_bank_db`

---

## 🎯 Quick Reference Card

**Copy this and fill in your values:**

```
BACKEND DEPLOYED URL: https://your-backend.onrender.com
FRONTEND DEPLOYED URL: https://your-app.vercel.app

MONGODB_URI: mongodb+srv://USER:PASS@cluster.mongodb.net/blood_bank_db
JWT_SECRET: [32+ character random string]

Backend Environment Variables:
- NODE_ENV=production
- PORT=5000
- MONGODB_URI=[your_connection_string]
- JWT_SECRET=[your_secure_secret]
- JWT_EXPIRE=7d

Frontend Environment Variables:
- REACT_APP_API_URL=https://your-backend.onrender.com/api

Login Credentials:
- Manager: admin@bloodbank.com / admin123
- Staff: staff@bloodbank.com / staff123
```

---

Save this document for future reference! 📌
