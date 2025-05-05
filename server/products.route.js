import pool from "./db.js";
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    
	try {

        const [ rows ] = await pool.query('SELECT * FROM products');
        res.json(rows);
    
	} catch (err) {
    
		res.status(500).json({ error: err.message });
    
	}

});

router.post('/', async (req, res) => {
    try {
        const { label, price, category, subcategory, description } = req.body;
        
        const [ result ] = await pool.query(
            `
				INSERT INTO products (label, price, category, subcategory, description, image_url)
             	VALUES (?, ?, ?, ?, ?, ?)
			`,
            [label, price, category, subcategory || null, description || null, "none for now" ]
        );
        
        const newProductId = result['insertId'];
        
		res.status(201).json({
			message: 'Product added successfully!', newProductId
		});
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:product_id', async (req, res) => {
    try {
        const { product_id } = req.params;
        
        await pool.query(
            `
				DELETE FROM products WHERE product_id = ?
			`,
            [product_id]
        );
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
