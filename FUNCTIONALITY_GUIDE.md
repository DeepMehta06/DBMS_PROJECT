# Blood Bank Management System - Functionality Guide

## 🎉 Completed Features

### ✅ **Authentication System**
- **Login:** Email and password authentication with JWT tokens
- **Registration:** New users can be registered via API
- **Role-Based Access:** Two roles - Manager and Staff
- **Logout:** Secure logout with token cleanup

### ✅ **Donors Management** (Full CRUD)
- **View All Donors:** List of all registered donors with search and filter
- **Add New Donor:** Click "+ Add New Donor" button to open modal form
  - Required fields: Name, Email, Phone, Blood Group, Age, Sex, City
  - Optional: Address
- **Edit Donor:** Click "Edit" button on any donor row
- **Delete Donor:** Only managers can see and use delete button
- **Search:** Search by name, blood group, or city
- **Filter:** Filter by blood group using dropdown

### ✅ **Blood Inventory Management** (Full CRUD)
- **View All Specimens:** List of all blood units with status badges
- **Add Blood Unit:** Click "+ Add Blood Unit" button
  - Auto-generated specimen number
  - Required: Blood Group, Collection Date, Expiry Date
- **Change Status:** Dropdown to change status (available → reserved/used/contaminated)
- **Delete Specimen:** Only managers can delete (via delete button)
- **Search:** Search by specimen ID or blood group
- **Filter:** Filter by status (available/reserved/used/contaminated)

### ✅ **Dashboard**
- **Real-time Statistics:**
  - Total blood units in system
  - Donors registered this month
  - Available units ready for transfusion
  - Low stock warnings
- **Blood Group Distribution:** Visual cards showing units per blood group
- **Low Stock Alerts:** Automatic warnings for groups with < 5 units
- **Quick Actions:** Buttons for common tasks

### ✅ **Role-Based UI**
- **Manager Role:**
  - Full access to all features
  - Can delete donors and blood specimens
  - Can manage all data
  
- **Staff Role:**
  - Can view all data
  - Can add and edit data
  - Cannot delete records
  - Delete buttons hidden for staff users

---

## 🔐 Login Credentials

### Manager Account (Full Access)
```
Email: admin@bloodbank.com
Password: admin123
Role: Manager
```

### Staff Account (Limited Access)
```
Email: staff@bloodbank.com
Password: staff123
Role: Staff
```

---

## 📊 Demo Data Loaded

### ✅ **20 Donors** Added
- Mix of all blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Complete information: name, email, phone, blood group, age, sex, city, address
- Ages range from 24 to 52 years
- Both male and female donors

### ✅ **20 Blood Specimens** Added
- Specimen numbers: SP-2025-001 to SP-2025-020
- Blood Group Distribution:
  - O+ : 5 units (Universal donor)
  - A+ : 4 units
  - B+ : 3 units
  - AB+: 2 units
  - A- : 2 units
  - O- : 2 units (Rare, universal)
  - B- : 1 unit
  - AB-: 1 unit
- Status variety:
  - Most specimens: Available
  - Some: Reserved
  - One: Used (for testing)
- Collection dates: October 2025
- Expiry dates: 42-45 days from collection

---

## 🚀 How to Use the System

### Starting the Application

1. **Start Backend Server:**
   ```powershell
   cd C:\Users\Deep\OneDrive\Desktop\Coding\blood-bank-backend
   node server.js
   ```
   Backend runs on: `http://localhost:5000`

2. **Start Frontend:**
   ```powershell
   cd C:\Users\Deep\OneDrive\Desktop\Coding\DBMS_PROJECT\blood-bank-app
   npm start
   ```
   Frontend opens at: `http://localhost:3000`

### Using the Features

#### **Adding a New Donor**
1. Go to "Donors" page from sidebar
2. Click "+ Add New Donor" button
3. Fill in the form:
   - Name, Email, Phone (required)
   - Blood Group, Age, Sex (required)
   - City (required), Address (optional)
4. Click "Add Donor" button
5. Donor appears in the list immediately

#### **Adding a Blood Unit**
1. Go to "Inventory" page
2. Click "+ Add Blood Unit" button
3. Specimen number is auto-generated
4. Select blood group
5. Pick collection date (defaults to today)
6. Set expiry date (typically 42 days from collection)
7. Click "Add Blood Unit"
8. Unit appears in inventory list

#### **Editing a Donor**
1. Find the donor in the list
2. Click "Edit" button in Actions column
3. Modify the information
4. Click "Update Donor"
5. Changes saved automatically

#### **Changing Blood Unit Status**
1. Find the specimen in inventory
2. If status is "available", dropdown appears
3. Select new status (reserved/used/contaminated)
4. Status updates immediately

#### **Deleting Records** (Managers Only)
1. Login as manager (admin@bloodbank.com)
2. Navigate to Donors or Inventory
3. Click "Delete" button on any row
4. Confirm deletion in popup
5. Record removed from database

#### **Searching and Filtering**
- **Donors:** Use search box for name/blood group/city
- **Donors:** Use blood group dropdown to filter
- **Inventory:** Search by specimen ID or blood group
- **Inventory:** Filter by status dropdown

---

## 📁 Project Structure

```
DBMS_PROJECT/
├── blood-bank-app/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/         # Dashboard widgets
│   │   │   ├── layout/            # Header, Sidebar, Layout
│   │   │   ├── shared/            # DataTable
│   │   │   └── ui/                # StatCard, StatusBadge
│   │   ├── context/
│   │   │   └── AuthContext.js     # Authentication state
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx  # ✅ With real API data
│   │   │   ├── DonorsPage.jsx     # ✅ Full CRUD + Modals
│   │   │   ├── InventoryPage.jsx  # ✅ Full CRUD + Modals
│   │   │   ├── LoginPage.jsx      # ✅ Real authentication
│   │   │   ├── RecipientsPage.jsx # Placeholder
│   │   │   └── HospitalsPage.jsx  # Placeholder
│   │   └── services/
│   │       └── api.js             # ✅ Axios API calls
│   └── package.json
│
└── blood-bank-backend/            # Express Backend (outside DBMS_PROJECT folder)
    ├── config/
    │   ├── database.js            # MongoDB connection
    │   └── passport.js            # JWT strategy
    ├── models/
    │   ├── User.js                # User authentication
    │   ├── Donor.js               # ✅ With age, sex fields
    │   ├── BloodSpecimen.js       # ✅ With specimen number
    │   ├── Recipient.js
    │   └── Hospital.js
    ├── controllers/               # Business logic
    ├── routes/                    # API endpoints
    ├── middleware/                # Auth middleware
    ├── seedData.js                # ✅ Demo data script
    ├── server.js                  # Main entry point
    └── .env                       # Environment variables
```

---

## 🌟 Key Features Working

| Feature | Status | Notes |
|---------|--------|-------|
| Login/Logout | ✅ | JWT authentication working |
| Dashboard Stats | ✅ | Real-time from MongoDB |
| Add Donor | ✅ | Form with validation |
| Edit Donor | ✅ | Modal with pre-filled data |
| Delete Donor | ✅ | Manager only |
| Search Donors | ✅ | By name/blood group/city |
| Filter Donors | ✅ | By blood group |
| Add Blood Unit | ✅ | Auto specimen number |
| Change Status | ✅ | Dropdown for available units |
| Delete Specimen | ✅ | Manager only |
| Search Inventory | ✅ | By ID or blood group |
| Filter Inventory | ✅ | By status |
| Role-based UI | ✅ | Delete buttons for managers |
| Low Stock Alert | ✅ | Dashboard warning |
| Blood Distribution | ✅ | Visual cards |

---

## 🎯 Next Steps (Future Enhancements)

1. **Recipients Management:** Implement full CRUD for recipients
2. **Hospitals Management:** Add hospital management features
3. **Blood Requests:** Request and approval workflow
4. **Reports:** Generate PDF reports
5. **Notifications:** Email notifications for low stock
6. **Donor History:** Track donation history
7. **Blood Compatibility:** Check compatibility before transfusion
8. **Export Data:** Export to CSV/Excel

---

## 🐛 Troubleshooting

### Backend Won't Start
- Check if MongoDB Atlas connection string is correct in `.env`
- Ensure port 5000 is not in use
- Run: `cd blood-bank-backend && node server.js`

### Frontend Won't Compile
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for syntax errors in recent changes
- Restart dev server: `npm start`

### Can't Login
- Check backend is running on port 5000
- Verify credentials match those created
- Check browser console for API errors

### Data Not Showing
- Refresh the page
- Check backend terminal for errors
- Verify MongoDB connection is active
- Run seed script again if database is empty

---

## ✨ Success! Your System is Ready!

✅ Frontend: http://localhost:3000
✅ Backend: http://localhost:5000
✅ Database: MongoDB Atlas (connected)
✅ Demo Data: 20 donors + 20 blood specimens loaded

**Login now and start managing your blood bank!** 🩸
