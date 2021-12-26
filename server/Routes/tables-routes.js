let cfg = require("../config.json");
const express = require("express");
const router = express.Router();

const pool = require("../pool.js");

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let table = req.body;

    if (table.id == null || table.id === "") {
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
        message: "table with id=" + table.id + " already exists",
      });
      return;
    }

    if (table.description == null) table.description = "";
    if (table.capacity == null) table.capacity = 0;

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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
