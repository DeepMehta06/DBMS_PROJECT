require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');
const Donor = require('./models/Donor');
const Recipient = require('./models/Recipient');
const Hospital = require('./models/Hospital');
const BloodSpecimen = require('./models/BloodSpecimen');
const BB_Manager = require('./models/BB_Manager');
const Recording_Staff = require('./models/Recording_Staff');
const Registers = require('./models/Registers');
const Records = require('./models/Records');
const Request_To = require('./models/Request_To');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    console.log('🗑️  Clearing existing data...');
    await City.deleteMany({});
    await Donor.deleteMany({});
    await Recipient.deleteMany({});
    await Hospital.deleteMany({});
    await BloodSpecimen.deleteMany({});
    await BB_Manager.deleteMany({});
    await Recording_Staff.deleteMany({});
    await Registers.deleteMany({});
    await Records.deleteMany({});
    await Request_To.deleteMany({});

    // 1. Create Cities
    console.log('🏙️  Creating cities...');
    const cities = await City.create([
      { City_Id: 1, City_Name: 'Mumbai' },
      { City_Id: 2, City_Name: 'Delhi' },
      { City_Id: 3, City_Name: 'Bangalore' },
      { City_Id: 4, City_Name: 'Pune' },
      { City_Id: 5, City_Name: 'Hyderabad' },
      { City_Id: 6, City_Name: 'Chennai' },
      { City_Id: 7, City_Name: 'Kolkata' },
      { City_Id: 8, City_Name: 'Ahmedabad' },
      { City_Id: 9, City_Name: 'Jaipur' },
      { City_Id: 10, City_Name: 'Surat' }
    ]);
    console.log(`✅ Created ${cities.length} cities`);

    // 2. Create BB_Managers
    console.log('👔 Creating BB Managers...');
    const managers = await BB_Manager.create([
      { M_Id: 1, M_Name: 'Dr. Rajesh Kumar', M_Phone: '9876543210' },
      { M_Id: 2, M_Name: 'Dr. Priya Sharma', M_Phone: '9876543211' },
      { M_Id: 3, M_Name: 'Dr. Amit Patel', M_Phone: '9876543212' },
      { M_Id: 4, M_Name: 'Dr. Sneha Desai', M_Phone: '9876543213' },
      { M_Id: 5, M_Name: 'Dr. Vikram Singh', M_Phone: '9876543214' }
    ]);
    console.log(`✅ Created ${managers.length} BB Managers`);

    // 3. Create Recording_Staff
    console.log('📝 Creating Recording Staff...');
    const staff = await Recording_Staff.create([
      { Reco_Id: 1, Reco_Name: 'Ramesh Verma', Reco_Phone: '9123456780' },
      { Reco_Id: 2, Reco_Name: 'Sunita Rao', Reco_Phone: '9123456781' },
      { Reco_Id: 3, Reco_Name: 'Karan Mehta', Reco_Phone: '9123456782' },
      { Reco_Id: 4, Reco_Name: 'Pooja Gupta', Reco_Phone: '9123456783' },
      { Reco_Id: 5, Reco_Name: 'Arjun Nair', Reco_Phone: '9123456784' },
      { Reco_Id: 6, Reco_Name: 'Neha Joshi', Reco_Phone: '9123456785' },
      { Reco_Id: 7, Reco_Name: 'Rohit Das', Reco_Phone: '9123456786' },
      { Reco_Id: 8, Reco_Name: 'Anjali Shah', Reco_Phone: '9123456787' }
    ]);
    console.log(`✅ Created ${staff.length} Recording Staff`);

    // 4. Create Blood Donors
    console.log('🩸 Creating Blood Donors...');
    const donors = await Donor.create([
      { Bd_Id: 1, Bd_Name: 'Rahul Sharma', Bd_Age: 28, Bd_Sex: 'M', Bd_Phone: '9988776655', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-01-15'), City_Id: 1 },
      { Bd_Id: 2, Bd_Name: 'Priya Singh', Bd_Age: 32, Bd_Sex: 'F', Bd_Phone: '9988776656', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-02-10'), City_Id: 2 },
      { Bd_Id: 3, Bd_Name: 'Amit Kumar', Bd_Age: 25, Bd_Sex: 'M', Bd_Phone: '9988776657', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-03-05'), City_Id: 3 },
      { Bd_Id: 4, Bd_Name: 'Sneha Patel', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776658', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2024-01-20'), City_Id: 1 },
      { Bd_Id: 5, Bd_Name: 'Vikram Reddy', Bd_Age: 35, Bd_Sex: 'M', Bd_Phone: '9988776659', Bd_Bgroup: 'A-', Bd_reg_Date: new Date('2024-02-15'), City_Id: 5 },
      { Bd_Id: 6, Bd_Name: 'Anjali Verma', Bd_Age: 27, Bd_Sex: 'F', Bd_Phone: '9988776660', Bd_Bgroup: 'O-', Bd_reg_Date: new Date('2024-03-10'), City_Id: 4 },
      { Bd_Id: 7, Bd_Name: 'Rajesh Gupta', Bd_Age: 40, Bd_Sex: 'M', Bd_Phone: '9988776661', Bd_Bgroup: 'B-', Bd_reg_Date: new Date('2024-01-25'), City_Id: 2 },
      { Bd_Id: 8, Bd_Name: 'Neha Jain', Bd_Age: 24, Bd_Sex: 'F', Bd_Phone: '9988776662', Bd_Bgroup: 'AB-', Bd_reg_Date: new Date('2024-02-20'), City_Id: 3 },
      { Bd_Id: 9, Bd_Name: 'Arjun Nair', Bd_Age: 31, Bd_Sex: 'M', Bd_Phone: '9988776663', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-03-15'), City_Id: 6 },
      { Bd_Id: 10, Bd_Name: 'Pooja Desai', Bd_Age: 26, Bd_Sex: 'F', Bd_Phone: '9988776664', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-01-30'), City_Id: 7 },
      { Bd_Id: 11, Bd_Name: 'Karan Mehta', Bd_Age: 33, Bd_Sex: 'M', Bd_Phone: '9988776665', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-02-25'), City_Id: 8 },
      { Bd_Id: 12, Bd_Name: 'Divya Shah', Bd_Age: 28, Bd_Sex: 'F', Bd_Phone: '9988776666', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2024-03-20'), City_Id: 9 },
      { Bd_Id: 13, Bd_Name: 'Suresh Rao', Bd_Age: 37, Bd_Sex: 'M', Bd_Phone: '9988776667', Bd_Bgroup: 'A-', Bd_reg_Date: new Date('2024-01-10'), City_Id: 10 },
      { Bd_Id: 14, Bd_Name: 'Kavita Das', Bd_Age: 30, Bd_Sex: 'F', Bd_Phone: '9988776668', Bd_Bgroup: 'O-', Bd_reg_Date: new Date('2024-02-05'), City_Id: 1 },
      { Bd_Id: 15, Bd_Name: 'Manish Kumar', Bd_Age: 34, Bd_Sex: 'M', Bd_Phone: '9988776669', Bd_Bgroup: 'B-', Bd_reg_Date: new Date('2024-03-01'), City_Id: 2 },
      { Bd_Id: 16, Bd_Name: 'Ritu Singh', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776670', Bd_Bgroup: 'AB-', Bd_reg_Date: new Date('2024-01-05'), City_Id: 3 },
      { Bd_Id: 17, Bd_Name: 'Sanjay Patel', Bd_Age: 36, Bd_Sex: 'M', Bd_Phone: '9988776671', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-02-28'), City_Id: 4 },
      { Bd_Id: 18, Bd_Name: 'Meera Reddy', Bd_Age: 27, Bd_Sex: 'F', Bd_Phone: '9988776672', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-03-25'), City_Id: 5 },
      { Bd_Id: 19, Bd_Name: 'Arun Verma', Bd_Age: 32, Bd_Sex: 'M', Bd_Phone: '9988776673', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-01-12'), City_Id: 6 },
      { Bd_Id: 20, Bd_Name: 'Swati Gupta', Bd_Age: 25, Bd_Sex: 'F', Bd_Phone: '9988776674', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2024-02-18'), City_Id: 7 }
    ]);
    console.log(`✅ Created ${donors.length} Blood Donors`);

    // 5. Create Blood Specimens
    console.log('🧪 Creating Blood Specimens...');
    const specimens = await BloodSpecimen.create([
      { Specimen_Id: 1, B_Group: 'A+', Status: 'available', specimenNumber: 'SP001', collectionDate: new Date('2024-01-15'), expiryDate: new Date('2024-05-15') },
      { Specimen_Id: 2, B_Group: 'O+', Status: 'available', specimenNumber: 'SP002', collectionDate: new Date('2024-02-10'), expiryDate: new Date('2024-06-10') },
      { Specimen_Id: 3, B_Group: 'B+', Status: 'available', specimenNumber: 'SP003', collectionDate: new Date('2024-03-05'), expiryDate: new Date('2024-07-05') },
      { Specimen_Id: 4, B_Group: 'AB+', Status: 'reserved', specimenNumber: 'SP004', collectionDate: new Date('2024-01-20'), expiryDate: new Date('2024-05-20') },
      { Specimen_Id: 5, B_Group: 'A-', Status: 'available', specimenNumber: 'SP005', collectionDate: new Date('2024-02-15'), expiryDate: new Date('2024-06-15') },
      { Specimen_Id: 6, B_Group: 'O-', Status: 'available', specimenNumber: 'SP006', collectionDate: new Date('2024-03-10'), expiryDate: new Date('2024-07-10') },
      { Specimen_Id: 7, B_Group: 'B-', Status: 'used', specimenNumber: 'SP007', collectionDate: new Date('2024-01-25'), expiryDate: new Date('2024-05-25') },
      { Specimen_Id: 8, B_Group: 'AB-', Status: 'available', specimenNumber: 'SP008', collectionDate: new Date('2024-02-20'), expiryDate: new Date('2024-06-20') },
      { Specimen_Id: 9, B_Group: 'A+', Status: 'available', specimenNumber: 'SP009', collectionDate: new Date('2024-03-15'), expiryDate: new Date('2024-07-15') },
      { Specimen_Id: 10, B_Group: 'O+', Status: 'reserved', specimenNumber: 'SP010', collectionDate: new Date('2024-01-30'), expiryDate: new Date('2024-05-30') },
      { Specimen_Id: 11, B_Group: 'B+', Status: 'available', specimenNumber: 'SP011', collectionDate: new Date('2024-02-25'), expiryDate: new Date('2024-06-25') },
      { Specimen_Id: 12, B_Group: 'AB+', Status: 'available', specimenNumber: 'SP012', collectionDate: new Date('2024-03-20'), expiryDate: new Date('2024-07-20') },
      { Specimen_Id: 13, B_Group: 'A-', Status: 'available', specimenNumber: 'SP013', collectionDate: new Date('2024-01-10'), expiryDate: new Date('2024-05-10') },
      { Specimen_Id: 14, B_Group: 'O-', Status: 'available', specimenNumber: 'SP014', collectionDate: new Date('2024-02-05'), expiryDate: new Date('2024-06-05') },
      { Specimen_Id: 15, B_Group: 'B-', Status: 'available', specimenNumber: 'SP015', collectionDate: new Date('2024-03-01'), expiryDate: new Date('2024-07-01') },
      { Specimen_Id: 16, B_Group: 'AB-', Status: 'available', specimenNumber: 'SP016', collectionDate: new Date('2024-01-05'), expiryDate: new Date('2024-05-05') },
      { Specimen_Id: 17, B_Group: 'A+', Status: 'available', specimenNumber: 'SP017', collectionDate: new Date('2024-02-28'), expiryDate: new Date('2024-06-28') },
      { Specimen_Id: 18, B_Group: 'O+', Status: 'available', specimenNumber: 'SP018', collectionDate: new Date('2024-03-25'), expiryDate: new Date('2024-07-25') },
      { Specimen_Id: 19, B_Group: 'B+', Status: 'available', specimenNumber: 'SP019', collectionDate: new Date('2024-01-12'), expiryDate: new Date('2024-05-12') },
      { Specimen_Id: 20, B_Group: 'AB+', Status: 'available', specimenNumber: 'SP020', collectionDate: new Date('2024-02-18'), expiryDate: new Date('2024-06-18') }
    ]);
    console.log(`✅ Created ${specimens.length} Blood Specimens`);

    // 6. Create Recipients
    console.log('🏥 Creating Recipients...');
    const recipients = await Recipient.create([
      { Reci_Id: 1, Reci_Name: 'Ramesh Kumar', Reci_Age: 45, Reci_Sex: 'M', Reci_Phone: '9111222333', Reci_Bgrp: 'A+', Reci_Bqty: 2, Reci_Date: new Date('2024-03-01'), City_Id: 1, status: 'pending' },
      { Reci_Id: 2, Reci_Name: 'Sita Devi', Reci_Age: 38, Reci_Sex: 'F', Reci_Phone: '9111222334', Reci_Bgrp: 'O+', Reci_Bqty: 1, Reci_Date: new Date('2024-03-05'), City_Id: 2, status: 'approved' },
      { Reci_Id: 3, Reci_Name: 'Mohan Lal', Reci_Age: 52, Reci_Sex: 'M', Reci_Phone: '9111222335', Reci_Bgrp: 'B+', Reci_Bqty: 3, Reci_Date: new Date('2024-03-10'), City_Id: 3, status: 'fulfilled' },
      { Reci_Id: 4, Reci_Name: 'Geeta Rani', Reci_Age: 41, Reci_Sex: 'F', Reci_Phone: '9111222336', Reci_Bgrp: 'AB+', Reci_Bqty: 1, Reci_Date: new Date('2024-03-12'), City_Id: 1, status: 'pending' },
      { Reci_Id: 5, Reci_Name: 'Sunil Sharma', Reci_Age: 48, Reci_Sex: 'M', Reci_Phone: '9111222337', Reci_Bgrp: 'A-', Reci_Bqty: 2, Reci_Date: new Date('2024-03-15'), City_Id: 4, status: 'approved' },
      { Reci_Id: 6, Reci_Name: 'Lakshmi Bai', Reci_Age: 35, Reci_Sex: 'F', Reci_Phone: '9111222338', Reci_Bgrp: 'O-', Reci_Bqty: 1, Reci_Date: new Date('2024-03-18'), City_Id: 5, status: 'pending' },
      { Reci_Id: 7, Reci_Name: 'Harish Patel', Reci_Age: 50, Reci_Sex: 'M', Reci_Phone: '9111222339', Reci_Bgrp: 'B-', Reci_Bqty: 2, Reci_Date: new Date('2024-03-20'), City_Id: 2, status: 'rejected' },
      { Reci_Id: 8, Reci_Name: 'Radha Krishnan', Reci_Age: 43, Reci_Sex: 'F', Reci_Phone: '9111222340', Reci_Bgrp: 'AB-', Reci_Bqty: 1, Reci_Date: new Date('2024-03-22'), City_Id: 6, status: 'approved' },
      { Reci_Id: 9, Reci_Name: 'Deepak Singh', Reci_Age: 39, Reci_Sex: 'M', Reci_Phone: '9111222341', Reci_Bgrp: 'A+', Reci_Bqty: 3, Reci_Date: new Date('2024-03-24'), City_Id: 7, status: 'pending' },
      { Reci_Id: 10, Reci_Name: 'Kamala Das', Reci_Age: 46, Reci_Sex: 'F', Reci_Phone: '9111222342', Reci_Bgrp: 'O+', Reci_Bqty: 2, Reci_Date: new Date('2024-03-26'), City_Id: 8, status: 'fulfilled' },
      { Reci_Id: 11, Reci_Name: 'Ganesh Rao', Reci_Age: 55, Reci_Sex: 'M', Reci_Phone: '9111222343', Reci_Bgrp: 'B+', Reci_Bqty: 1, Reci_Date: new Date('2024-03-28'), City_Id: 9, status: 'pending' },
      { Reci_Id: 12, Reci_Name: 'Parvati Nair', Reci_Age: 37, Reci_Sex: 'F', Reci_Phone: '9111222344', Reci_Bgrp: 'AB+', Reci_Bqty: 2, Reci_Date: new Date('2024-03-29'), City_Id: 10, status: 'approved' },
      { Reci_Id: 13, Reci_Name: 'Krishna Murthy', Reci_Age: 51, Reci_Sex: 'M', Reci_Phone: '9111222345', Reci_Bgrp: 'A-', Reci_Bqty: 1, Reci_Date: new Date('2024-03-30'), City_Id: 1, status: 'pending' },
      { Reci_Id: 14, Reci_Name: 'Saraswati Joshi', Reci_Age: 44, Reci_Sex: 'F', Reci_Phone: '9111222346', Reci_Bgrp: 'O-', Reci_Bqty: 3, Reci_Date: new Date('2024-03-31'), City_Id: 2, status: 'fulfilled' },
      { Reci_Id: 15, Reci_Name: 'Vishnu Reddy', Reci_Age: 49, Reci_Sex: 'M', Reci_Phone: '9111222347', Reci_Bgrp: 'B-', Reci_Bqty: 1, Reci_Date: new Date('2024-04-01'), City_Id: 3, status: 'pending' },
      { Reci_Id: 16, Reci_Name: 'Durga Verma', Reci_Age: 40, Reci_Sex: 'F', Reci_Phone: '9111222348', Reci_Bgrp: 'AB-', Reci_Bqty: 2, Reci_Date: new Date('2024-04-02'), City_Id: 4, status: 'approved' },
      { Reci_Id: 17, Reci_Name: 'Shiva Kumar', Reci_Age: 47, Reci_Sex: 'M', Reci_Phone: '9111222349', Reci_Bgrp: 'A+', Reci_Bqty: 1, Reci_Date: new Date('2024-04-03'), City_Id: 5, status: 'pending' },
      { Reci_Id: 18, Reci_Name: 'Kali Prasad', Reci_Age: 42, Reci_Sex: 'F', Reci_Phone: '9111222350', Reci_Bgrp: 'O+', Reci_Bqty: 2, Reci_Date: new Date('2024-04-04'), City_Id: 6, status: 'rejected' },
      { Reci_Id: 19, Reci_Name: 'Brahma Gupta', Reci_Age: 53, Reci_Sex: 'M', Reci_Phone: '9111222351', Reci_Bgrp: 'B+', Reci_Bqty: 3, Reci_Date: new Date('2024-04-05'), City_Id: 7, status: 'approved' },
      { Reci_Id: 20, Reci_Name: 'Uma Shankar', Reci_Age: 36, Reci_Sex: 'F', Reci_Phone: '9111222352', Reci_Bgrp: 'AB+', Reci_Bqty: 1, Reci_Date: new Date('2024-04-06'), City_Id: 8, status: 'fulfilled' }
    ]);
    console.log(`✅ Created ${recipients.length} Recipients`);

    // 7. Create Hospitals
    console.log('🏥 Creating Hospitals...');
    const hospitals = await Hospital.create([
      { Hosp_Id: 1, Hosp_Name: 'City General Hospital', Hosp_Phone: '022-12345678', Hosp_Needed_Bgrp: 'O+', City_Id: 1, address: 'Main Street, Mumbai', type: 'general', capacity: 500 },
      { Hosp_Id: 2, Hosp_Name: 'Apollo Hospital', Hosp_Phone: '011-23456789', Hosp_Needed_Bgrp: 'A+', City_Id: 2, address: 'Central Avenue, Delhi', type: 'specialized', capacity: 800 },
      { Hosp_Id: 3, Hosp_Name: 'Fortis Hospital', Hosp_Phone: '080-34567890', Hosp_Needed_Bgrp: 'B+', City_Id: 3, address: 'Tech Park Road, Bangalore', type: 'specialized', capacity: 600 },
      { Hosp_Id: 4, Hosp_Name: 'Ruby Hall Clinic', Hosp_Phone: '020-45678901', Hosp_Needed_Bgrp: 'AB+', City_Id: 4, address: 'Grant Road, Pune', type: 'general', capacity: 400 },
      { Hosp_Id: 5, Hosp_Name: 'Yashoda Hospital', Hosp_Phone: '040-56789012', Hosp_Needed_Bgrp: 'A-', City_Id: 5, address: 'Hitech City, Hyderabad', type: 'specialized', capacity: 700 },
      { Hosp_Id: 6, Hosp_Name: 'MIOT Hospital', Hosp_Phone: '044-67890123', Hosp_Needed_Bgrp: 'O-', City_Id: 6, address: 'Mount Road, Chennai', type: 'specialized', capacity: 650 },
      { Hosp_Id: 7, Hosp_Name: 'AMRI Hospital', Hosp_Phone: '033-78901234', Hosp_Needed_Bgrp: 'B-', City_Id: 7, address: 'Salt Lake, Kolkata', type: 'general', capacity: 550 },
      { Hosp_Id: 8, Hosp_Name: 'Sterling Hospital', Hosp_Phone: '079-89012345', Hosp_Needed_Bgrp: 'AB-', City_Id: 8, address: 'SG Highway, Ahmedabad', type: 'general', capacity: 450 },
      { Hosp_Id: 9, Hosp_Name: 'Eternal Hospital', Hosp_Phone: '0141-90123456', Hosp_Needed_Bgrp: 'A+', City_Id: 9, address: 'Jagatpura, Jaipur', type: 'specialized', capacity: 500 },
      { Hosp_Id: 10, Hosp_Name: 'Kiran Hospital', Hosp_Phone: '0261-01234567', Hosp_Needed_Bgrp: 'O+', City_Id: 10, address: 'Ring Road, Surat', type: 'general', capacity: 350 },
      { Hosp_Id: 11, Hosp_Name: 'Lilavati Hospital', Hosp_Phone: '022-11223344', Hosp_Needed_Bgrp: 'Multiple', City_Id: 1, address: 'Bandra West, Mumbai', type: 'specialized', capacity: 900 },
      { Hosp_Id: 12, Hosp_Name: 'Max Hospital', Hosp_Phone: '011-22334455', Hosp_Needed_Bgrp: 'Multiple', City_Id: 2, address: 'Saket, Delhi', type: 'specialized', capacity: 850 },
      { Hosp_Id: 13, Hosp_Name: 'Manipal Hospital', Hosp_Phone: '080-33445566', Hosp_Needed_Bgrp: 'B+', City_Id: 3, address: 'Old Airport Road, Bangalore', type: 'general', capacity: 700 },
      { Hosp_Id: 14, Hosp_Name: 'Jehangir Hospital', Hosp_Phone: '020-44556677', Hosp_Needed_Bgrp: 'A+', City_Id: 4, address: 'Sassoon Road, Pune', type: 'general', capacity: 550 },
      { Hosp_Id: 15, Hosp_Name: 'Care Hospital', Hosp_Phone: '040-55667788', Hosp_Needed_Bgrp: 'O+', City_Id: 5, address: 'Banjara Hills, Hyderabad', type: 'specialized', capacity: 750 },
      { Hosp_Id: 16, Hosp_Name: 'Global Hospital', Hosp_Phone: '044-66778899', Hosp_Needed_Bgrp: 'AB+', City_Id: 6, address: 'Perumbakkam, Chennai', type: 'specialized', capacity: 800 },
      { Hosp_Id: 17, Hosp_Name: 'Medica Hospital', Hosp_Phone: '033-77889900', Hosp_Needed_Bgrp: 'A-', City_Id: 7, address: 'Mukundapur, Kolkata', type: 'general', capacity: 600 },
      { Hosp_Id: 18, Hosp_Name: 'SAL Hospital', Hosp_Phone: '079-88990011', Hosp_Needed_Bgrp: 'O-', City_Id: 8, address: 'Drive In Road, Ahmedabad', type: 'general', capacity: 500 },
      { Hosp_Id: 19, Hosp_Name: 'Apex Hospital', Hosp_Phone: '0141-99001122', Hosp_Needed_Bgrp: 'B-', City_Id: 9, address: 'Malviya Nagar, Jaipur', type: 'general', capacity: 450 },
      { Hosp_Id: 20, Hosp_Name: 'Sparsh Hospital', Hosp_Phone: '0261-00112233', Hosp_Needed_Bgrp: 'Multiple', City_Id: 10, address: 'Adajan, Surat', type: 'specialized', capacity: 550 }
    ]);
    console.log(`✅ Created ${hospitals.length} Hospitals`);

    // 8. Create Registers relationships (Recording_Staff registers Donors)
    console.log('📋 Creating Registers relationships...');
    const registers = await Registers.create([
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
      { Reco_Id: 8, Bd_Id: 16 },
      { Reco_Id: 1, Bd_Id: 17 },
      { Reco_Id: 2, Bd_Id: 18 },
      { Reco_Id: 3, Bd_Id: 19 },
      { Reco_Id: 4, Bd_Id: 20 }
    ]);
    console.log(`✅ Created ${registers.length} Registers relationships`);

    // 9. Create Records relationships (Recording_Staff records Recipients)
    console.log('📋 Creating Records relationships...');
    const records = await Records.create([
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
      { Reco_Id: 8, Reci_Id: 16 },
      { Reco_Id: 1, Reci_Id: 17 },
      { Reco_Id: 2, Reci_Id: 18 },
      { Reco_Id: 3, Reci_Id: 19 },
      { Reco_Id: 4, Reci_Id: 20 }
    ]);
    console.log(`✅ Created ${records.length} Records relationships`);

    // 10. Create Request_To relationships (Recipients request to Managers)
    console.log('📋 Creating Request_To relationships...');
    const requestTo = await Request_To.create([
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
    ]);
    console.log(`✅ Created ${requestTo.length} Request_To relationships`);

    // Summary
    console.log('\n📊 Summary:');
    console.log(`   Cities: ${cities.length}`);
    console.log(`   BB Managers: ${managers.length}`);
    console.log(`   Recording Staff: ${staff.length}`);
    console.log(`   Blood Donors: ${donors.length}`);
    console.log(`   Blood Specimens: ${specimens.length}`);
    console.log(`   Recipients: ${recipients.length}`);
    console.log(`   Hospitals: ${hospitals.length}`);
    console.log(`   Registers: ${registers.length}`);
    console.log(`   Records: ${records.length}`);
    console.log(`   Request_To: ${requestTo.length}`);
    console.log(`   TOTAL: ${cities.length + managers.length + staff.length + donors.length + specimens.length + recipients.length + hospitals.length + registers.length + records.length + requestTo.length} records`);
    
    console.log('\n✅ All SQL-style data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(seedData);
