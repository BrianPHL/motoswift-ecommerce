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

        if (rows.length === 0) return res.status(401).json({ error: 'Invalid username or password. The account might not even exist.' });

        res.json(rows[0]);

	} catch (err) {

        console.error('Login error: ', err)
		res.status(500).json({ error: err.message });

	}

});

router.post('/create', async (req, res) => {

    const { firstName, lastName, email, address, contactNumber, password } = req.body;

    try {
        const [ rows ] = await pool.query(
            `
                INSERT INTO accounts (first_name, last_name, email, address, contact_number, password)
                SELECT ?, ?, ?, ?, ?, ?
                FROM DUAL
                WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE email = ?)
            `,
            [ firstName, lastName, email, address, contactNumber, password, email ]
        );

        if (rows.affectedRows === 0) {
            return res.status(409).json({ error: 'There is an account already associated with this email address!' });
        }

        res.status(201).json({ id: rows['insertId'], firstName, lastName, email, address });

    } catch (err) {

        console.error(err.message)
        res.status(500).json({ error: err.message });
    }

});

export default router;
