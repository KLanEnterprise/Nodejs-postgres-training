const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const db = require("./queries");
const app = express();

const port = 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD','POST','PUT','UPDATE','PATCH','DELETE']
}))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/accounts", db.getAccounts);
app.get("/users/:racine_compte", db.getUserByRacine);
app.post("/account", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
