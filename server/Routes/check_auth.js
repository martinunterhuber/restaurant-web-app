let cfg = require("../config.json");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    let token = req.headers.authorization;
    jwt.verify(token, "secret");  
    next();
} catch(error){ 
    return res.status(400).json({message: "Authentication failed"});}
};
