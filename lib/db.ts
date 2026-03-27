import { Pool, PoolClient } from 'pg';

// Database connection configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Execute query with error handling
export async function query(sql: string, params?: any[]) {
  try {
    const client = await pool.connect();
    const result = await client.query(sql, params);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Transaction helper
export async function transaction(callback: (client: PoolClient) => Promise<any>) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Get single row helper
export async function queryOne(sql: string, params?: any[]) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export default pool;
