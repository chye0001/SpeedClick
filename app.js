const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/frontpage.html");
});

app.get("/playAsGuest", (req, res) => {
  res.sendFile(__dirname + "/public/gamepage.html");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

module.exports = app;
