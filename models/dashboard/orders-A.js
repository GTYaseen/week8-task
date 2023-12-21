const client = require("../../db");

async function ViewOrders(req, res) {
  const result = await client.query(`SELECT * FROM orders`);
  res.send(result.rows);
}
async function changeStatus(req, res) {
  const { status } = req.body;
  const { id } = req.params;

  const validStatusValues = ['PENDING', 'PREPARING', 'DELIVERED'];
  if (!validStatusValues.includes(status)) {
    return res.status(400).send('Invalid status value');
  }

  const result = await client.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  res.send(result.rows);
}
module.exports = {
  ViewOrders,
  changeStatus,
};
