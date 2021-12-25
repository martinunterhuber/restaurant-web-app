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

const tableRoutes = require("./Routes/tables-routes");
app.use("/tables", tableRoutes);

const categoryRoutes = require("./Routes/categories-routes");
app.use("/categories", categoryRoutes);

const userRoutes = require("./Routes/users-routes");
app.use("/users", userRoutes);

const menuItemRoutes = require("./Routes/menu-item-routes");
app.use("/menuitems", menuItemRoutes);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send("Welcome to the REST Service for our webtech-project!");
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
