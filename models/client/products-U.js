const client = require("../../db");

async function ViewProducts(req, res) {
  try {
    let { search, limit } = req.query;
    let query = "SELECT * FROM products";

    if (search) {
      query += " WHERE name ILIKE $1";
      search = `%${search}%`;
    }

    if (limit) {
      query += " LIMIT $2";
    }

    const result = await client.query(query, limit ? [search, limit] : [search]);

    res.send(result.rows);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  ViewProducts,
};
