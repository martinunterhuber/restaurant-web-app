let cfg = require("../config.json");
const express = require("express");
const router = express.Router();

const pool = require("../pool.js");

router.get("/", async (req, res) => {
  try {
    let query =
      "SELECT m.id, m.title, m.description, m.price, to_json(m.allergens) as allergens, m.status, array_agg(c.id) AS categories " +
      "FROM menuitem m LEFT JOIN menuincategorie e ON m.id = e.menu_id LEFT JOIN  categories c ON e.categorie_id = c.id " +
      "GROUP BY m.id ORDER BY m.id;";

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
        values: [newId],
      });
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

router.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ message: "body is empty" });
    return;
  }

  try {
    let item = req.body;

    if (item.id == null) {
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

    if (item.title == null) item.title = "newMenuItem";
    if (item.description == null) item.description = "Description";
    if (item.price == null) item.price = 0.0;
    if (item.status == null) item.status = "not available";
    if (item.allergens == null) item.allergens = ["A"];

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
    if (item.categories != null) {
      for (let category of item.categories) {
        try {
          await pool.query({
            text: "INSERT INTO menuInCategorie(menu_id, categorie_id) VALUES($1, $2);",
            values: [item.id, category],
          });
        } catch (error) {
          console.log(error);
          logForCategories += " issue adding categorie: " + category + ".";
        }
      }
    }

    res.status(201).json({
      message: "menu item created successfully." + logForCategories,
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

module.exports = router;
