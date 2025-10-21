# 🚀 DEPLOYMENT GUIDE - Blood Bank Management System

## 📋 Environment Variables Required

### BACKEND Environment Variables (blood-bank-backend)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blood_bank_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d
```

### FRONTEND Environment Variables (blood-bank-app)

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 🔐 How to Generate Secure Values

### 1. JWT_SECRET (Required - IMPORTANT!)
Generate a secure random string (minimum 32 characters):

**Option 1 - Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2 - Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Option 3 - Online Generator:**
Visit: https://www.random.org/strings/

Example:
```
JWT_SECRET=8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
```

### 2. MONGODB_URI (Required)

**Get from MongoDB Atlas:**
1. Login to MongoDB Atlas: https://cloud.mongodb.com
2. Go to your cluster → Connect → Connect your application
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `blood_bank_db`

Example:
```
MONGODB_URI=mongodb+srv://bloodbankuser:MyPassword123@cluster0.56heszx.mongodb.net/blood_bank_db?retryWrites=true&w=majority
```

### 3. PORT (Optional - Default: 5000)
```
PORT=5000
```

### 4. NODE_ENV (Required)
```
NODE_ENV=production
```

### 5. JWT_EXPIRE (Optional - Default: 7d)
```
JWT_EXPIRE=7d
```

---

## 🌐 Deployment Platforms

### Option 1: Deploy Backend to Render.com (Recommended - FREE)

1. **Create account**: https://render.com
2. **Create New Web Service**
   - Connect your GitHub repository
   - Select `blood-bank-backend` folder (or set Root Directory)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   
3. **Add Environment Variables** in Render Dashboard:
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = <your_mongodb_atlas_connection_string>
   JWT_SECRET = <your_generated_secret>
   JWT_EXPIRE = 7d
   ```

4. **Deploy**: Click "Create Web Service"
5. **Note your backend URL**: `https://your-app-name.onrender.com`

---

### Option 2: Deploy Frontend to Vercel (Recommended - FREE)

1. **Create account**: https://vercel.com
2. **Import GitHub Repository**
   - Select your repository
   - Framework Preset: **Create React App**
   - Root Directory: `blood-bank-app`
   
3. **Add Environment Variable**:
   ```
   REACT_APP_API_URL = https://your-backend-url.onrender.com/api
   ```

4. **Deploy**: Click "Deploy"
5. **Your app will be live**: `https://your-app.vercel.app`

---

### Option 3: Deploy Backend to Railway.app (FREE)

1. **Create account**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Select repository**
4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=<your_connection_string>
   JWT_SECRET=<your_secret>
   JWT_EXPIRE=7d
   ```
5. **Set Start Command**: `node blood-bank-backend/server.js`
6. **Deploy**

---

### Option 4: Deploy Frontend to Netlify (FREE)

1. **Create account**: https://netlify.com
2. **New site from Git** → Choose GitHub
3. **Build settings**:
   - **Base directory**: `blood-bank-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `blood-bank-app/build`
   
4. **Environment Variables**:
   ```
   REACT_APP_API_URL = https://your-backend-url.com/api
   ```

5. **Deploy**

---

## 📊 MongoDB Atlas Setup

### 1. Create Database
1. Go to: https://cloud.mongodb.com
2. Create a **FREE cluster** (M0 Sandbox)
3. Choose a cloud provider and region
4. Create cluster (takes 1-3 minutes)

### 2. Create Database User
1. **Database Access** → Add New Database User
2. Username: `bloodbankuser`
3. Password: Generate secure password (save it!)
4. Database User Privileges: **Read and write to any database**

### 3. Whitelist IP Address
1. **Network Access** → Add IP Address
2. **Allow Access from Anywhere**: `0.0.0.0/0` (for development)
3. For production: Add your hosting platform IPs

### 4. Get Connection String
1. **Clusters** → Connect → Connect your application
2. **Driver**: Node.js
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `blood_bank_db`

---

## 🔄 Update CORS Settings for Production

In `blood-bank-backend/server.js`, update CORS configuration:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://your-frontend-url.vercel.app',  // Add your frontend URL
    'https://your-custom-domain.com'         // Add custom domain if any
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## ✅ Deployment Checklist

### Before Deployment:

- [ ] Generate secure JWT_SECRET
- [ ] Create MongoDB Atlas cluster
- [ ] Create database user with password
- [ ] Get MongoDB connection string
- [ ] Update CORS settings with production URLs
- [ ] Test all environment variables locally
- [ ] Create `.gitignore` file (don't commit .env files!)
- [ ] Push code to GitHub

### Backend Deployment:

- [ ] Deploy backend to Render/Railway
- [ ] Add all environment variables
- [ ] Test backend URL: `https://your-backend.com/api`
- [ ] Verify MongoDB connection in logs

### Frontend Deployment:

- [ ] Deploy frontend to Vercel/Netlify
- [ ] Set REACT_APP_API_URL to backend URL
- [ ] Test deployed frontend
- [ ] Try login functionality
- [ ] Test all CRUD operations

### Post Deployment:

- [ ] Seed demo data: Run `node seedData.js` on backend
- [ ] Test login with both accounts (manager & staff)
- [ ] Verify all pages load correctly
- [ ] Test all features (add, edit, delete)
- [ ] Check browser console for errors

---

## 🔧 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)
- Verify connection string has correct password
- Ensure database user has read/write permissions

### Issue: "CORS policy error"
**Solution**:
- Add frontend URL to CORS origin in backend server.js
- Redeploy backend after CORS changes

### Issue: "API calls return 404"
**Solution**:
- Verify REACT_APP_API_URL includes `/api`
- Example: `https://backend.com/api` (with /api)
- Rebuild and redeploy frontend

### Issue: "Blank page after deployment"
**Solution**:
- Check browser console for errors
- Verify environment variables are set
- Clear browser cache and try again

---

## 📝 Quick Reference

### Complete Environment Variables Template

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://bloodbankuser:PASSWORD@cluster0.xxxxx.mongodb.net/blood_bank_db?retryWrites=true&w=majority
JWT_SECRET=8f7e9d3c2b1a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
JWT_EXPIRE=7d
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

### Test Endpoints After Deployment:
```
GET  https://your-backend.com/api/auth/me
POST https://your-backend.com/api/auth/login
GET  https://your-backend.com/api/donors
GET  https://your-backend.com/api/blood-specimens
```

---

## 🎉 Success!

Once deployed, your Blood Bank Management System will be accessible at:
- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com/api

**Default Login:**
- Manager: admin@bloodbank.com / admin123
- Staff: staff@bloodbank.com / staff123

---

## 📞 Need Help?

Common deployment platforms documentation:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

Good luck with your deployment! 🚀
