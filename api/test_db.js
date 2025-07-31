import pool from './db.js';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.status(200).json({ status: 'Connected ✅', serverTime: rows[0].now });
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
}
