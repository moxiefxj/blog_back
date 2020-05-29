const express = require('express');
const router = express.Router();
const config = require('../config/config');
 
//get
router.get('/list', async function (req, res) {
    var sql = "SELECT e.*,k.kind,k.kind_child FROM essay e,esay_kind ek,kinds k WHERE e.id = ek.essayid AND ek.kindid = k.id order by e.send_time desc";
    let result = await config(sql)
    res.json(Array.from(result))
});

router.get('/high_qualitylist', async function (req, res) {
    var sql = "SELECT * FROM essay e ORDER BY e.view DESC LIMIT 5 ";
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
// 写文章
router.get('/write',async function(req,res){
    // 插入文章
    var sql = 'INSERT INTO essay (essayimg,title,`character`,`like`,view,comments) values (?,?,?,?,?,?)'
    let result = await config(sql,[req.query.url,req.query.title,req.query.context,0,0,0])

    // 修改essay_kind表
    var sql1 = 'INSERT INTO esay_kind(kindid,essayid) SELECT k.id,e.id FROM kinds k,essay e WHERE k.kind_child = ? AND e.id IN (SELECT LAST_INSERT_ID())'
    var result1 = await config(sql1,[req.query.tag[1]])
    res.send(result)
    res.send(result1)
})
// 所有类别
router.get('/getkind',async function(req,res){
    var sql = 'select * from kinds'
    let result = await config(sql)
    res.json(result)
})
router.get("/get_techlist",async function(req,res){
    var sql = "select e.*,k.kind,k.kind_child from essay e, esay_kind ek,kinds k where e.id = ek.essayid AND ek.kindid = k.id and k.kind_child != ? order by e.send_time desc"
    let result = await config(sql,["doucument"])
    res.json(Array.from(result))
})
router.get("/get_notelist",async function(req,res){
    var sql = "select e.*,k.kind,k.kind_child from essay e, esay_kind ek,kinds k where e.id = ek.essayid AND ek.kindid = k.id and k.kind_child = ?  order by e.send_time desc"
    let result = await config(sql,["doucument"])
    res.json(Array.from(result))
})

module.exports = router;


