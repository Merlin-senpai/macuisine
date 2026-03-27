const mysql = require('mysql2/promise');

async function checkSuperAdmins() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ma'
    });

    // Check all super admins
    const [superAdmins] = await connection.execute(
      'SELECT id, username, name, email, role, is_active, created_at FROM users WHERE role = "super_admin"'
    );

    console.log('Super Admins in database:');
    console.table(superAdmins);

    // Check all users
    const [allUsers] = await connection.execute(
      'SELECT id, username, name, email, role, is_active, created_at FROM users ORDER BY created_at'
    );

    console.log('\nAll Users:');
    console.table(allUsers);

    await connection.end();
  } catch (error) {
    console.error('Database error:', error);
  }
}

checkSuperAdmins();
