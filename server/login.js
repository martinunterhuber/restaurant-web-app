let cfg = require('./config.json')
const express = require('express');
const router = express.Router();

const pool = require('./pool.js');

const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    if(req.body === undefined){
        res.status(400).json({"message": "body is empty"})
    }

    try{
        let userInfo = req.body;
        userId = userInfo.id;
        userPass = userInfo.pass;

        if(userId === undefined || userId === ""){
            res.status(400).json({"message": "user-id must be given"});
            return;
        }

        if(userPass === undefined || userPass ===""){
            res.status(400).json({"message": "user-password must be given"});
            return
        }

        let result = await pool.query({text: 'SELECT * from users WHERE id=$1 AND password=$2', values: [userId, userPass]});

        if(result.rowCount === 0){
            res.status(400).send({"message": "no such user"});
            return;
        } else{
            const token = jwt.sign({"user":userId},"secret",{expiresIn: 60*60}); 
            res.status(200).json({
                "message": "login successful",
                login: userId,
                token: token
            });
        }
        


    } catch(error){
        res.status(400).json({"message": "Error occured"});
        console.log(error);
        return;
    }
});

module.exports = router;
