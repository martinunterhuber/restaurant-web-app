let cfg = require("./config.json");

let express = require("express");
let cors = require("cors");
const app = express();
app.use(express.static("public")); 
app.use(cors()); 

const pool = require("./pool.js");

let bodyParser = require("body-parser");
app.use(bodyParser.json()); 

const checkAuth = require("./check_auth");

const loginRoutes = require("./login");
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      .send("Welcome to the REST Service for our webtech-project!");
  });


  app.get("/test", checkAuth, (req, res) => {
    res.status(200).send("Auth successfull");
  });


let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);