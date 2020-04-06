const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/add', async function (req, res) {
    var sql = "update essay set view = view+1 where id = ?";
    let result = await config(sql,[req.query.id])
    console.log(result)
});


module.exports = router;
