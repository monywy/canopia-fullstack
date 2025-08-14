import { pool } from '../config/db.js';
export class ProductRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM products WHERE status=1');
        return rows;
    }
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id=? AND status=1', [id]);
        const arr = rows;
        return arr[0] ?? null;
    }
    async create(data) {
        const [result] = await pool.query('INSERT INTO products (name, description, price, stock, category_id) VALUES (?,?,?,?,?)', [data.name, data.description ?? null, data.price, data.stock, data.category_id ?? null]);
        const insertId = result.insertId;
        const created = await this.findById(insertId);
        if (!created)
            throw new Error('Failed to fetch created product');
        return created;
    }
    async update(id, data) {
        const existing = await this.findById(id);
        if (!existing)
            throw new Error('Product not found');
        const merged = { ...existing, ...data };
        await pool.query('UPDATE products SET name=?, description=?, price=?, stock=?, category_id=? WHERE id=?', [merged.name, merged.description ?? null, merged.price, merged.stock, merged.category_id ?? null, id]);
        const updated = await this.findById(id);
        if (!updated)
            throw new Error('Failed to fetch updated product');
        return updated;
    }
    async softDelete(id) {
        await pool.query('UPDATE products SET status=0 WHERE id=?', [id]);
    }
}
