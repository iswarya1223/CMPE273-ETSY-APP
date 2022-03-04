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
const bcrypt = require('bcryptjs');
//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));

/*
var connection = mysql.createPool({
    host: constraints.DB.host,
    user:constraints.DB.username,
    password: constraints.DB.password,
    port: constraints.DB.port,
    database: constraints.DB.database
});
*/

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


router.post('/', [
  check('uname', 'Name is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password','please enter more chars').isLength({min: 6}),
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    var value = req.body.password;
    const salt=await bcrypt.genSalt(10);
    value =await bcrypt.hash(value,salt);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {uname,email,password} = req.body;
    try{ 
        connection.query(`SELECT email FROM users WHERE email=?`,[email
        ],  function(error,results){
            console.log(results);
            if(results.length === 0){
                console.log("New user");
                connection.query(`Insert into users(uname,email,password) values(?,?,?)`,[uname,
                    email,value],  function(error,results){
                  if(error){
                        res.writeHead(200, {
                             'Content-Type': 'text-plain'
                          });
                         res.send(error.code);
                         res.send("failure");
                     }else{
                          res.writeHead(200,{
                             'Content-Type': 'text/plain'
                         });
                         //res.end(JSON.stringify(results));
                         res.end("success");
                     }
                 });
            }
            else{
                //console.log("User already existed!");
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

router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','password is required').exists()
  ], async (req,res) => {

    console.log(req.body);
    const errors = validationResult(req.body);
    var value = req.body.password;
    const salt=await bcrypt.genSalt(10);
    value =await bcrypt.hash(value,salt);
    console.log(value);
    if(!errors.isEmpty()){

        return res.status(500).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    try{  
        connection.query(`SELECT * FROM users WHERE email=? and password=?`,[email,value
    ],  function(error,results){
        if(results.length !== 0){
            res.send(JSON.stringify(results));
         }else{
            res.send("failure");
         }
        // console.log(results);
        // if(results.length === 0){
        //     console.log("hjkloh");
            
        //     res.json({errors:[{msg: 'Invalid creds'}]});
        // }
        // else{
        //     res.json(results);
        // }
    //   if(error){
    //          res.writeHead(200, {
    //              'Content-Type': 'text-plain'
    //          });
    //          res.send(error.code);
    //      }else{
    //          res.writeHead(200,{
    //              'Content-Type': 'text/plain'
    //          });
    //          //res.send("success");
    //          res.end(JSON.stringify(results));
    //      }
     });
    }
    catch(err){
        res.send("failure")
        //console.error(err.message);
        //res.send("server error");
    }
}
);

module.exports = router;