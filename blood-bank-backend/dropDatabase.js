require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    console.log('🗑️  Dropping all collections...');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (let collection of collections) {
      console.log(`  Dropping ${collection.name}...`);
      await mongoose.connection.db.dropCollection(collection.name);
    }
    
    console.log('✅ All collections dropped!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
