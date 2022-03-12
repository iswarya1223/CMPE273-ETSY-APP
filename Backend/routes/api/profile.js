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

//getting all products
router.get('/getproducts', [
], async (req,res) => {
    console.log("into backend");
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {category} = req.body;
    try{  
        connection.query(`SELECT * FROM products`,  function(error,results){
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
)

// getting the particular product details
router.get('/getProductDetails/:productid', [
], async (req,res) => {
    
    console.log("into backend single product");
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {productid} = req.params;
    try{  
        connection.query(`SELECT * FROM products WHERE productid=?`,[productid
        ],  function(error,results){
       if(results.length !== 0){
           res.status(200).json({success: true,results,});
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
)

//adding the cart details
router.post('/addtocart'
  , async (req,res) => {
    //if (!req.session.user) {
      //  res.redirect('/login');
    //}
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {email,productid,quantity,price} = req.body;
        try{   
            connection.query(`SELECT email from cart where email = ? and productid =?`,[email,productid],function(error,results){
            if (results.length === 0){
            connection.query(`Insert into cart(email,productid,quantity) values(?,?,?)`,[email,
            productid,quantity],  function(error,results){
                  if(error){
                         res.send(error.code);
                         res.send("failure");
                     }else{
                         res.end("success");
                     }
                 });
         }
         else{
            connection.query(`UPDATE cart set quantity=? where email =? and productid =?`,[quantity,email,
                productid],function(error,results){
        if(results.length !== 0){
            res.end("success");
         }else{
            res.send("failure");
         }
        
     });
    }
}); 
         }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// delete products from the cart
router.post('/deletefromcart'
  , async (req,res) => {
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {productid,email} = req.body;
    try{         
            connection.query(`Delete from cart where email = ? and productid = ?`,[email,productid],function(error,results){
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
                     res.end("success");
                 }

        })}
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
});

//my cart details
router.post('/getCartDetails'
  , async (req,res) => {
    console.log("email details",req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`SELECT  P.productid , P.productname , P.shopname , P.image_URL,C.quantity,P.price,P.currency,
            C.cartid,P.stock from products P , cart C 
            where C.email = ?  AND P.productid IN ( select C.productid from cart)`,[email],  function(error,results){
                if(error){
                    res.writeHead(200, {
                         'Content-Type': 'text-plain'
                      });
                     res.send(error.code);
                     res.send("failure");
                 }else{
            console.log(results);
            res.send(JSON.stringify(results));
                 }
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// creating a order id in orders table after paying for products in the cart.
router.post('/orders'
  , async (req,res) => {
    console.log("emails is",req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`Insert into orders(email,orderdate) values(?,?)`,[email,
            new Date().toISOString().slice(0, 10)],function(error,results){
                console.log(results)});
            connection.query(`SELECT  productid,quantity from cart where email = ?`,email,function(error,results){
                //results=JSON.parse(JSON.stringify(results));
                console.log(results)
                console.log(results[0].productid)
                console.log(results[0].quantity)
            connection.query(`SELECT  max(orderid) as orderid from orders where email = ?`,email,function(error1,results1){
            const orderid = results1[0].orderid
            for ( var i =0;i<results.length;i++) {
                //var productid = results[i].productid
                connection.query(`Insert into orderdetails(productid,quantity,orderid) values(?,?,?)`,[results[i].productid,results[i].quantity,orderid],function(error2,results2){
                    //var i;
                    console.log("printing i",i);
                    connection.query(`SELECT stock from products where productid = ?`,[results[i].productid],function(error3,results3){
                       console.log(results3)
                       console.log(results3[0].stock)                   
                    connection.query(`UPDATE products set stock=? where productid =?`,[(results3[0].stock-results[i].quantity),results[i].productid])
                    if(error) throw error;
                    console.log('values added')
                   
                    
            })})}})})
            connection.query(`Delete from cart where email = ?`, email)

            
         }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// fetching the orders made by a particular end user.
router.post('/mypurchases'
  , async (req,res) => {
    console.log(req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`SELECT  P.productid , P.productname , P.shopname , P.image_URL,OD.quantity,OD.price,
            O.orderid , O.orderdate from etsy.products P , etsy.orders O , etsy.orderdetails OD
            where O.email = ?  AND P.productid IN ( select OD.productid from etsy.orderdetails 
            where OD.orderid IN (select O.orderid from etsy.orders))`,email,  function(error,results){
            console.log(results);
            res.send(JSON.stringify(results));
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);
module.exports = router;
