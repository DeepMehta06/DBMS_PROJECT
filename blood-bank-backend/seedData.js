const mongoose = require('mongoose');
const Donor = require('./models/Donor');
const BloodSpecimen = require('./models/BloodSpecimen');
const Recipient = require('./models/Recipient');
const Hospital = require('./models/Hospital');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for seeding'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const donors = [
  { name: 'John Smith', email: 'john.smith@email.com', phone: '555-0101', bloodGroup: 'A+', city: 'New York', address: '123 Main St', age: 35, sex: 'Male' },
  { name: 'Emma Johnson', email: 'emma.j@email.com', phone: '555-0102', bloodGroup: 'O+', city: 'Los Angeles', address: '456 Oak Ave', age: 28, sex: 'Female' },
  { name: 'Michael Brown', email: 'michael.b@email.com', phone: '555-0103', bloodGroup: 'B+', city: 'Chicago', address: '789 Pine Rd', age: 42, sex: 'Male' },
  { name: 'Sophia Davis', email: 'sophia.d@email.com', phone: '555-0104', bloodGroup: 'AB+', city: 'Houston', address: '321 Elm St', age: 31, sex: 'Female' },
  { name: 'William Wilson', email: 'will.w@email.com', phone: '555-0105', bloodGroup: 'A-', city: 'Phoenix', address: '654 Maple Dr', age: 45, sex: 'Male' },
  { name: 'Olivia Martinez', email: 'olivia.m@email.com', phone: '555-0106', bloodGroup: 'O-', city: 'Philadelphia', address: '987 Cedar Ln', age: 26, sex: 'Female' },
  { name: 'James Anderson', email: 'james.a@email.com', phone: '555-0107', bloodGroup: 'B-', city: 'San Antonio', address: '147 Birch St', age: 38, sex: 'Male' },
  { name: 'Ava Taylor', email: 'ava.t@email.com', phone: '555-0108', bloodGroup: 'AB-', city: 'San Diego', address: '258 Spruce Ave', age: 29, sex: 'Female' },
  { name: 'Robert Thomas', email: 'robert.t@email.com', phone: '555-0109', bloodGroup: 'A+', city: 'Dallas', address: '369 Willow Rd', age: 52, sex: 'Male' },
  { name: 'Isabella Garcia', email: 'isabella.g@email.com', phone: '555-0110', bloodGroup: 'O+', city: 'San Jose', address: '741 Ash Dr', age: 24, sex: 'Female' },
  { name: 'David Rodriguez', email: 'david.r@email.com', phone: '555-0111', bloodGroup: 'B+', city: 'Austin', address: '852 Cherry Ln', age: 33, sex: 'Male' },
  { name: 'Mia Hernandez', email: 'mia.h@email.com', phone: '555-0112', bloodGroup: 'AB+', city: 'Jacksonville', address: '963 Poplar St', age: 27, sex: 'Female' },
  { name: 'Daniel Lopez', email: 'daniel.l@email.com', phone: '555-0113', bloodGroup: 'A-', city: 'Fort Worth', address: '159 Hickory Ave', age: 41, sex: 'Male' },
  { name: 'Charlotte Lee', email: 'charlotte.l@email.com', phone: '555-0114', bloodGroup: 'O-', city: 'Columbus', address: '753 Walnut Rd', age: 30, sex: 'Female' },
  { name: 'Matthew Walker', email: 'matthew.w@email.com', phone: '555-0115', bloodGroup: 'B-', city: 'Charlotte', address: '357 Beech Dr', age: 36, sex: 'Male' },
  { name: 'Amelia Hall', email: 'amelia.h@email.com', phone: '555-0116', bloodGroup: 'AB-', city: 'Indianapolis', address: '951 Cypress Ln', age: 25, sex: 'Female' },
  { name: 'Joseph Allen', email: 'joseph.a@email.com', phone: '555-0117', bloodGroup: 'A+', city: 'San Francisco', address: '246 Fir St', age: 44, sex: 'Male' },
  { name: 'Harper Young', email: 'harper.y@email.com', phone: '555-0118', bloodGroup: 'O+', city: 'Seattle', address: '135 Redwood Ave', age: 32, sex: 'Female' },
  { name: 'Christopher King', email: 'chris.k@email.com', phone: '555-0119', bloodGroup: 'B+', city: 'Denver', address: '864 Palm Rd', age: 39, sex: 'Male' },
  { name: 'Evelyn Wright', email: 'evelyn.w@email.com', phone: '555-0120', bloodGroup: 'AB+', city: 'Boston', address: '579 Magnolia Dr', age: 28, sex: 'Female' }
];

const bloodSpecimens = [
  { specimenNumber: 'SP-2025-001', bloodGroup: 'A+', collectionDate: new Date('2025-10-15'), expiryDate: new Date('2025-11-29'), status: 'available' },
  { specimenNumber: 'SP-2025-002', bloodGroup: 'A+', collectionDate: new Date('2025-10-16'), expiryDate: new Date('2025-11-30'), status: 'available' },
  { specimenNumber: 'SP-2025-003', bloodGroup: 'A+', collectionDate: new Date('2025-10-17'), expiryDate: new Date('2025-12-01'), status: 'reserved' },
  { specimenNumber: 'SP-2025-004', bloodGroup: 'O+', collectionDate: new Date('2025-10-14'), expiryDate: new Date('2025-11-28'), status: 'available' },
  { specimenNumber: 'SP-2025-005', bloodGroup: 'O+', collectionDate: new Date('2025-10-15'), expiryDate: new Date('2025-11-29'), status: 'available' },
  { specimenNumber: 'SP-2025-006', bloodGroup: 'O+', collectionDate: new Date('2025-10-16'), expiryDate: new Date('2025-11-30'), status: 'available' },
  { specimenNumber: 'SP-2025-007', bloodGroup: 'O+', collectionDate: new Date('2025-10-17'), expiryDate: new Date('2025-12-01'), status: 'available' },
  { specimenNumber: 'SP-2025-008', bloodGroup: 'B+', collectionDate: new Date('2025-10-15'), expiryDate: new Date('2025-11-29'), status: 'available' },
  { specimenNumber: 'SP-2025-009', bloodGroup: 'B+', collectionDate: new Date('2025-10-16'), expiryDate: new Date('2025-11-30'), status: 'available' },
  { specimenNumber: 'SP-2025-010', bloodGroup: 'B+', collectionDate: new Date('2025-10-18'), expiryDate: new Date('2025-12-02'), status: 'used' },
  { specimenNumber: 'SP-2025-011', bloodGroup: 'AB+', collectionDate: new Date('2025-10-17'), expiryDate: new Date('2025-12-01'), status: 'available' },
  { specimenNumber: 'SP-2025-012', bloodGroup: 'AB+', collectionDate: new Date('2025-10-18'), expiryDate: new Date('2025-12-02'), status: 'available' },
  { specimenNumber: 'SP-2025-013', bloodGroup: 'A-', collectionDate: new Date('2025-10-16'), expiryDate: new Date('2025-11-30'), status: 'available' },
  { specimenNumber: 'SP-2025-014', bloodGroup: 'A-', collectionDate: new Date('2025-10-17'), expiryDate: new Date('2025-12-01'), status: 'reserved' },
  { specimenNumber: 'SP-2025-015', bloodGroup: 'O-', collectionDate: new Date('2025-10-15'), expiryDate: new Date('2025-11-29'), status: 'available' },
  { specimenNumber: 'SP-2025-016', bloodGroup: 'O-', collectionDate: new Date('2025-10-16'), expiryDate: new Date('2025-11-30'), status: 'available' },
  { specimenNumber: 'SP-2025-017', bloodGroup: 'B-', collectionDate: new Date('2025-10-17'), expiryDate: new Date('2025-12-01'), status: 'available' },
  { specimenNumber: 'SP-2025-018', bloodGroup: 'AB-', collectionDate: new Date('2025-10-18'), expiryDate: new Date('2025-12-02'), status: 'available' },
  { specimenNumber: 'SP-2025-019', bloodGroup: 'A+', collectionDate: new Date('2025-10-19'), expiryDate: new Date('2025-12-03'), status: 'available' },
  { specimenNumber: 'SP-2025-020', bloodGroup: 'O+', collectionDate: new Date('2025-10-19'), expiryDate: new Date('2025-12-03'), status: 'available' }
];

const recipients = [
  { name: 'Sarah Williams', bloodGroup: 'A+', bloodQuantity: 2, age: 45, sex: 'Female', phone: '555-2001', status: 'pending' },
  { name: 'David Chen', bloodGroup: 'O-', bloodQuantity: 3, age: 52, sex: 'Male', phone: '555-2002', status: 'approved' },
  { name: 'Maria Rodriguez', bloodGroup: 'B+', bloodQuantity: 1, age: 38, sex: 'Female', phone: '555-2003', status: 'fulfilled' },
  { name: 'Ahmed Hassan', bloodGroup: 'AB+', bloodQuantity: 2, age: 61, sex: 'Male', phone: '555-2004', status: 'pending' },
  { name: 'Lisa Thompson', bloodGroup: 'A-', bloodQuantity: 1, age: 34, sex: 'Female', phone: '555-2005', status: 'approved' },
  { name: 'Kevin Park', bloodGroup: 'O+', bloodQuantity: 4, age: 48, sex: 'Male', phone: '555-2006', status: 'pending' },
  { name: 'Jennifer Martinez', bloodGroup: 'B-', bloodQuantity: 2, age: 29, sex: 'Female', phone: '555-2007', status: 'fulfilled' },
  { name: 'Robert Kim', bloodGroup: 'AB-', bloodQuantity: 1, age: 55, sex: 'Male', phone: '555-2008', status: 'rejected' },
  { name: 'Emily Davis', bloodGroup: 'A+', bloodQuantity: 2, age: 41, sex: 'Female', phone: '555-2009', status: 'pending' },
  { name: 'Thomas Brown', bloodGroup: 'O+', bloodQuantity: 3, age: 67, sex: 'Male', phone: '555-2010', status: 'approved' },
  { name: 'Patricia Wilson', bloodGroup: 'B+', bloodQuantity: 1, age: 36, sex: 'Female', phone: '555-2011', status: 'fulfilled' },
  { name: 'Mark Johnson', bloodGroup: 'AB+', bloodQuantity: 2, age: 50, sex: 'Male', phone: '555-2012', status: 'pending' },
  { name: 'Linda Anderson', bloodGroup: 'A-', bloodQuantity: 1, age: 43, sex: 'Female', phone: '555-2013', status: 'approved' },
  { name: 'Christopher Lee', bloodGroup: 'O-', bloodQuantity: 2, age: 58, sex: 'Male', phone: '555-2014', status: 'pending' },
  { name: 'Nancy White', bloodGroup: 'B-', bloodQuantity: 1, age: 32, sex: 'Female', phone: '555-2015', status: 'fulfilled' },
  { name: 'Daniel Garcia', bloodGroup: 'AB-', bloodQuantity: 3, age: 46, sex: 'Male', phone: '555-2016', status: 'pending' },
  { name: 'Karen Miller', bloodGroup: 'A+', bloodQuantity: 1, age: 39, sex: 'Female', phone: '555-2017', status: 'approved' },
  { name: 'Paul Taylor', bloodGroup: 'O+', bloodQuantity: 2, age: 54, sex: 'Male', phone: '555-2018', status: 'pending' },
  { name: 'Betty Moore', bloodGroup: 'B+', bloodQuantity: 1, age: 44, sex: 'Female', phone: '555-2019', status: 'fulfilled' },
  { name: 'Steven Jackson', bloodGroup: 'AB+', bloodQuantity: 2, age: 49, sex: 'Male', phone: '555-2020', status: 'pending' }
];

const hospitals = [
  { name: 'City General Hospital', city: 'New York', phone: '555-3001', address: '100 Medical Plaza', email: 'contact@citygeneral.com', type: 'general', capacity: 500 },
  { name: 'St. Mary Medical Center', city: 'Los Angeles', phone: '555-3002', address: '250 Healthcare Blvd', email: 'info@stmary.com', type: 'general', capacity: 400 },
  { name: 'Memorial Hospital', city: 'Chicago', phone: '555-3003', address: '75 Memorial Drive', email: 'admin@memorial.com', type: 'general', capacity: 350 },
  { name: 'University Medical Center', city: 'Houston', phone: '555-3004', address: '500 University Ave', email: 'contact@umc.com', type: 'specialized', capacity: 600 },
  { name: 'Phoenix Children Hospital', city: 'Phoenix', phone: '555-3005', address: '300 Children Way', email: 'info@phxchildren.com', type: 'specialized', capacity: 200 },
  { name: 'Emergency Care Center', city: 'Philadelphia', phone: '555-3006', address: '150 Emergency Lane', email: 'dispatch@ecc.com', type: 'emergency', capacity: 150 },
  { name: 'Community Health Hospital', city: 'San Antonio', phone: '555-3007', address: '425 Community Rd', email: 'help@commhealth.com', type: 'general', capacity: 300 },
  { name: 'Coastal Medical Center', city: 'San Diego', phone: '555-3008', address: '800 Coastal Hwy', email: 'contact@coastal.com', type: 'general', capacity: 450 },
  { name: 'Heart & Vascular Institute', city: 'Dallas', phone: '555-3009', address: '200 Cardiac Circle', email: 'info@heartinstitute.com', type: 'specialized', capacity: 175 },
  { name: 'Silicon Valley Medical', city: 'San Jose', phone: '555-3010', address: '1000 Tech Drive', email: 'admin@svmed.com', type: 'general', capacity: 550 },
  { name: 'Austin Regional Hospital', city: 'Austin', phone: '555-3011', address: '350 Regional Pkwy', email: 'contact@austinregional.com', type: 'general', capacity: 375 },
  { name: 'Trauma Center Jacksonville', city: 'Jacksonville', phone: '555-3012', address: '90 Trauma Way', email: 'dispatch@traumajax.com', type: 'emergency', capacity: 125 },
  { name: 'Fort Worth General', city: 'Fort Worth', phone: '555-3013', address: '600 General St', email: 'info@fwgeneral.com', type: 'general', capacity: 325 },
  { name: 'Columbus Medical Plaza', city: 'Columbus', phone: '555-3014', address: '700 Medical Plaza Dr', email: 'admin@columbusmed.com', type: 'general', capacity: 400 },
  { name: 'Charlotte Cancer Center', city: 'Charlotte', phone: '555-3015', address: '250 Oncology Ave', email: 'info@cancercenter.com', type: 'specialized', capacity: 150 },
  { name: 'Indianapolis Health System', city: 'Indianapolis', phone: '555-3016', address: '900 Health System Blvd', email: 'contact@indyhealth.com', type: 'general', capacity: 475 },
  { name: 'Bay Area Medical Center', city: 'San Francisco', phone: '555-3017', address: '1200 Bay Area Dr', email: 'admin@baymed.com', type: 'general', capacity: 525 },
  { name: 'Seattle Trauma Hospital', city: 'Seattle', phone: '555-3018', address: '175 Trauma Center Rd', email: 'dispatch@seattletrauma.com', type: 'emergency', capacity: 200 },
  { name: 'Denver Orthopedic Center', city: 'Denver', phone: '555-3019', address: '400 Ortho Plaza', email: 'info@denverortho.com', type: 'specialized', capacity: 100 },
  { name: 'Boston General Hospital', city: 'Boston', phone: '555-3020', address: '850 Hospital Row', email: 'contact@bostongeneral.com', type: 'general', capacity: 600 }
];

async function seedDatabase() {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Donor.deleteMany({});
    await BloodSpecimen.deleteMany({});
    await Recipient.deleteMany({});
    await Hospital.deleteMany({});

    // Insert donors
    console.log('👥 Adding 20 donors...');
    const insertedDonors = await Donor.insertMany(donors);
    console.log(`✅ Added ${insertedDonors.length} donors`);

    // Insert blood specimens
    console.log('🩸 Adding 20 blood specimens...');
    const insertedSpecimens = await BloodSpecimen.insertMany(bloodSpecimens);
    console.log(`✅ Added ${insertedSpecimens.length} blood specimens`);

    // Insert recipients
    console.log('🏥 Adding 20 recipients...');
    const insertedRecipients = await Recipient.insertMany(recipients);
    console.log(`✅ Added ${insertedRecipients.length} recipients`);

    // Insert hospitals
    console.log('🏢 Adding 20 hospitals...');
    const insertedHospitals = await Hospital.insertMany(hospitals);
    console.log(`✅ Added ${insertedHospitals.length} hospitals`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - Donors: ${insertedDonors.length}`);
    console.log(`   - Blood Specimens: ${insertedSpecimens.length}`);
    console.log(`   - Recipients: ${insertedRecipients.length}`);
    console.log(`   - Hospitals: ${insertedHospitals.length}`);
    
    // Display blood group distribution
    const bloodGroupCounts = {};
    insertedSpecimens.forEach(spec => {
      bloodGroupCounts[spec.bloodGroup] = (bloodGroupCounts[spec.bloodGroup] || 0) + 1;
    });
    console.log('\n🩸 Blood Group Distribution:');
    Object.entries(bloodGroupCounts).forEach(([group, count]) => {
      console.log(`   ${group}: ${count} units`);
    });

    // Display recipient status distribution
    const recipientStatusCounts = {};
    insertedRecipients.forEach(rec => {
      recipientStatusCounts[rec.status] = (recipientStatusCounts[rec.status] || 0) + 1;
    });
    console.log('\n🏥 Recipient Status Distribution:');
    Object.entries(recipientStatusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} recipients`);
    });

    // Display hospital type distribution
    const hospitalTypeCounts = {};
    insertedHospitals.forEach(hosp => {
      hospitalTypeCounts[hosp.type] = (hospitalTypeCounts[hosp.type] || 0) + 1;
    });
    console.log('\n🏢 Hospital Type Distribution:');
    Object.entries(hospitalTypeCounts).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} hospitals`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
