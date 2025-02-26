const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let nextId = 0;

app.get("/", (req, res) => {
  console.log(users);
  res.sendFile(__dirname + "/public/frontpage.html");
});

app.get("/play", (req, res) => {
  res.sendFile(__dirname + "/public/gamepage.html");
});

app.get("/signUp", (req, res) => {
  res.sendFile(__dirname + "/public/signuppage.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/loginpage.html");
});

app.get("/users/:username", (req, res) => {

  const username = req.params.username;

  const foundUserIndex = users.findIndex((user) => user.username === username);
  const foundUser = users[foundUserIndex];
  console.log(foundUser);
  
  res.send({data: foundUser})

})

app.post("/updateHistory/:username", (req, res) => {
  const username = req.params.username;
  const reqBody = req.body;

  const recordedReactionTime = {
    reactionTime: reqBody.reactionTime,
    date: reqBody.date, //unix-timestamp
  };

  const foundUserIndex = users.findIndex((user) => user.username === username);
  if (foundUserIndex === -1) {
    res.status(404).send({ error: `No user found with username: ${username}` });
    return;
  }

  users[foundUserIndex].reactionTimeHistory.push(recordedReactionTime);
  res.send({ data: recordedReactionTime });
});

app.post("/signUp", (req, res) => {
  const reqBody = req.body;

  if (!reqBody.username || !reqBody.password) {
    res.status(400).send({ error: "Missing credentials" });
    return;
  }

  const usernameTaken = users.some(
    (user) => user.username === reqBody.username
  );

  if (usernameTaken) {
    res.status(401).send({ error: "Username taken" });
    return;
  }

  nextId++;
  const newUser = {
    id: nextId,
    username: reqBody.username,
    password: reqBody.password,
    reactionTimeHistory: [],
  };

  users.push(newUser);

  const userWithoutPassword = {
    id: newUser.id,
    username: newUser.username,
  };
  res.send({ data: userWithoutPassword });
});

app.post("/login", (req, res) => {
  const reqBody = req.body;

  if (!reqBody.username || !reqBody.password) {
    res.status(400).send({ error: "Missing credentials" });
    return;
  }

  const foundUserIndex = users.findIndex(
    (user) =>
      user.username === reqBody.username && user.password === reqBody.password
  );

  if (foundUserIndex === -1) {
    res.status(401).send({ error: "Invalid credentials" });
  } else {
    
    const foundUser = {
      id: users[foundUserIndex].id,
      username: users[foundUserIndex].username,
      reactionTimeHistory: users[foundUserIndex].reactionTimeHistory
    }
    res.send({ data: foundUser });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

module.exports = app;
