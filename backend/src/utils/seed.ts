import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const ensureSeedAdmin = async () => {
  const [rows] = await pool.query('SELECT COUNT(*) as c FROM users');
  const c = (rows as any)[0].c as number;
  if (c === 0) {
    const hash = await bcrypt.hash('Admin123!', 10);
    await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES (?,?,?,?)',
      ['admin', hash, 'admin@example.com', 'admin']
    );
    console.log('Seeded default admin user: admin / Admin123!');
  }
};
