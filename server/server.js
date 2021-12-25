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
  res.status(200).send("Welcome to the REST Service for our webtech-project!");
});

app.get("/tables", async (req, res) => {
  try {
    let query = "SELECT * FROM tables;";

    let result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.post("/tables", async (req, res) => {
  if (req.body === undefined) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    console.log();
    let table = req.body;

    if (table.id === undefined || table.id === "") {
      res.status(400).json({
        message: "id must be specified",
      });
      return;
    }

    let resultId = await pool.query({
      text: `SELECT id FROM tables where id=$1`,
      values: [table.id],
    });

    let resultIdRows = resultId.rows;

    if (resultIdRows.length > 0) {
      res.status(400).json({
        message: "object with id=" + table.id + " already exists",
      });
      return;
    }

    if (table.description === undefined) table.description = "";
    if (table.capacity === undefined) table.capacity = 0;

    let creation = await pool.query({
      text: `INSERT INTO tables (id,capacity,description) VALUES($1,$2,$3)`,
      values: [table.id, table.capacity, table.description],
    });
    if (creation.rowCount < 1) {
      res.status(404).json({
        message: "no table created",
      });
      return;
    }

    res.status(201).json({
      message: "table created successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({ message: "error occured" });
    console.log(error.stack);
    return;
  }
});

app.put("/tables/:id", async (req, res) => {
  let id = req.params.id;

  if (req.body == null) {
    res.status(400).json({
      message: "body is empty",
    });
    return;
  }

  try {
    let results = await pool.query({
      text: `SELECT * from tables where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "table with id=" + id + " not found",
      });
      return;
    }

    let current = resultRows[0];

    let newId = req.body.id != null ? req.body.id : current.id;
    let capacity =
      req.body.capacity != null ? req.body.capacity : current.capacity;
    let description =
      req.body.description != null ? req.body.description : current.description;

    results = await pool.query({
      text: `UPDATE tables SET id=$1, capacity=$2, description=$3 WHERE id=$4`,
      values: [newId, capacity, description, id],
    });

    if (results.rowCount < 1) {
      res.status(404).json({
        message: "no changes were applied",
      });
      return;
    }
    res.status(200).json({
      message: "update successful",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.delete("/tables/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await pool.query({
      text: `SELECT * from tables where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "no table with id " + id + " found.",
      });
      return;
    }

    let deletion = await pool.query({
      text: `DELETE from tables where id=$1`,
      values: [id],
    });

    res.status(200).json({
      message: "table deleted successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.get("/categories", async (req, res) => {
  try {
    let query = "SELECT * FROM categories;";

    let result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.put("/categories/:id", async (req, res) => {
  let id = req.params.id;

  if (req.body == null) {
    res.status(400).json({
      message: "body is empty",
    });
    return;
  }

  try {
    let results = await pool.query({
      text: `SELECT * from categories where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "category with id=" + id + " not found",
      });
      return;
    }

    let current = resultRows[0];

    let newId = req.body.id != null ? req.body.id : current.id;
    let name = req.body.name != null ? req.body.name : current.name;
    let type = req.body.type != null ? req.body.type : current.type;

    results = await pool.query({
      text: `UPDATE categories SET id=$1, name=$2, type=$3 WHERE id=$4`,
      values: [newId, name, type, id],
    });

    if (results.rowCount < 1) {
      res.status(404).json({
        message: "no changes were applied",
      });
      return;
    }
    res.status(200).json({
      message: "update successful",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

let types = ["food", "special", "beverage"];
app.post("/categories", async (req, res) => {
  if (req.body === undefined) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let category = req.body;

    if (category.id === undefined || category.id === "") {
      res.status(400).json({
        message: "id must be specified",
      });
      return;
    }

    let resultId = await pool.query({
      text: `SELECT id FROM categories where id=$1`,
      values: [category.id],
    });

    if (resultId.rows.length > 0) {
      res.status(400).json({
        message: "category with id=" + category.id + " already exists",
      });
      return;
    }

    if (category.name === undefined) category.name = "newCategory";
    if (category.type === undefined) category.type = "special";
    else {
      if (!types.includes(category.type)) {
        res.status(400).json({
          message: "type has to be food, beverage or special",
        });
        return;
      }
    }

    let creation = await pool.query({
      text: `INSERT INTO categories (id,name,type) VALUES($1,$2,$3)`,
      values: [category.id, category.name, category.type],
    });

    if (creation.rowCount < 1) {
      res.status(404).json({
        message: "no category created",
      });
      return;
    }

    res.status(201).json({
      message: "category created successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({ message: "error occured" });
    console.log(error.stack);
    return;
  }
});

app.delete("/categories/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await pool.query({
      text: `SELECT * from categories where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "no categorie with id " + id + " found.",
      });
      return;
    }

    let deletion = await pool.query({
      text: `DELETE from categories where id=$1`,
      values: [id],
    });

    res.status(200).json({
      message: "categorie deleted successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.get("/menuitems", async (req, res) => {
  try {
    let query =
      "SELECT m.id, m.title, m.description, m.price, to_json(m.allergens) as allergens, m.status, array_agg(c.name) AS categories " +
      "FROM menuitem m LEFT JOIN menuincategorie e ON m.id = e.menu_id LEFT JOIN  categories c ON e.categorie_id = c.id " +
      "GROUP BY m.id ORDER BY m.id;";

    let result = await pool.query(query);
    m = result.rows[0].allergens;
    first = m[2];
    console.log(first);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.put("/menuitems/:id", async (req, res) => {
  let id = req.params.id;

  if (req.body == null) {
    res.status(400).json({
      message: "body is empty",
    });
    return;
  }

  try {
    let results = await pool.query({
      text: `SELECT * from menuitem where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "menu-item with id=" + id + " not found",
      });
      return;
    }

    let current = resultRows[0];

    let newId = req.body.id != null ? req.body.id : current.id;
    let title = req.body.title != null ? req.body.title : current.title;
    let description =
      req.body.description != null ? req.body.description : current.description;
    let price = req.body.price != null ? req.body.price : current.price;
    let allergens =
      req.body.allergens != null ? req.body.allergens : current.allergens;
    let status = req.body.status != null ? req.body.status : current.status;

    results = await pool.query({
      text: `UPDATE menuitem SET id=$1, title=$2, description=$3, price=$4, allergens=$5, status=$6 WHERE id=$7 ;`,
      values: [newId, title, description, price, allergens, status, id],
    });

    changesApplied = results.rowCount >= 1;
    if (!changesApplied) {
      res.status(404).json({
        message: "no changes were applied",
      });
      return;
    }

    logForCategories = "";
    if (changesApplied && req.body.categories != null) {
      await pool.query({
        text: "DELETE FROM menuInCategorie m WHERE m.menu_id=$1",
        values: [newId]})
      let categories = req.body.categories;
      for (let category of categories) {
        try {
          await pool.query({
            text: "INSERT INTO menuInCategorie(menu_id, categorie_id) VALUES($1, $2);",
            values: [newId, category],
          });
        } catch (error) {
          console.log(error);
          logForCategories +=
            "Something went wrong with categorie: " + category + "\n";
        }
      }
    }
    res.status(200).json({
      message: "update successful",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

let allergens = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
];
app.post("/menuitems", async (req, res) => {
  if (req.body === undefined) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let item = req.body;

    if (item.id === undefined) {
      res.status(400).json({
        message: "id must be specified",
      });
      return;
    }

    let resultId = await pool.query({
      text: `SELECT id FROM menuitem where id=$1`,
      values: [item.id],
    });

    if (resultId.rows.length > 0) {
      res.status(400).json({
        message: "menuitem with id=" + item.id + " already exists",
      });
      return;
    }

    if (item.title === undefined) item.title = "newMenuItem";
    if (item.description === undefined) item.description = "Description";
    if (item.price === undefined) item.price = 0.0;
    if (item.status === undefined) item.status = "not available";
    if (item.allergens === undefined) item.allergens = ["A"];

    let creation = await pool.query({
      text: `INSERT INTO menuitem (id,title,description, price, allergens, status) VALUES($1,$2,$3,$4,$5,$6);`,
      values: [
        item.id,
        item.title,
        item.description,
        item.price,
        item.allergens,
        item.status,
      ],
    });

    itemCreated = creation.rowCount >= 1;

    if (!itemCreated) {
      res.status(404).json({
        message: "no menu item created",
      });
      return;
    }

    logForCategories = "";
    if (itemCreated && item.categories !== undefined) {
      for (let category of item.categories) {
        try {
          await pool.query({
            text: "INSERT INTO menuInCategorie(menu_id, categorie_id) VALUES($1, $2);",
            values: [item.id, category],
          });
        } catch (error) {
          console.log(error);
          logForCategories +=
            "Something went wrong with categorie: " + category + "\n";
        }
      }
    }

    res.status(201).json({
      message: "menu item created successfully\n" + logForCategories,
    });
    return;
  } catch (error) {
    res.status(400).json({ message: "error occured" });
    console.log(error.stack);
    return;
  }
});

app.delete("/menuitems/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await pool.query({
      text: `SELECT * from menuitem where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "no menu with id " + id + " found.",
      });
      return;
    }

    let deletion = await pool.query({
      text: `DELETE from menuitem where id=$1`,
      values: [id],
    });

    res.status(200).json({
      message: "menu deleted successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.get("/users", async (req, res) => {
  try {
    let query =
      "Select u.id, to_json(u.role) as role, u.name, u.password from users AS u;";

    let result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.get("/categories", async (req, res) => {
  try {
    let query = "SELECT * FROM categories;";

    let result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

let roles = ["Waiter", "Kitchen", "Backoffice"];
app.post("/users", async (req, res) => {
  if (req.body === undefined) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let user = req.body;

    if (
      user.id === undefined ||
      user.id === "" ||
      user.name === undefined ||
      user.name === "" ||
      user.role === undefined ||
      user.password === undefined ||
      user.password === " "
    ) {
      res.status(400).json({
        message: "id, name, role and password must be specified",
      });
      return;
    }

    for (let role of user.role) {
      if (!roles.includes(role)) {
        res
          .status(400)
          .json({ message: "roles have to be Waiter, Kitchen or Backoffice" });
        return;
      }
    }

    let resultId = await pool.query({
      text: `SELECT id FROM users where id=$1`,
      values: [user.id],
    });

    if (resultId.rows.length > 0) {
      res.status(400).json({
        message: "user with id=" + user.id + " already exists",
      });
      return;
    }

    let creation = await pool.query({
      text: `INSERT INTO users (id,name,role, password) VALUES($1,$2,$3,$4)`,
      values: [user.id, user.name, user.role, user.password],
    });

    if (creation.rowCount < 1) {
      res.status(404).json({
        message: "no user created",
      });
      return;
    }

    res.status(201).json({
      message: "user created successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({ message: "error occured" });
    console.log(error.stack);
    return;
  }
});

app.put("/users/:id", async (req, res) => {
  let id = req.params.id;

  if (req.body == null) {
    res.status(400).json({
      message: "body is empty",
    });
    return;
  }

  try {
    let results = await pool.query({
      text: `SELECT * from users where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "user with id=" + id + " not found",
      });
      return;
    }

    let current = resultRows[0];

    let newId = req.body.id != null ? req.body.id : current.id;
    let role = req.body.role != null ? req.body.role : current.role;
    let name = req.body.name != null ? req.body.name : current.name;
    let password =
      req.body.password != null ? req.body.password : current.password;

    results = await pool.query({
      text: `UPDATE users SET id=$1, role=$2, name=$3, password=$4 WHERE id=$5`,
      values: [newId, role, name, password, id],
    });

    if (results.rowCount < 1) {
      res.status(404).json({
        message: "no changes were applied",
      });
      return;
    }
    res.status(200).json({
      message: "update successful",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.delete("/users/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await pool.query({
      text: `SELECT * from users where id=$1`,
      values: [id],
    });

    let resultRows = results.rows;

    if (resultRows.length < 1) {
      res.status(404).json({
        message: "no user with id " + id + " found.",
      });
      return;
    }

    let deletion = await pool.query({
      text: `DELETE from users where id=$1`,
      values: [id],
    });

    res.status(200).json({
      message: "user deleted successfully",
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "error occurred",
    });
    console.log(error.stack);
    return;
  }
});

app.get("/testAuth", checkAuth, (req, res) => {
  res.status(200).send("Auth successfull");
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
