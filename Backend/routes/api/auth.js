const express = require('express');
const router = express.Router();

//For route use  GET api/auth

router.get('/',(req,res) => res.send('Authentication Route'));

module.exports = router;