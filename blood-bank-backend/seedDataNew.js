require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');
const BloodDonor = require('./models/Donor');
const Recipient = require('./models/Recipient');
const HospitalInfo = require('./models/Hospital');
const BloodSpecimen = require('./models/BloodSpecimen');
const BBManager = require('./models/BBManager');
const RecordingStaff = require('./models/RecordingStaff');
const Registers = require('./models/Registers');
const Records = require('./models/Records');
const RequestTo = require('./models/RequestTo');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    console.log('🗑️  Clearing existing data...');
    
    // Clear all collections
    await City.deleteMany({});
    await BloodDonor.deleteMany({});
    await Recipient.deleteMany({});
    await HospitalInfo.deleteMany({});
    await BloodSpecimen.deleteMany({});
    await BBManager.deleteMany({});
    await RecordingStaff.deleteMany({});
    await Registers.deleteMany({});
    await Records.deleteMany({});
    await RequestTo.deleteMany({});
    
    console.log('✅ All collections cleared');
    
    // 1. CITIES
    console.log('\n📍 Seeding Cities...');
    const cities = [
      { City_Id: 1, City_Name: 'Mumbai' },
      { City_Id: 2, City_Name: 'Delhi' },
      { City_Id: 3, City_Name: 'Bangalore' },
      { City_Id: 4, City_Name: 'Hyderabad' },
      { City_Id: 5, City_Name: 'Chennai' },
      { City_Id: 6, City_Name: 'Kolkata' },
      { City_Id: 7, City_Name: 'Pune' },
      { City_Id: 8, City_Name: 'Ahmedabad' },
      { City_Id: 9, City_Name: 'Jaipur' },
      { City_Id: 10, City_Name: 'Lucknow' }
    ];
    await City.insertMany(cities);
    console.log(`✅ Inserted ${cities.length} cities`);
    
    // 2. BB_MANAGERS
    console.log('\n👔 Seeding BB Managers...');
    const managers = [
      { M_Id: 1, M_Name: 'Dr. Rajesh Kumar', M_Phone: '9876543210' },
      { M_Id: 2, M_Name: 'Dr. Priya Sharma', M_Phone: '9876543211' },
      { M_Id: 3, M_Name: 'Dr. Amit Patel', M_Phone: '9876543212' },
      { M_Id: 4, M_Name: 'Dr. Sneha Reddy', M_Phone: '9876543213' },
      { M_Id: 5, M_Name: 'Dr. Vikram Singh', M_Phone: '9876543214' }
    ];
    await BBManager.insertMany(managers);
    console.log(`✅ Inserted ${managers.length} BB managers`);
    
    // 3. RECORDING STAFF
    console.log('\n📝 Seeding Recording Staff...');
    const staff = [
      { Reco_Id: 1, Reco_Name: 'Rahul Verma', Reco_Phone: '9123456780' },
      { Reco_Id: 2, Reco_Name: 'Anita Desai', Reco_Phone: '9123456781' },
      { Reco_Id: 3, Reco_Name: 'Suresh Nair', Reco_Phone: '9123456782' },
      { Reco_Id: 4, Reco_Name: 'Kavita Joshi', Reco_Phone: '9123456783' },
      { Reco_Id: 5, Reco_Name: 'Manoj Gupta', Reco_Phone: '9123456784' },
      { Reco_Id: 6, Reco_Name: 'Pooja Iyer', Reco_Phone: '9123456785' },
      { Reco_Id: 7, Reco_Name: 'Ravi Shankar', Reco_Phone: '9123456786' },
      { Reco_Id: 8, Reco_Name: 'Deepa Menon', Reco_Phone: '9123456787' }
    ];
    await RecordingStaff.insertMany(staff);
    console.log(`✅ Inserted ${staff.length} recording staff`);
    
    // 4. BLOOD DONORS
    console.log('\n🩸 Seeding Blood Donors...');
    const donors = [
      { Bd_Id: 1, Bd_Name: 'Arjun Mehta', Bd_Age: 28, Bd_Sex: 'M', Bd_Phone: '9988776655', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-01-15'), City_Id: 1 },
      { Bd_Id: 2, Bd_Name: 'Priya Nair', Bd_Age: 32, Bd_Sex: 'F', Bd_Phone: '9988776656', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-02-20'), City_Id: 2 },
      { Bd_Id: 3, Bd_Name: 'Rohit Sharma', Bd_Age: 45, Bd_Sex: 'M', Bd_Phone: '9988776657', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-03-10'), City_Id: 3 },
      { Bd_Id: 4, Bd_Name: 'Anjali Gupta', Bd_Age: 27, Bd_Sex: 'F', Bd_Phone: '9988776658', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2024-04-05'), City_Id: 4 },
      { Bd_Id: 5, Bd_Name: 'Vikram Rao', Bd_Age: 38, Bd_Sex: 'M', Bd_Phone: '9988776659', Bd_Bgroup: 'A-', Bd_reg_Date: new Date('2024-05-12'), City_Id: 5 },
      { Bd_Id: 6, Bd_Name: 'Sneha Reddy', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776660', Bd_Bgroup: 'O-', Bd_reg_Date: new Date('2024-06-18'), City_Id: 1 },
      { Bd_Id: 7, Bd_Name: 'Karthik Kumar', Bd_Age: 41, Bd_Sex: 'M', Bd_Phone: '9988776661', Bd_Bgroup: 'B-', Bd_reg_Date: new Date('2024-07-22'), City_Id: 6 },
      { Bd_Id: 8, Bd_Name: 'Neha Singh', Bd_Age: 26, Bd_Sex: 'F', Bd_Phone: '9988776662', Bd_Bgroup: 'AB-', Bd_reg_Date: new Date('2024-08-30'), City_Id: 7 },
      { Bd_Id: 9, Bd_Name: 'Aditya Patel', Bd_Age: 35, Bd_Sex: 'M', Bd_Phone: '9988776663', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-09-14'), City_Id: 8 },
      { Bd_Id: 10, Bd_Name: 'Divya Iyer', Bd_Age: 31, Bd_Sex: 'F', Bd_Phone: '9988776664', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-10-08'), City_Id: 9 },
      { Bd_Id: 11, Bd_Name: 'Sanjay Verma', Bd_Age: 44, Bd_Sex: 'M', Bd_Phone: '9988776665', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-11-20'), City_Id: 10 },
      { Bd_Id: 12, Bd_Name: 'Kavita Desai', Bd_Age: 30, Bd_Sex: 'F', Bd_Phone: '9988776666', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-12-05'), City_Id: 2 },
      { Bd_Id: 13, Bd_Name: 'Rajesh Nair', Bd_Age: 39, Bd_Sex: 'M', Bd_Phone: '9988776667', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2025-01-10'), City_Id: 3 },
      { Bd_Id: 14, Bd_Name: 'Pooja Menon', Bd_Age: 28, Bd_Sex: 'F', Bd_Phone: '9988776668', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2025-02-15'), City_Id: 4 },
      { Bd_Id: 15, Bd_Name: 'Amit Joshi', Bd_Age: 42, Bd_Sex: 'M', Bd_Phone: '9988776669', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2025-03-20'), City_Id: 5 },
      { Bd_Id: 16, Bd_Name: 'Ritu Sharma', Bd_Age: 33, Bd_Sex: 'F', Bd_Phone: '9988776670', Bd_Bgroup: 'A-', Bd_reg_Date: new Date('2025-04-25'), City_Id: 6 },
      { Bd_Id: 17, Bd_Name: 'Manoj Kumar', Bd_Age: 37, Bd_Sex: 'M', Bd_Phone: '9988776671', Bd_Bgroup: 'O-', Bd_reg_Date: new Date('2025-05-30'), City_Id: 7 },
      { Bd_Id: 18, Bd_Name: 'Deepika Singh', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776672', Bd_Bgroup: 'B-', Bd_reg_Date: new Date('2025-06-10'), City_Id: 8 },
      { Bd_Id: 19, Bd_Name: 'Sunil Reddy', Bd_Age: 46, Bd_Sex: 'M', Bd_Phone: '9988776673', Bd_Bgroup: 'AB-', Bd_reg_Date: new Date('2025-07-15'), City_Id: 9 },
      { Bd_Id: 20, Bd_Name: 'Anita Patel', Bd_Age: 34, Bd_Sex: 'F', Bd_Phone: '9988776674', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2025-08-20'), City_Id: 10 }
    ];
    await BloodDonor.insertMany(donors);
    console.log(`✅ Inserted ${donors.length} blood donors`);
    
    // 5. BLOOD SPECIMENS
    console.log('\n💉 Seeding Blood Specimens...');
    const specimens = [
      { Specimen_Id: 1, B_Group: 'A+', Status: 'available' },
      { Specimen_Id: 2, B_Group: 'A+', Status: 'available' },
      { Specimen_Id: 3, B_Group: 'O+', Status: 'available' },
      { Specimen_Id: 4, B_Group: 'O+', Status: 'reserved' },
      { Specimen_Id: 5, B_Group: 'B+', Status: 'available' },
      { Specimen_Id: 6, B_Group: 'B+', Status: 'used' },
      { Specimen_Id: 7, B_Group: 'AB+', Status: 'available' },
      { Specimen_Id: 8, B_Group: 'A-', Status: 'available' },
      { Specimen_Id: 9, B_Group: 'A-', Status: 'reserved' },
      { Specimen_Id: 10, B_Group: 'O-', Status: 'available' },
      { Specimen_Id: 11, B_Group: 'O-', Status: 'available' },
      { Specimen_Id: 12, B_Group: 'B-', Status: 'used' },
      { Specimen_Id: 13, B_Group: 'AB-', Status: 'available' },
      { Specimen_Id: 14, B_Group: 'A+', Status: 'available' },
      { Specimen_Id: 15, B_Group: 'O+', Status: 'reserved' },
      { Specimen_Id: 16, B_Group: 'B+', Status: 'available' },
      { Specimen_Id: 17, B_Group: 'AB+', Status: 'used' },
      { Specimen_Id: 18, B_Group: 'A-', Status: 'available' },
      { Specimen_Id: 19, B_Group: 'O-', Status: 'available' },
      { Specimen_Id: 20, B_Group: 'B-', Status: 'available' }
    ];
    await BloodSpecimen.insertMany(specimens);
    console.log(`✅ Inserted ${specimens.length} blood specimens`);
    
    // 6. RECIPIENTS
    console.log('\n🏥 Seeding Recipients...');
    const recipients = [
      { Reci_Id: 1, Reci_Name: 'Ramesh Iyer', Reci_Age: 52, Reci_Sex: 'M', Reci_Phone: '9123123123', Reci_Bgrp: 'A+', Reci_Bqty: 2, Reci_Date: new Date('2025-01-10'), City_Id: 1 },
      { Reci_Id: 2, Reci_Name: 'Lakshmi Nair', Reci_Age: 45, Reci_Sex: 'F', Reci_Phone: '9123123124', Reci_Bgrp: 'O+', Reci_Bqty: 1, Reci_Date: new Date('2025-02-15'), City_Id: 2 },
      { Reci_Id: 3, Reci_Name: 'Suresh Kumar', Reci_Age: 38, Reci_Sex: 'M', Reci_Phone: '9123123125', Reci_Bgrp: 'B+', Reci_Bqty: 3, Reci_Date: new Date('2025-03-20'), City_Id: 3 },
      { Reci_Id: 4, Reci_Name: 'Meera Reddy', Reci_Age: 41, Reci_Sex: 'F', Reci_Phone: '9123123126', Reci_Bgrp: 'AB+', Reci_Bqty: 2, Reci_Date: new Date('2025-04-10'), City_Id: 4 },
      { Reci_Id: 5, Reci_Name: 'Vijay Singh', Reci_Age: 55, Reci_Sex: 'M', Reci_Phone: '9123123127', Reci_Bgrp: 'A-', Reci_Bqty: 1, Reci_Date: new Date('2025-05-05'), City_Id: 5 },
      { Reci_Id: 6, Reci_Name: 'Radha Sharma', Reci_Age: 48, Reci_Sex: 'F', Reci_Phone: '9123123128', Reci_Bgrp: 'O-', Reci_Bqty: 2, Reci_Date: new Date('2025-06-12'), City_Id: 6 },
      { Reci_Id: 7, Reci_Name: 'Arun Patel', Reci_Age: 62, Reci_Sex: 'M', Reci_Phone: '9123123129', Reci_Bgrp: 'B-', Reci_Bqty: 1, Reci_Date: new Date('2025-07-18'), City_Id: 7 },
      { Reci_Id: 8, Reci_Name: 'Sunita Desai', Reci_Age: 50, Reci_Sex: 'F', Reci_Phone: '9123123130', Reci_Bgrp: 'AB-', Reci_Bqty: 3, Reci_Date: new Date('2025-08-22'), City_Id: 8 },
      { Reci_Id: 9, Reci_Name: 'Ravi Verma', Reci_Age: 44, Reci_Sex: 'M', Reci_Phone: '9123123131', Reci_Bgrp: 'A+', Reci_Bqty: 2, Reci_Date: new Date('2025-09-05'), City_Id: 9 },
      { Reci_Id: 10, Reci_Name: 'Kalpana Joshi', Reci_Age: 39, Reci_Sex: 'F', Reci_Phone: '9123123132', Reci_Bgrp: 'O+', Reci_Bqty: 1, Reci_Date: new Date('2025-10-01'), City_Id: 10 },
      { Reci_Id: 11, Reci_Name: 'Prakash Menon', Reci_Age: 58, Reci_Sex: 'M', Reci_Phone: '9123123133', Reci_Bgrp: 'B+', Reci_Bqty: 2, Reci_Date: new Date('2025-01-25'), City_Id: 1 },
      { Reci_Id: 12, Reci_Name: 'Savita Gupta', Reci_Age: 46, Reci_Sex: 'F', Reci_Phone: '9123123134', Reci_Bgrp: 'A+', Reci_Bqty: 3, Reci_Date: new Date('2025-02-28'), City_Id: 2 },
      { Reci_Id: 13, Reci_Name: 'Dinesh Rao', Reci_Age: 53, Reci_Sex: 'M', Reci_Phone: '9123123135', Reci_Bgrp: 'O+', Reci_Bqty: 1, Reci_Date: new Date('2025-03-15'), City_Id: 3 },
      { Reci_Id: 14, Reci_Name: 'Usha Singh', Reci_Age: 49, Reci_Sex: 'F', Reci_Phone: '9123123136', Reci_Bgrp: 'AB+', Reci_Bqty: 2, Reci_Date: new Date('2025-04-20'), City_Id: 4 },
      { Reci_Id: 15, Reci_Name: 'Mahesh Kumar', Reci_Age: 61, Reci_Sex: 'M', Reci_Phone: '9123123137', Reci_Bgrp: 'B+', Reci_Bqty: 1, Reci_Date: new Date('2025-05-25'), City_Id: 5 },
      { Reci_Id: 16, Reci_Name: 'Geeta Nair', Reci_Age: 42, Reci_Sex: 'F', Reci_Phone: '9123123138', Reci_Bgrp: 'A-', Reci_Bqty: 2, Reci_Date: new Date('2025-06-30'), City_Id: 6 },
      { Reci_Id: 17, Reci_Name: 'Ashok Reddy', Reci_Age: 56, Reci_Sex: 'M', Reci_Phone: '9123123139', Reci_Bgrp: 'O-', Reci_Bqty: 3, Reci_Date: new Date('2025-07-08'), City_Id: 7 },
      { Reci_Id: 18, Reci_Name: 'Vandana Patel', Reci_Age: 47, Reci_Sex: 'F', Reci_Phone: '9123123140', Reci_Bgrp: 'B-', Reci_Bqty: 1, Reci_Date: new Date('2025-08-12'), City_Id: 8 },
      { Reci_Id: 19, Reci_Name: 'Naresh Sharma', Reci_Age: 54, Reci_Sex: 'M', Reci_Phone: '9123123141', Reci_Bgrp: 'AB-', Reci_Bqty: 2, Reci_Date: new Date('2025-09-18'), City_Id: 9 },
      { Reci_Id: 20, Reci_Name: 'Shobha Iyer', Reci_Age: 43, Reci_Sex: 'F', Reci_Phone: '9123123142', Reci_Bgrp: 'A+', Reci_Bqty: 1, Reci_Date: new Date('2025-10-10'), City_Id: 10 }
    ];
    await Recipient.insertMany(recipients);
    console.log(`✅ Inserted ${recipients.length} recipients`);
    
    // 7. HOSPITALS
    console.log('\n🏨 Seeding Hospitals...');
    const hospitals = [
      { Hosp_Id: 1, Hosp_Name: 'Apollo Hospital', Hosp_Phone: '9876501234', Hosp_Needed_Bgrp: 'A+', City_Id: 1 },
      { Hosp_Id: 2, Hosp_Name: 'Fortis Healthcare', Hosp_Phone: '9876501235', Hosp_Needed_Bgrp: 'O+', City_Id: 2 },
      { Hosp_Id: 3, Hosp_Name: 'Max Hospital', Hosp_Phone: '9876501236', Hosp_Needed_Bgrp: 'B+', City_Id: 3 },
      { Hosp_Id: 4, Hosp_Name: 'Manipal Hospital', Hosp_Phone: '9876501237', Hosp_Needed_Bgrp: 'AB+', City_Id: 4 },
      { Hosp_Id: 5, Hosp_Name: 'AIIMS', Hosp_Phone: '9876501238', Hosp_Needed_Bgrp: 'A-', City_Id: 5 },
      { Hosp_Id: 6, Hosp_Name: 'Lilavati Hospital', Hosp_Phone: '9876501239', Hosp_Needed_Bgrp: 'O-', City_Id: 6 },
      { Hosp_Id: 7, Hosp_Name: 'Narayana Health', Hosp_Phone: '9876501240', Hosp_Needed_Bgrp: 'B-', City_Id: 7 },
      { Hosp_Id: 8, Hosp_Name: 'Columbia Asia', Hosp_Phone: '9876501241', Hosp_Needed_Bgrp: 'AB-', City_Id: 8 },
      { Hosp_Id: 9, Hosp_Name: 'Ruby Hall Clinic', Hosp_Phone: '9876501242', Hosp_Needed_Bgrp: 'A+', City_Id: 9 },
      { Hosp_Id: 10, Hosp_Name: 'Kokilaben Hospital', Hosp_Phone: '9876501243', Hosp_Needed_Bgrp: 'O+', City_Id: 10 },
      { Hosp_Id: 11, Hosp_Name: 'Medanta Hospital', Hosp_Phone: '9876501244', Hosp_Needed_Bgrp: 'B+', City_Id: 1 },
      { Hosp_Id: 12, Hosp_Name: 'BLK Super Speciality', Hosp_Phone: '9876501245', Hosp_Needed_Bgrp: 'A+', City_Id: 2 },
      { Hosp_Id: 13, Hosp_Name: 'Artemis Hospital', Hosp_Phone: '9876501246', Hosp_Needed_Bgrp: 'O+', City_Id: 3 },
      { Hosp_Id: 14, Hosp_Name: 'Jaypee Hospital', Hosp_Phone: '9876501247', Hosp_Needed_Bgrp: 'AB+', City_Id: 4 },
      { Hosp_Id: 15, Hosp_Name: 'Yashoda Hospital', Hosp_Phone: '9876501248', Hosp_Needed_Bgrp: 'B+', City_Id: 5 },
      { Hosp_Id: 16, Hosp_Name: 'Global Hospital', Hosp_Phone: '9876501249', Hosp_Needed_Bgrp: 'A-', City_Id: 6 },
      { Hosp_Id: 17, Hosp_Name: 'Wockhardt Hospital', Hosp_Phone: '9876501250', Hosp_Needed_Bgrp: 'O-', City_Id: 7 },
      { Hosp_Id: 18, Hosp_Name: 'Care Hospital', Hosp_Phone: '9876501251', Hosp_Needed_Bgrp: 'B-', City_Id: 8 },
      { Hosp_Id: 19, Hosp_Name: 'Rainbow Hospital', Hosp_Phone: '9876501252', Hosp_Needed_Bgrp: 'AB-', City_Id: 9 },
      { Hosp_Id: 20, Hosp_Name: 'Continental Hospital', Hosp_Phone: '9876501253', Hosp_Needed_Bgrp: 'A+', City_Id: 10 }
    ];
    await HospitalInfo.insertMany(hospitals);
    console.log(`✅ Inserted ${hospitals.length} hospitals`);
    
    // 8. REGISTERS (Recording_staff → Blood_Donor)
    console.log('\n📋 Seeding Registers (Staff-Donor relationships)...');
    const registers = [
      { Reco_Id: 1, Bd_Id: 1 },
      { Reco_Id: 1, Bd_Id: 2 },
      { Reco_Id: 2, Bd_Id: 3 },
      { Reco_Id: 2, Bd_Id: 4 },
      { Reco_Id: 3, Bd_Id: 5 },
      { Reco_Id: 3, Bd_Id: 6 },
      { Reco_Id: 4, Bd_Id: 7 },
      { Reco_Id: 4, Bd_Id: 8 },
      { Reco_Id: 5, Bd_Id: 9 },
      { Reco_Id: 5, Bd_Id: 10 },
      { Reco_Id: 6, Bd_Id: 11 },
      { Reco_Id: 6, Bd_Id: 12 },
      { Reco_Id: 7, Bd_Id: 13 },
      { Reco_Id: 7, Bd_Id: 14 },
      { Reco_Id: 8, Bd_Id: 15 },
      { Reco_Id: 1, Bd_Id: 16 },
      { Reco_Id: 2, Bd_Id: 17 },
      { Reco_Id: 3, Bd_Id: 18 },
      { Reco_Id: 4, Bd_Id: 19 },
      { Reco_Id: 5, Bd_Id: 20 }
    ];
    await Registers.insertMany(registers);
    console.log(`✅ Inserted ${registers.length} register relationships`);
    
    // 9. RECORDS (Recording_staff → Recipient)
    console.log('\n📊 Seeding Records (Staff-Recipient relationships)...');
    const records = [
      { Reco_Id: 1, Reci_Id: 1 },
      { Reco_Id: 1, Reci_Id: 2 },
      { Reco_Id: 2, Reci_Id: 3 },
      { Reco_Id: 2, Reci_Id: 4 },
      { Reco_Id: 3, Reci_Id: 5 },
      { Reco_Id: 3, Reci_Id: 6 },
      { Reco_Id: 4, Reci_Id: 7 },
      { Reco_Id: 4, Reci_Id: 8 },
      { Reco_Id: 5, Reci_Id: 9 },
      { Reco_Id: 5, Reci_Id: 10 },
      { Reco_Id: 6, Reci_Id: 11 },
      { Reco_Id: 6, Reci_Id: 12 },
      { Reco_Id: 7, Reci_Id: 13 },
      { Reco_Id: 7, Reci_Id: 14 },
      { Reco_Id: 8, Reci_Id: 15 },
      { Reco_Id: 1, Reci_Id: 16 },
      { Reco_Id: 2, Reci_Id: 17 },
      { Reco_Id: 3, Reci_Id: 18 },
      { Reco_Id: 4, Reci_Id: 19 },
      { Reco_Id: 5, Reci_Id: 20 }
    ];
    await Records.insertMany(records);
    console.log(`✅ Inserted ${records.length} record relationships`);
    
    // 10. REQUEST_TO (Recipient → BB_Manager)
    console.log('\n🔗 Seeding Request_To (Recipient-Manager relationships)...');
    const requestTo = [
      { Reci_Id: 1, M_Id: 1 },
      { Reci_Id: 2, M_Id: 1 },
      { Reci_Id: 3, M_Id: 2 },
      { Reci_Id: 4, M_Id: 2 },
      { Reci_Id: 5, M_Id: 3 },
      { Reci_Id: 6, M_Id: 3 },
      { Reci_Id: 7, M_Id: 4 },
      { Reci_Id: 8, M_Id: 4 },
      { Reci_Id: 9, M_Id: 5 },
      { Reci_Id: 10, M_Id: 5 },
      { Reci_Id: 11, M_Id: 1 },
      { Reci_Id: 12, M_Id: 2 },
      { Reci_Id: 13, M_Id: 3 },
      { Reci_Id: 14, M_Id: 4 },
      { Reci_Id: 15, M_Id: 5 },
      { Reci_Id: 16, M_Id: 1 },
      { Reci_Id: 17, M_Id: 2 },
      { Reci_Id: 18, M_Id: 3 },
      { Reci_Id: 19, M_Id: 4 },
      { Reci_Id: 20, M_Id: 5 }
    ];
    await RequestTo.insertMany(requestTo);
    console.log(`✅ Inserted ${requestTo.length} request relationships`);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log(`
📊 Summary:
   • ${cities.length} Cities
   • ${managers.length} BB Managers
   • ${staff.length} Recording Staff
   • ${donors.length} Blood Donors
   • ${specimens.length} Blood Specimens
   • ${recipients.length} Recipients
   • ${hospitals.length} Hospitals
   • ${registers.length} Register Relationships
   • ${records.length} Record Relationships
   • ${requestTo.length} Request Relationships
   ────────────────────────────────
   📦 TOTAL: ${cities.length + managers.length + staff.length + donors.length + specimens.length + recipients.length + hospitals.length + registers.length + records.length + requestTo.length} records
    `);
    
    // Blood Group Distribution
    const bgroupCounts = {};
    donors.forEach(d => {
      bgroupCounts[d.Bd_Bgroup] = (bgroupCounts[d.Bd_Bgroup] || 0) + 1;
    });
    console.log('🩸 Blood Group Distribution (Donors):');
    Object.entries(bgroupCounts).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
      console.log(`   ${group.padEnd(4)} : ${'█'.repeat(count)} (${count})`);
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
