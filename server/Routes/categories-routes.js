let cfg = require("../config.json");
const express = require("express");
const router = express.Router();

const pool = require("../pool.js");

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ message: "body is empty" });
    return;
  }
  try {
    let category = req.body;

    if (category.id == null || category.id === "") {
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

    if (category.name == null) category.name = "newCategory";
    if (category.type == null) category.type = "special";

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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
