let cfg = require("../config.json");
const express = require("express");
const router = express.Router();

const pool = require("../pool.js");

router.get("/", async (req, res) => {
  try {

    let query = "Select u.id, to_json(u.role) as role, u.name, u.password from users AS u;";

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

router.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let user = req.body;

    if (user.id == null || user.id === "") {
      res.status(400).json({
        message: "id  must be specified",
      });
      return;
    }

    if (user.name == null) user.name = "newUser";
    if (user.role == null) user.role = ["Kitchen"];
    if (user.password == null) user.password = "123";

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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
