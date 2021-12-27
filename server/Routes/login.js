let cfg = require("../config.json");
const express = require("express");
const router = express.Router();

const pool = require("../pool.js");

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ message: "body is empty" });
  }

  try {
    let userInfo = req.body;
    userName = userInfo.name;
    userPass = userInfo.pass;

    if (userName == null || userName === "") {
      res.status(400).json({ message: "name must be given" });
      return;
    }

    if (userPass == null || userPass === "") {
      res.status(400).json({ message: "pass must be given" });
      return;
    }

    let result = await pool.query({
      text: "SELECT name, to_json(role) as roles from users WHERE name=$1 AND password=$2",
      values: [userName, userPass],
    });

    if (result.rowCount === 0) {
      res.status(400).send({ message: "no such user" });
      return;
    }

    userResult = result.rows[0];
    roles = userResult.roles;

    const token = jwt.sign({ user: userName, roles: roles }, "secret", { expiresIn: 60 * 60 });
    res.status(200).json({
      message: "login successful",
      login: userName,
      roles: roles,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: "Error occured" });
    console.log(error);
    return;
  }
});

module.exports = router;
