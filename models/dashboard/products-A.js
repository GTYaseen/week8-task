const client = require("../../db");

async function ViewProducts(req, res) {
  const result = await client.query(`SELECT * FROM products`);
  res.send(result.rows);
}
async function AddProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const result = await client.query(
    `INSERT INTO products (name, price, discount, image,active) VALUES ($1, $2, $3, $4,$5) RETURNING *`,
    [name, price, discount, image, active]
  );
  res.send(result.rows);
}
async function UpdateProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const { id } = req.params;
  const result = await client.query(
    `UPDATE products SET name = $1, price = $2, discount = $3, image = $4, active = $5 WHERE id = $6 RETURNING *`,
    [name, price, discount, image, active, id]
  );
  res.send(result.rows);
}
async function DeleteProduct(req, res) {
  const { id } = req.params;
  client.query(`DELETE FROM products WHERE id = $1`, [id]);
  res.send("success");
}

module.exports = {
  ViewProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
