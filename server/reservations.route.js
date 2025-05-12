import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.get('/:account_id', async (req, res) => {
    
	try {

		const { account_id } = req.params;

        const [ reservations ] = await pool.query(
			`
				SELECT * FROM reservations
				WHERE account_id = ?
				ORDER BY created_at DESC
			`,
			[ account_id ]
		);

		for (let i = 0; i < reservations['length']; i++) {

			const [ items ] = await pool.query(
				`
					SELECT reservation_item.*, product.label, product.price, product.category, product.subcategory, product.image_url
					FROM reservation_products reservation_item
					JOIN products product ON reservation_item.product_id = product.product_id
					WHERE reservation_item.reservation_id = ?
				`,
				[ reservations[i]['reservation_id'] ]
			)

			reservations[i]['products'] = items;

		};

		res.json(reservations);

    
	} catch (err) {
    
        console.error('Error fetching reservations:', err);
        res.status(500).json({ error: err.message });
    
	}

});

router.post('/', async (req, res) => {

	const connection = await pool.getConnection();
	
	try {
		
		await connection.beginTransaction();
		
		const { account_id, preferred_date, notes, products } = req.body;

		const [ result ] = await connection.query(
			`
				INSERT INTO reservations (account_id, status, preferred_date, notes)
				VALUES (?, 'pending', ?, ?)
			`,
			[ account_id, preferred_date, notes || null ]
		);

		const reservation_id = result['insertId'];

		for (const product of products) {

			await connection.query(
				`
					INSERT INTO reservation_products (reservation_id, product_id, quantity)
					VALUES (?, ?, ?)
				`,
				[ reservation_id, product['product_id'], product['quantity'] || 1 ]
			);

		}

		await connection.commit();

		res.status(201).json({
			message: 'Reservation created successfully!', reservation_id
		});

	} catch (err) {
        await connection.rollback();
        console.error('Error creating reservation:', err);
        res.status(500).json({ error: err.message });
	} finally {
		connection.release();
	}

});

router.put('/:reservation_id', async (req, res) => {

	try {

		const { reservation_id } = req.params;
		const { status } = req.body;

		await pool.query(
			`
				UPDATE reservations SET status = ?
				WHERE reservation_id = ?
			`,
			[ status, reservation_id ]
		);

		res.json({ message: 'Reservation status updated successfully' })

	} catch (err) {
        console.error('Error updating reservation:', err);
        res.status(500).json({ error: err.message });
	}

});

router.delete('/:reservation_id', async (req, res) => {
	
	const connection = await pool.getConnection();

	try {

		await connection.beginTransaction();

		const { reservation_id } = req.params;

		await connection.query(
			`
				DELETE FROM reservation_products WHERE reservation_id = ?
			`,
			[ reservation_id ]
		)

		await connection.query(
			`
				DELETE FROM reservations WHERE reservation_id = ?
			`,
			[ reservation_id ]
		);

		await connection.commit();

		res.status(200).json({
			message: 'Reservation cancelled successfully'
		});

	} catch (err) {
        await connection.rollback();
        console.error('Error cancelling reservation:', err);
        res.status(500).json({ error: err.message });
	} finally {
		connection.release();
	}

});

router.delete('/cancelled/:account_id', async (req, res) => {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const { account_id } = req.params;
        
        const [ cancelledReservations ] = await connection.query(
            `
				SELECT reservation_id
				FROM reservations
				WHERE account_id = ? AND status = "cancelled"
			`,
            [account_id]
        );
        
        if (cancelledReservations.length === 0) {
            return res.json({ message: 'No cancelled reservations to delete', count: 0 });
        }
        
        // Extract just the IDs
        const reservationIds = cancelledReservations.map(r => r.reservation_id);
        
        // Delete from reservation_products for these reservations
        await connection.query(
            'DELETE FROM reservation_products WHERE reservation_id IN (?)',
            [reservationIds]
        );
        
        // Delete the cancelled reservations
        const [result] = await connection.query(
            'DELETE FROM reservations WHERE account_id = ? AND status = "cancelled"',
            [account_id]
        );
        
        await connection.commit();
        
        res.json({ 
            message: 'Cancelled reservations deleted successfully',
            count: result.affectedRows
        });
        
    } catch (err) {
        await connection.rollback();
        console.error('Error deleting cancelled reservations:', err);
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

export default router;