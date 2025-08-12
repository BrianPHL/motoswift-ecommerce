import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.post('/sync', async (req, res) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const { oauth_user_id, email, name, image, email_verified } = req.body;
        const [ doesAccountExists ] = await connection.query(
            `
                SELECT * FROM accounts
                WHERE email = ?
            `, [ email ]
        );

        if (doesAccountExists.length > 0) {
            
            await connection.query(
                `
                    UPDATE accounts
                    SET oauth_user_id = ?, auth_provider = 'google', image_url = ?
                    WHERE email = ?
                `,
                [ oauth_user_id, image, email ]
            );

            await connection.query(
                `
                    UPDATE oauth_users 
                    SET email_verified = ? 
                    WHERE id = ?
                `,
                [ email_verified ? 1 : 0, oauth_user_id ]
            );

            await connection.commit();

            return res.json({
                account: {
                    ...doesAccountExists[0],
                    oauth_user_id,
                    image_url: image || doesAccountExists[0].image_url,
                    email_verified: email_verified || false
                }
            });

        } else {

            const [ firstName, ...lastNameParts ] = name.split(' ');
            const lastName = lastNameParts.join(' ') || '';
            const [ result ] = await connection.query(
                `
                    INSERT INTO accounts
                    (first_name, last_name, email, address, contact_number, password, oauth_user_id, auth_provider, image_url)
                    VALUES
                    (?, ?, ?, '', '', '', ?, 'google', ?)
                `,
                [ firstName, lastName, email, oauth_user_id, image ]
            );

            await connection.query(
                `
                    UPDATE oauth_users 
                    SET email_verified = ? 
                    WHERE id = ?
                `,
                [ email_verified ? 1 : 0, oauth_user_id ]
            );

            const [ newAccount ] = await connection.query(
                `
                    SELECT * FROM accounts
                    WHERE id = ?
                `,
                [ result.insertId ]
            );

            await connection.commit();
            
            return res.json({ account: newAccount[0] });

        }

    } catch (err) {

        await connection.rollback();
        console.error('OAuth sync error: ', err);
        res.status(500).json({ error: err.message });

    } finally { connection.release(); }

});


router.get('/account/:oauth_user_id', async (req, res) => {
    try {
        const [ accounts ] = await pool.query(
            `
                SELECT * FROM accounts
                WHERE oauth_user_id = ?
            `,
            [ req.params.oauth_user_id ]
        )
        if (accounts.length === 0) {
            return res.status(404).json({ error: 'Account not found!' });
        }
        res.json(accounts[0]);
    } catch (err) {
        console.error('Error fetching OAuth account: ', err);
        res.status(500).json({ error: err.message });
    }
    
});

export default router;
