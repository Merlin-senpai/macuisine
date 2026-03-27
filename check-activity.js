const mysql = require('mysql2/promise');

async function checkActivity() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ma'
    });
    
    // Check activity logs
    const [logs] = await connection.execute(
      'SELECT al.*, u.username, u.name FROM user_activity_log al LEFT JOIN users u ON al.user_id = u.id ORDER BY al.created_at DESC LIMIT 5'
    );
    
    console.log('Recent activity logs:');
    console.table(logs);
    
    // Check users table
    const [users] = await connection.execute(
      'SELECT id, username, name FROM users LIMIT 5'
    );
    
    console.log('\nUsers:');
    console.table(users);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkActivity();
