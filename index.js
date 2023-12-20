const express = require("express");
const app = express();
const admins = require("./routes/admins");
const users = require("./routes/users");
const productsA = require("./routes/products-A");
const productsU = require("./routes/products-U");
const ordersA = require("./routes/orders-A");
const ordersU = require("./routes/orders-U");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const {uploadFile} = require("@uploadcare/upload-client");
const { AcheckAuth, UcheckAuth }=require('./middleware')


const port = 3000;

app.use(express.static("files"));
app.use(express.json());
app.use(bodyParser.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", function (req, res) {
  //save on project
  req.files.foo.mv(`files/${req.files.foo.name}`, (err) => {
    if (!err) res.send("File uploaded");
    else res.send({ err });
  });
});

app.post("/v2/upload", async function (req, res) {
  //save on server (uplaodcare.com)
  const result = await uploadFile(req.files.foo.data, {
    publicKey: process.env.PUBLICKEY,
    store: "auto",
    metadata: {
      subsystem: "uploader",
      pet: "cat",
    },
  });

  res.send(result);
});

app.use("/api/v1/admins", admins);
app.use("/api/v1/users", users);
app.use("/api/v1/productsU", UcheckAuth, productsU);
app.use("/api/v1/productsA", AcheckAuth, productsA);
app.use("/api/v1/ordersU", UcheckAuth, ordersU);
app.use("/api/v1/ordersA", AcheckAuth, ordersA);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
