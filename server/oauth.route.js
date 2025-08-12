import { generateOTP, createOTPEmail, storeOTP, verifyOTP } from "./utils/index.js";
import pool from "./db.js";
import express from 'express';
import { transporter } from "./auth.js";

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

router.post('/send-otp', async (req, res) => {
    
    try {
        const { email } = req.body;
        const oneTimePassword = generateOTP();
        
        await storeOTP(pool, email, oneTimePassword);
        
        await transporter.sendMail({
            from: process.env.GOOGLE_APP_EMAIL_USER,
            to: email,
            subject: 'Your Verification Code | Seraphim Luxe',
            html: `
                <h2>Your verification code is:</h2>
                <h1 style="color: #007bff; font-size: 2em; text-align: center; letter-spacing: 0.2em;">${ oneTimePassword }</h1>
                <p>This code expires in 5 minutes.</p>
            `
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

router.post('/verify-otp', async (req, res) => {
    
    try {
    
        const { email, oneTimePassword } = req.body;
        console.log(email, oneTimePassword);
        const [ verification ] = await pool.query(
            `
                SELECT * FROM oauth_verifications
                WHERE identifier = ?
                AND value = ?
                AND expires_at > NOW()
            `,
            [ email, oneTimePassword ]
        );
        
        if (verification.length === 0) {
            console.log("efjefiwss")
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        
        await pool.query(
            `
                UPDATE oauth_users
                SET email_verified = 1
                WHERE email = ?
            `, 
            [ email ]);
        
        await pool.query(
            `
                DELETE FROM oauth_verifications
                WHERE identifier = ?
            `,
            [ email ]);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
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
