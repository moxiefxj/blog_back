const express = require('express');
const router = express.Router();
const config = require('../config/config');


// // 从数据库中获取（year,month,day,title,kinds）
router.get('/timekinds', async function (req, res) {
    var sql = "SELECT e.id, e.send_time,e.title,k.kind,k.kind_child FROM essay e,esay_kind ek,kinds k WHERE e.id = ek.essayid AND ek.kindid = k.id";
    let result = await config(sql)
    console.log("/timekinds 的结果："+result)
    res.json(Array.from(result))
});



module.exports = router;