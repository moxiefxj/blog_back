const express = require('express');
const router = express.Router();
const config = require('../config/config');
 
//get
router.get('/list', async function (req, res) {
    var sql = "SELECT e.*,k.kind,k.kind_child FROM essay e,esay_kind ek,kinds k WHERE e.id = ek.essayid AND ek.kindid = k.id";
    let result = await config(sql)
    res.json(Array.from(result))
});

router.get('/high_qualitylist', async function (req, res) {
    var sql = "SELECT * FROM essay e ORDER BY e.`like` DESC LIMIT 5 ";
    let result = await config(sql)
    res.json(Array.from(result))
});

// 根据id查询文章
router.get('/page',async function(req,res){
    var sql = 'select e.*, k.kind_child from essay e , esay_kind ek,kinds k where e.id = ek.essayid AND ek.kindid = k.id and e.id = ?'
    let result = await config(sql,[req.query.data])
    console.log("根据id查询文章"+Array.from(result))
    res.json(Array.from(result))  
});

// 根据类别查询文章
router.get('/kind',async function(req,res){
    var sql = 'select e.*,k.kind_child from essay e, esay_kind ek,kinds k where e.id = ek.essayid AND ek.kindid = k.id and k.kind_child = ?'
    let result = await config(sql,[req.query.kind_child])
    // console.log(Array.from(result))
    res.json(Array.from(result))
    
});

module.exports = router;


