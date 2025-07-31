import db from '../db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const [rows] = await db.query('SELECT * FROM clientes');
      res.status(200).json(rows);
    } else if (req.method === 'POST') {
      const { nombre, email } = req.body;
      const [result] = await db.query(
        'INSERT INTO clientes (nombre, email) VALUES (?, ?)',
        [nombre, email]
      );
      res.status(201).json({ id: result.insertId, nombre, email });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
