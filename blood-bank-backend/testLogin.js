const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🧪 Testing login API...\n');
    
    const credentials = {
      email: 'admin@bloodbank.com',
      password: 'admin123'
    };
    
    console.log('📤 Sending POST to http://localhost:5000/api/auth/login');
    console.log('📧 Email:', credentials.email);
    console.log('🔑 Password:', credentials.password);
    console.log('');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    
    console.log('✅ Login successful!');
    console.log('📊 Response:', {
      success: response.data.success,
      user: response.data.user,
      token: response.data.token ? 'Present (hidden)' : 'Missing'
    });
    
  } catch (error) {
    console.error('❌ Login failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Wait a bit for server to start
setTimeout(testLogin, 3000);
