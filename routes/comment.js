const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/header', async function (req, res) {
    var sql = "SELECT * FROM tb_header ";
    let result = await config(sql)
    res.json(Array.from(result))
});
router.get('/add',async function(req,res){
    console.log(req.query.toid)
    let sql = 'INSERT INTO comment(toid, comment, username, headerimg) VALUES(?,?,?,?)'
    let result = await config(sql,[req.query.toid,req.query.comment,req.query.username,req.query.headerimg])
    
    if(req.query.toid != -1){
        // 文章评论区
       let sql1 = 'update essay set comments = comments+1 where id=?'
       let result2 = await config(sql1,[req.query.toid]) 
    }
    res.send(result)
})

router.get('/list',async function(req,res){
    let sql = 'SELECT * FROM comment c WHERE c.toid = ? order by comment_time desc'
    console.log(req.query.toid)
    let result = await config(sql,[req.query.toid])
    res.json(Array.from(result))
})

module.exports = router;