async function getAllProducts() {
    try {
      const sql = 'SELECT * FROM products';
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function getProductById(id) {
    try {
      const sql = 'SELECT * FROM products WHERE id = ?';
      const [rows] = await db.query(sql, [id]);
      return rows[0];
    } catch (err) {
      console.error(err);
    }
  }
  
  async function createProduct(name, price, description) {
    try {
      const sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
      const [result] = await db.query(sql, [name, price, description]);
      return result.insertId;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function updateProduct(id, name, price, description) {
    try {
      const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
      await db.query(sql, [name, price, description, id]);
    } catch (err) {
      console.error(err);
    }
  }
  
  async function deleteProduct(id) {
    try {
      const sql = 'DELETE FROM products WHERE id = ?';
      await db.query(sql, [id]);
    } catch (err) {
      console.error(err);
    }
  }