const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "yaseen",
    password: "77565155",
    port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((e) => console.log("Error", e));

module.exports = client;
