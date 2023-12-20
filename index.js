const express = require("express");
const app = express();
const dashboard = require("./routes/dashboard");
const client = require("./routes/client");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const {uploadFile} = require("@uploadcare/upload-client");



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


app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/client", client);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
