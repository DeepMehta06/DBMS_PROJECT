# 🔄 DATABASE RESTRUCTURE - MIGRATION GUIDE

## ✅ Completed Steps:

### 1. Models Updated ✅
- ✅ City (new)
- ✅ Blood_Donor (restructured from Donor)
- ✅ Recipient (restructured)
- ✅ Hospital_Info (restructured from Hospital)
- ✅ Blood_Specimen (restructured from BloodSpecimen)
- ✅ BB_Manager (new)
- ✅ Recording_Staff (new)
- ✅ Registers (new - relationship)
- ✅ Records (new - relationship)
- ✅ Request_To (new - relationship)

### 2. Seed Data ✅
- ✅ Created seedDataNew.js with 163 records
- ✅ Successfully seeded all 10 collections

---

## 🚧 Remaining Tasks:

### 3. Update Controllers
Need to update field names in all controllers:

#### donorController.js
- `name` → `Bd_Name`
- `bloodGroup` → `Bd_Bgroup`
- `age` → `Bd_Age`
- `sex` → `Bd_Sex` (Convert 'Male'/'Female' → 'M'/'F')
- `phone` → `Bd_Phone`
- `city` → `City_Id` (Convert city name → City_Id)
- `registrationDate` → `Bd_reg_Date`
- Add: `Bd_Id` generation

#### recipientController.js
- `name` → `Reci_Name`
- `bloodGroup` → `Reci_Bgrp`
- `age` → `Reci_Age`
- `sex` → `Reci_Sex` (Convert 'Male'/'Female' → 'M'/'F')
- `phone` → `Reci_Phone`
- `bloodQuantity` → `Reci_Bqty`
- `requestDate` → `Reci_Date`
- Remove: `status` field
- Add: `Reci_Id` generation, `City_Id`

#### hospitalController.js
- `name` → `Hosp_Name`
- `phone` → `Hosp_Phone`
- Remove: `address`, `email`, `city`, `type`, `capacity`
- Add: `Hosp_Id` generation, `Hosp_Needed_Bgrp`, `City_Id`

#### bloodSpecimenController.js
- Remove: `specimenNumber`, `collectionDate`, `expiryDate`, `donor`
- `bloodGroup` → `B_Group`
- `status` → `Status`
- Add: `Specimen_Id` generation

### 4. Create New Controllers
- ✅ cityController.js
- ✅ bbManagerController.js
- ✅ recordingStaffController.js
- ✅ registersController.js (relationships)
- ✅ recordsController.js (relationships)
- ✅ requestToController.js (relationships)

### 5. Update Routes
- Update all existing routes with new field names
- Create new routes for new controllers

### 6. Update Frontend
- Update all forms with new field names
- Add City dropdown
- Convert sex field to radio buttons (M/F)
- Update API calls
- Add pages for new entities

---

## 📊 Field Mapping Reference:

### Donors:
| Old Field | New Field | Type Change |
|-----------|-----------|-------------|
| _id (ObjectId) | Bd_Id (Number) | ✅ Auto-increment |
| name | Bd_Name | - |
| bloodGroup | Bd_Bgroup | - |
| age | Bd_Age | - |
| sex (Male/Female/Other) | Bd_Sex (M/F) | ✅ Convert |
| phone | Bd_Phone | - |
| city (String) | City_Id (Number) | ✅ Lookup |
| registrationDate | Bd_reg_Date | - |

### Recipients:
| Old Field | New Field | Type Change |
|-----------|-----------|-------------|
| _id (ObjectId) | Reci_Id (Number) | ✅ Auto-increment |
| name | Reci_Name | - |
| bloodGroup | Reci_Bgrp | - |
| age | Reci_Age | - |
| sex (Male/Female/Other) | Reci_Sex (M/F) | ✅ Convert |
| phone | Reci_Phone | - |
| bloodQuantity | Reci_Bqty | - |
| requestDate | Reci_Date | - |
| status | ❌ REMOVED | - |
| - | City_Id (Number) | ✅ NEW |

### Hospitals:
| Old Field | New Field | Type Change |
|-----------|-----------|-------------|
| _id (ObjectId) | Hosp_Id (Number) | ✅ Auto-increment |
| name | Hosp_Name | - |
| phone | Hosp_Phone | - |
| address | ❌ REMOVED | - |
| email | ❌ REMOVED | - |
| city (String) | City_Id (Number) | ✅ Lookup |
| type | ❌ REMOVED | - |
| capacity | ❌ REMOVED | - |
| - | Hosp_Needed_Bgrp | ✅ NEW |

### Blood Specimens:
| Old Field | New Field | Type Change |
|-----------|-----------|-------------|
| _id (ObjectId) | Specimen_Id (Number) | ✅ Auto-increment |
| specimenNumber | ❌ REMOVED | - |
| bloodGroup | B_Group | - |
| status | Status | - |
| collectionDate | ❌ REMOVED | - |
| expiryDate | ❌ REMOVED | - |
| donor | ❌ REMOVED | - |

---

## 🎯 Priority Order:

1. ✅ Models (DONE)
2. ✅ Seed Data (DONE)
3. ⏳ Controllers (IN PROGRESS)
4. ⏳ Routes
5. ⏳ Frontend
6. ⏳ Testing
7. ⏳ Deployment

---

## ⚠️ Breaking Changes:

1. All `_id` fields now use numeric IDs instead of MongoDB ObjectIds
2. Sex field changed from full words to single characters (M/F)
3. City changed from string to numeric reference
4. Many fields removed from Hospital and Blood_Specimen
5. Status field removed from Recipient
6. All field names changed to SQL-style naming convention

---

## 📝 Notes:

- Frontend needs complete rewrite of forms
- All API responses will have different structure
- Need to update authentication if it references old fields
- Dashboard stats queries need updates
- Search/filter functionality needs updates
