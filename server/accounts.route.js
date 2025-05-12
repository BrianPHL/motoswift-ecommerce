import cloudinary from "./cloudinary.js";
import pool from "./db.js";
import express from 'express';
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({
    dest: 'temp/',
    limits: { fileSize: 5 * 1024 * 1024 }
})

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

router.post('/:account_id/avatar', upload.single('avatar'), async (req, res) => {

    try {

        const { account_id } = req.params;

        if (!req.file) return res.status(400).json({ error: 'No file uploaded!' });

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',
            public_id: `avatar_${ account_id }_${ Date.now() }`
        });

        fs.unlinkSync(req.file.path);

        await pool.query(
            `
                UPDATE accounts SET image_url = ?
                WHERE account_id = ?
            `,
            [ result['public_id'], account_id ]
        );

        res.json({
            message: 'Avatar uploaded successfully',
            image_url: result['public_id']
        })

    } catch (err) {

        console.error('Error uploading avatar:', err);
        if (req.file?.path) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: err.message });

    }

});

router.delete('/:account_id/avatar', async (req, res) => {

    try {

        const { account_id } = req.params;

        const [ accounts ] = await pool.query(
            `
                SELECT image_url FROM accounts
                WHERE account_id = ?
            `,
            [ account_id ]
        );

        if (accounts.length === 0) {
            return res.status(404).json({ error: 'Account not found!' });
        }

        const image_url = accounts[0]['image_url'];

        if (image_url) {
            await cloudinary.uploader.destroy(image_url);
        }

        await pool.query(
            `
                UPDATE accounts SET image_url = NULL
                WHERE account_id = ?
            `,
            [ account_id ]
        );

        res.json({ message: 'Avatar removed successfully!' });

    } catch (err) {

        console.error('Error removing avatar:', err);
        res.status(500).json({ error: err.message });
    
    }

});

export default router;
