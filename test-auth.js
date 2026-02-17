const bcrypt = require('bcryptjs');

// Test the password hash from the database schema
const storedHash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8W';
const password = 'admin123';

console.log('Testing password hash...');
console.log('Password:', password);
console.log('Stored hash:', storedHash);

bcrypt.compare(password, storedHash, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else {
    console.log('Password match:', result);
    
    // Also test generating a new hash
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) {
        console.error('Error generating hash:', err);
      } else {
        console.log('New hash:', hash);
        
        // Test the new hash
        bcrypt.compare(password, hash, (err, result) => {
          if (err) {
            console.error('Error comparing new hash:', err);
          } else {
            console.log('New hash matches:', result);
          }
        });
      }
    });
  }
});
