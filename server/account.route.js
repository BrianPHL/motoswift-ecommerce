import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
	  
		const result = await pool.query('SELECT * FROM accounts');
	  	res.json(result.rows);

	} catch (err) {

	  	res.status(500).json({ error: err.message });
	
	}
});

router.post('/login', async(req, res) => {

	const { email, password } = req.body;
	console.log(email, password);

  	try {

		const result = await pool.query(
			'SELECT * FROM accounts WHERE email_address = $1 AND password = $2',
			[ email, password ]
		);

		if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

		res.json(result.rows[0]);

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;