import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    
	try {

        const [ rows ] = await pool.query('SELECT * FROM accounts');
        res.json(rows);
    
	} catch (err) {
    
		res.status(500).json({ error: err.message });
    
	}

});

router.post('/login', async (req, res) => {
    
	const { email, password } = req.body;

    try {

		const [ rows ] = await pool.query(
            'SELECT * FROM accounts WHERE email = ? AND password = ?',
            [ email, password ]
        );

        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        res.json(rows[0]);

	} catch (err) {

        console.error('Login error: ', err)
		res.status(500).json({ error: err.message });

	}

});

});

export default router;