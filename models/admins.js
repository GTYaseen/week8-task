const client = require("../db");

async function AdminLogin(req, res) {
  let { username, password } = req.body;

  const result = await client.query(
    `SELECT * FROM admins WHERE username = '${username}'`
  );

  if (result.rows.length === 0)
    res.send({ success: false, msg: "User not found" });
  else {
    let user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(user, "shhhhh");
      res.send({ success: true, token, user });
    } else res.send({ success: false, msg: "Wrong password!" });
  }
}

async function AdminRegister(req, res) {
  let { name, department, username, password, phone } = req.body;
  const result =
    await client.query(`INSERT INTO admins (name, department,username, password,phone)
  VALUES ('${name}', '${department}','${username}','${password}','${phone}') RETURNING *`);
  res.send(result.rows);
}

module.exports = {
  AdminLogin,
  AdminRegister,
};
