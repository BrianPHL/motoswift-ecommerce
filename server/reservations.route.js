import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.get('/recent', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, a.first_name, a.last_name, a.email
      FROM reservations r
      JOIN accounts a ON r.account_id = a.account_id
      ORDER BY r.created_at DESC
    `);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching recent reservations:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:account_id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*
      FROM reservations r
      WHERE r.account_id = ?
    `, [req.params.account_id]);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user reservations:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:reservation_id/products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT rp.*, p.label, p.price, p.category, p.subcategory, p.image_url
      FROM reservation_products rp
      JOIN products p ON rp.product_id = p.product_id
      WHERE rp.reservation_id = ?
    `, [req.params.reservation_id]);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reservation products:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:reservation_id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const reservationId = req.params.reservation_id;
    
    await pool.query(`
      UPDATE reservations
      SET status = ?, notes = IFNULL(?, notes), modified_at = NOW()
      WHERE reservation_id = ?
    `, [status, notes, reservationId]);
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { account_id, preferred_date, notes, products } = req.body;
    
    const [result] = await connection.query(`
      INSERT INTO reservations (account_id, preferred_date, notes, status)
      VALUES (?, ?, ?, 'pending')
    `, [account_id, preferred_date, notes]);
    
    const reservationId = result.insertId;
    
    if (products && products.length > 0) {
      for (const product of products) {
        await connection.query(`
          INSERT INTO reservation_products (reservation_id, product_id, quantity)
          VALUES (?, ?, ?)
        `, [reservationId, product.product_id, product.quantity || 1]);
      }
    }
    
    await connection.commit();
    res.status(201).json({ reservation_id: reservationId });
  } catch (err) {
    await connection.rollback();
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

router.delete('/:reservation_id', async (req, res) => {
	
	const connection = await pool.getConnection();
	
	try {
		
		await connection.beginTransaction();

		const { reservation_id } = req.params;

		await connection.query(
		  `DELETE FROM reservation_products WHERE reservation_id = ?`,
		  [reservation_id]
		);

		const [result] = await connection.query(
		  `DELETE FROM reservations WHERE reservation_id = ?`,
		  [reservation_id]
		);

		if (result.affectedRows === 0) {
		  await connection.rollback();
		  return res.status(404).json({ error: 'Reservation not found' });
		}

		await connection.commit();
		res.json({ message: 'Reservation deleted successfully' });
	
	} catch (err) {
  
		await connection.rollback();
  		console.error('Error deleting reservation:', err);
  		res.status(500).json({ error: err.message });

	} finally { connection.release();}
});

export default router;