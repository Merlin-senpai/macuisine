// Test PostgreSQL connection
import { testConnection, query } from './lib/db.js';

async function testPostgresConnection() {
  console.log('Testing PostgreSQL connection...');
  
  try {
    const isConnected = await testConnection();
    
    if (isConnected) {
      console.log('✅ PostgreSQL connection successful!');
      
      // Test a simple query
      const result = await query('SELECT NOW() as current_time, version() as postgres_version');
      console.log('Database info:', result);
      
      // Test if tables exist
      const tables = await query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name
      `);
      console.log('Tables in database:', tables);
      
    } else {
      console.log('❌ PostgreSQL connection failed');
    }
  } catch (error) {
    console.error('Error testing connection:', error);
  }
  
  process.exit(0);
}

testPostgresConnection();
