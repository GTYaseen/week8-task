const client = require("../../db");

async function AddOrder(req, res) {
  try {
    const { items, userid, address, orderdate, status } = req.body;

    // Convert the items object to a JSON string
    const itemsJsonString = JSON.stringify(items);

    const result = await client.query(
      `INSERT INTO orders (items, userid, address, orderdate, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [itemsJsonString, userid, address, orderdate, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  AddOrder,
};
