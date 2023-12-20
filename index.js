const express = require("express");
const app = express();
const admins = require("./routes/admins");




const port = 3000;

app.use(express.static("files"));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/admins", admins);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
