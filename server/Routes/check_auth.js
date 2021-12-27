let cfg = require("../config.json");
const jwt = require("jsonwebtoken");

module.exports = (roles) => (req, res, next) => {
  try{
    let token = req.headers.authorization;
    let content = jwt.verify(token, "secret");  

    if (roles === undefined) {
      next();
    } else if (roles.some((role) => content.roles.find(r => r === role) !== undefined)) {
      next();
    } else {
      return res.status(403).json({message: "Forbidden"});
    }
} catch(error){ 
    return res.status(401).json({message: "Unauthorized"});}
};
