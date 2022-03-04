const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
//var constraints = require("../../config.json");
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
router.use(cors());
const User = require('../../models/User');
const e = require('express');

router.use(express.urlencoded({extended: true}));
router.use(express.json())
//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));


var connection = mysql.createConnection({
    host: 'localhost',
    database: 'users_schema',
    port: '3306',
    user: 'root',
    password: 'Git@m123'
});


connection.connect((err) => {
    if(err){
        throw 'Error occured ' + err;
    }
    console.log("pool created");
});


//For route use  GET api/profile

router.post('/me',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
try{  
    connection.query(`SELECT * FROM users WHERE email=?`,email,  
    function(error,results){
    console.log(results);
    if(results.length !== 0){
        res.send(JSON.stringify(results));
     }else{
        res.send("failure");
     }
 });
}
catch(err){
    console.error(err.message);
    res.send("server error");
}
}
);

router.put('/changeprofile',[
    check('address', 'address is required').not().isEmpty()]
  , async (req,res) => {
    const {email,uname,password,city,gender,dateofbirth,mobile,address,country} = req.body;
    try{  
        connection.query(`UPDATE users set uname=?,password=?,city=?,gender=?,dateofbirth=?,
        mobile=?,address=?,country=? where email=?`,[uname,password,city,gender,dateofbirth,
        mobile,address,country,email],  function(error,results){
        console.log(results);
        if(results.length !== 0){
            console.log(results);
            res.send(JSON.stringify(results));
         }else{
            res.send("failure");
         }
        
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);
module.exports = router;