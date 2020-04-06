const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/add', async function (req, res) {
    let getClientIp = function (req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || '';
    };
    console.log(getClientIp(req))
    var sql1 = 'select islike from tb_like where essayid = ? and ip = INET6_ATON(?)'
    let result1 = await config(sql1,[req.query.id,getClientIp(req)])

    if (result1 != ''){
        res.send({status:0})
    }
    else{
        // 更新essay表
        var sql = "update essay set `like` = `like`+1 where id = ?";
        let result = await config(sql,[req.query.id])
        // 更新tb_like表
        var sql2 = 'insert into tb_like(ip,essayid,islike) values (INET6_ATON(?),?,1)'
        let result2 = await config(sql2,[getClientIp(req),req.query.id])
        res.send({status:1})
    }

    
});


module.exports = router;