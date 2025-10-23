require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Check existing users
    const existingUsers = await User.find({});
    console.log(`\n📊 Found ${existingUsers.length} users in database`);
    
    if (existingUsers.length > 0) {
      console.log('\n👥 Existing users:');
      existingUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.role})`);
      });
    }
    
    // Create default users if none exist
    if (existingUsers.length === 0) {
      console.log('\n🔧 Creating default users...');
      
      const salt = await bcrypt.genSalt(10);
      
      const users = [
        {
          name: 'Admin User',
          email: 'admin@bloodbank.com',
          password: await bcrypt.hash('admin123', salt),
          role: 'manager'
        },
        {
          name: 'Staff User',
          email: 'staff@bloodbank.com',
          password: await bcrypt.hash('staff123', salt),
          role: 'staff'
        }
      ];
      
      await User.insertMany(users);
      console.log('✅ Created 2 default users:');
      console.log('   - admin@bloodbank.com / admin123 (manager)');
      console.log('   - staff@bloodbank.com / staff123 (staff)');
    }
    
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
