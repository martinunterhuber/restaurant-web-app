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
    let query = 'SELECT * FROM tables;';

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

app.delete("/tables/:id", async(req,res)=>{
  let id = req.params.id;
  try {
		let results = await pool.query({ text: `SELECT * from tables where id=$1`, values: [id] });
		
		let resultRows = results.rows;

		if (resultRows.length < 1) {
			res.status(404).json({
				"message": "no table with id "+id+" found."
			});
			return;
		}
		
	
		let deletion = await pool.query({ text: `DELETE from tables where id=$1`, values: [id] });
		
		res.status(200).json({
				"message": "table deleted successfully",
          
		});
		return;
	}
    catch(error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
    }
})

app.get("/categories", async (req, res) => {
  try {
    let query = 'SELECT * FROM categories;';

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

app.delete("/categories/:id", async(req,res)=>{
  let id = req.params.id;
  try {
		let results = await pool.query({ text: `SELECT * from categories where id=$1`, values: [id] });
		
		let resultRows = results.rows;

		if (resultRows.length < 1) {
			res.status(404).json({
				"message": "no categorie with id "+id+" found."
			});
			return;
		}
		
	
		let deletion = await pool.query({ text: `DELETE from categories where id=$1`, values: [id] });
		
		res.status(200).json({
				"message": "categorie deleted successfully",
          
		});
		return;
	}
    catch(error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
    }
})

app.get("/menuitems", async (req, res) => {
  try {
    let query =
    'SELECT m.id, m.title, m.description, m.price, to_json(m.allergens) as allergens, m.status, array_agg(c.name) AS categories '+
    'FROM menuitem m LEFT JOIN menuincategorie e ON m.id = e.menu_id LEFT JOIN  categories c ON e.categorie_id = c.id '+
    'GROUP BY m.id ORDER BY m.id;';
    
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

app.delete("/menuitems/:id", async(req,res)=>{
  let id = req.params.id;
  try {
		let results = await pool.query({ text: `SELECT * from menuitem where id=$1`, values: [id] });
		
		let resultRows = results.rows;

		if (resultRows.length < 1) {
			res.status(404).json({
				"message": "no menu with id "+id+" found."
			});
			return;
		}
		
	
		let deletion = await pool.query({ text: `DELETE from menuitem where id=$1`, values: [id] });
		
		res.status(200).json({
				"message": "menu deleted successfully",
          
		});
		return;
	}
    catch(error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
    }
})

app.get("/users", async (req, res) => {
  try {
    let query = 'Select u.id, to_json(u.role) as role, u.name, u.password from users AS u;';

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

app.delete("/users/:id", async(req,res)=>{
  let id = req.params.id;
  try {
		let results = await pool.query({ text: `SELECT * from users where id=$1`, values: [id] });
		
		let resultRows = results.rows;

		if (resultRows.length < 1) {
			res.status(404).json({
				"message": "no user with id "+id+" found."
			});
			return;
		}
		
	
		let deletion = await pool.query({ text: `DELETE from users where id=$1`, values: [id] });
		
		res.status(200).json({
				"message": "user deleted successfully",
          
		});
		return;
	}
    catch(error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
    }
})

app.get("/testAuth", checkAuth, (req, res) => {
  res.status(200).send("Auth successfull");
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
