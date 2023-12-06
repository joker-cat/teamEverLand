var express = require('express');
var db = require('./db.js');
var { Success, Error } = require('./response');

const cakeShop = express.Router();

cakeShop.get('/', function (req, res) {
    res.render('cakeShop.ejs', {
        userName: req.session.user.username,
        userMyname: req.session.user.myname,
    });
})

// 註冊首頁
// cakeShop.get('/registered', function (req, res) {
//     res.render('registered.ejs');
// })

//商品選擇路由
cakeShop.get('/cakeShopcar/:url', function (req, res) {
    console.log('start' + req.session.url);

    if (req.session.url == 'guest') {
        req.session.url = req.params.url;
        console.log('A ' + req.session.url);
        res.render('cakeWriteOrderInfo.ejs', {
            shopcar: req.params.url,
            userName: req.session.user,
        })
    } else if (req.session.url == req.params.url) {
        console.log('B ' + req.session.url);
        res.render('cakeWriteOrderInfo.ejs', {
            shopcar: req.params.url,
            userName: req.session.user.username,
        })
    } else {
        req.session.url = req.params.url;
        console.log('C ' + req.session.url);
        res.render('cakeWriteOrderInfo.ejs', {
            shopcar: req.params.url,
            userName: req.session.user.username,
        })
        // console.log('yyyyyy');
        // req.session.url = 'guest';
        // console.log('C '+req.session.url);
        // res.redirect('/order/shopcar');
    }
})

// cakeShop.get('/getCakeShopcar',function (req, res){
//     res.send({
//         shopcar: req.session.url,
//         userName: req.session.user.username,
//     });
// });


//跳購物車
cakeShop.get('/cakeShopcar', function (req, res) {
    // console.log(req.session.url);
    // req.session.url = 'guest';
    res.render('cakeShopcar.ejs', {
        userName: req.session.user.username,
        userMyname: req.session.user.myname,
    });
})

//跳線上定位
cakeShop.get('/cakeOnlineOrder', function (req, res) {
    // console.log(req.session.url);
    // req.session.url = 'guest';
    res.render('cakeOnlineOrder.ejs', {
        userName: req.session.user.username,
        userMyname: req.session.user.myname,
    });
})

//抓日期
cakeShop.post('/onlineorderdata', function (req, res) {
    let sql = 'SELECT * FROM `cakeorderdata` where date = ?';
    let data = [req.body.time];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        // res.render('try', { data: results })
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//送出訂位
cakeShop.post('/push', function (req, res) {
    // console.log('/push'+req.body.obj);
    // console.log(req.body.time);
    let sql = 'INSERT INTO `cakeorderdata` (`userid`, `date`, `str`) VALUES (?, ?, "?")';
    let data = [req.session.user.username,req.body.time, req.body.obj];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//更新
cakeShop.post('/updatepush', function (req, res) {
    // console.log(req.body.obj);
    // console.log(req.body.time);
    let sql = 'UPDATE cakeorderdata SET str = "?" WHERE date = ?';
    let data = [req.body.obj, req.body.time];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// 送出訂單並更新購物車
cakeShop.post("/ordergo", function (req, res) {
    // console.log(req.body);
    let sql = `SELECT orderid FROM cakesearchorder where orderid like "F${req.body.date}%"`;
    let data = [];
    db.exec(sql, data, function (results, fields) {
        let oid = "F"+`${req.body.date}`+(results.length + 1).toString().padStart(4, "0");
        // ------------------------
        let sql = 'INSERT INTO cakesearchorder (orderid,userid,orderinfo,date) VALUES (?,?,"?",?)';
        let data = [oid, req.body.user, req.body.orderinfo, req.body.date];
        db.exec(sql, data, function (results, fields) {
            // console.log(results);
            if (results) {
                let sql = 'UPDATE cakeuserinfo SET shopcar = "?" WHERE userid = ?';
                let data = [req.body.noproduct, req.body.user];
                db.exec(sql, data, function (results, fields) {
                    if (results) {
                        res.send(
                            JSON.stringify(results)
                        );
                    } else {
                        res.end(
                            JSON.stringify(new Error('no result'))
                        );
                    };
                })
            } else {
                res.end(
                    JSON.stringify(new Error('no result'))
                );
            };
        });
    })


});

// 購物總覽
cakeShop.post("/lookshopcar", function (req, res) {
    let sql = 'SELECT shopcar FROM `cakeuserinfo` where userid = ?';
    let data = [req.body.user];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// 加入購物車
cakeShop.post("/addshopcar", function (req, res) {
    // console.log(req.body.product, req.body.user);
    // shopcar = "?" 要加雙引號，這裡比較特例不然會失敗
    // console.log(req.body.product, req.body.user);
    let sql = 'UPDATE cakeuserinfo SET shopcar = "?" WHERE userid = ?';
    let data = [req.body.product, req.body.user];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(new Success(results))
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//使用者購物車商品資訊
cakeShop.post("/usershopcar", function (req, res) {
    // console.log(req.body.userarr.split(','));
    let sql = 'SELECT * FROM cakeProducts WHERE serialnumber in (?)';
    let data = [req.body.userarr.split(',')];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//刪除收藏
cakeShop.post("/deletefavorite/:num([0-9]+)", function (req, res) {
    // console.log(request.params.num);
    let sql = 'UPDATE cakeuserinfo SET favorite = ? WHERE userid = ?';
    let data = [req.body.WillUpdateArr, req.body.user];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//商品總覽
cakeShop.get("/foodproducts", function (req, res) {
    let sql = 'select * from cakeProducts';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
})

//檢視商品詳細
cakeShop.get("/foodproducts/:num([0-9]+)", function (req, res) {
    let sql = 'select * from cakeProducts where serialnumber = ?';
    let data = [req.params.num];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//收藏總覽
cakeShop.post("/lookfavorite", function (req, res) {
    let sql = 'SELECT favorite FROM `cakeuserinfo` where userid = ?';
    let data = [req.body.user];
    db.exec(sql, data, function (results, fields) {
        // console.log(results);
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//加入收藏
cakeShop.post("/addfavorite", function (req, res) {
    // console.log(req.body.user);
    // console.log(req.body.newData);
    let sql = 'UPDATE cakeuserinfo SET favorite = ? WHERE userid = ?';
    let data = [req.body.newData, req.body.user];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(
                JSON.stringify(new Success(results))
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//顯示我的收藏
cakeShop.get("/showfavorite", function (req, res) {
    // 直接利用紀錄使用者session變量撈撈資料
    // console.log(req.session.user);
    let sql = 'SELECT favorite FROM cakeuserinfo WHERE userid = ?';
    let data = [req.session.user.username];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // 從冒號之後開始抓
            // console.log(JSON.stringify(results).indexOf(':')); // : => 12
            // console.log(JSON.stringify(results).slice(14,-3));
            const UserFavoriteArray = JSON.stringify(results).slice(14, -3); //抓出所需區間字串，此為一大字串
            // console.log(UserFavoriteArray);
            // 將其轉成數字陣列
            console.log(UserFavoriteArray.split(','));
            let sql = 'SELECT * FROM cakeProducts WHERE serialnumber in (?)';
            let data = [UserFavoriteArray.split(',')];
            db.exec(sql, data, function (results, fields) {
                if (results) {
                    res.send(
                        JSON.stringify(results)
                    );
                } else {
                    res.end(
                        JSON.stringify(new Error('no result'))
                    );
                };
            });
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// //跳登入頁面
// cakeShop.get('/signin', function (req, res) {
//     res.render('signin');
// })

//跳收藏頁面
cakeShop.get('/favorite', function (req, res) {
    res.render('favorite', {
        userName: req.session.user.username,
    });
})

//跳訂單查詢
cakeShop.get('/ordersearch', function (req, res) {
    res.render('ordersearch', {
        userName: req.session.user.username,
    });
})

//跳訂位查詢
cakeShop.get('/onlinesearch', function (req, res) {
    res.render('onlinesearch', {
        userName: req.session.user.username,
        userMyname: req.session.user.myname,
    });
})

//抓取訂位
cakeShop.post("/getonlinesearch", function (request, response) {
    let sql = 'SELECT * FROM cakeorderdata';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//獲取訂單
cakeShop.post('/getorder', function (req, res) {
    let sql = 'SELECT * FROM `cakesearchorder` WHERE userid = ? ORDER BY `cakesearchorder`.`orderserialNumber`  DESC';
    let data = [req.body.user];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//登出功能
cakeShop.get('/signout', function (req, res) {
    req.session.user = 'guest';
    res.redirect('/order');
})

//登入功能
// cakeShop.post('/signin', function (req, res) {
//     var sql = `SELECT * FROM cakeuseinfo WHERE username=? and userpwd=?`;
//     var data = [req.body.userId, req.body.userPsd];
//     db.exec(sql, data, function (results, fields) {
//         if (results.length === 1) {
//             //順序很重要
//             req.session.user = req.body.userId;
//             req.session.myname = results[0]["myname"];
//             req.session.url = 'guest';
//             res.send(new Success('login success'))
//         } else {
//             res.send(new Error('login failed'))
//         }
//     })
// })


//更新人氣
cakeShop.post('/updatesales', function (req, res) {
    // console.log(req.body.arr);
    let sql = `update cakeProducts set sales = case `
    req.body.arr.forEach((el, index) => {
        sql += ` when serialnumber = ${el.serialnumber} then ${el.sales + el.productscount}`
    });
    sql += ` else sales end`;
    // console.log(sql);
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(
                JSON.stringify(results)
            );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});


module.exports = cakeShop;
