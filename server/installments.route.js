import express from 'express';
import pool from './db.js';

const router = express.Router();

router.get('/pending', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, r.reservation_id, r.preferred_date, a.first_name, a.last_name, a.email
      FROM installments i
      JOIN reservations r ON i.reservation_id = r.reservation_id
      JOIN accounts a ON r.account_id = a.account_id
      WHERE i.status = 'pending'
      ORDER BY i.payment_date DESC
    `);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pending installments:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/pending/count', async (req, res) => {
	try {
		const [result] = await pool.query(`
			SELECT COUNT(*) as count 
			FROM installments 
			WHERE status = "pending"
		`);

		res.json({ count: result[0]['count'] });
	} catch (err) {
		console.error('Error counting pending installments:', err);
		res.status(500).json({ error: err.message });
	}
});

export default router;
