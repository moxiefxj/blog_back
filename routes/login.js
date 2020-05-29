const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/login1',async function(req,res){
    var sql = "select username from user where tel = ? and password = ?"
    console.log(req.query)
    var result = await config(sql,[req.query.tel,req.query.password])
    console.log(Array.from(result))
    res.json(Array.from(result))
  })
module.exports = router
