export const deleteOTP = async (pool, email) => {
    await pool.query(
        `
            DELETE FROM oauth_verifications WHERE identifier = ?
        `,
        [ email ]
    );
};

export const storeOTP = async (pool, email, oneTimePassword) => {

    await deleteOTP(pool, email);
    await pool.query(
        `
            INSERT INTO oauth_verifications (identifier, value, expires_at, created_at) 
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE), NOW())
            ON DUPLICATE KEY UPDATE 
            value = VALUES(value), 
            expires_at = VALUES(expires_at), 
            created_at = VALUES(created_at)
        `,
        [ email, oneTimePassword ]
    );
};

export const verifyOTP = async (pool, email, oneTimePassword) => {
    const [ verification ] = await pool.query(
        `
            SELECT * FROM oauth_verifications 
            WHERE identifier = ? AND value = ? AND expires_at > NOW()
        `,
        [ email, oneTimePassword ]
    );
    return verification.length > 0;
};