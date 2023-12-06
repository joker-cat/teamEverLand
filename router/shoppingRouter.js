// const { response } = require("express");
// var mysql = require("mysql");
var express = require("express");
var db = require('./db.js');
var { Success, Error } = require('./response');

const shopping = express.Router();

shopping.get('/', function (req, res) {
    res.render('shopping.ejs', {
    })
})
// 點擊circle1-1進入fitting頁面
shopping.get('/fitting_try', function (req, res) {
    res.render('shoppingFitting_try.ejs')
})
// 點擊circle4-1進入購物車頁面
shopping.get('/checkout', function (req, res) {
    res.render('shoppingCheckout.ejs')
})
// 點擊circle2-1進入購物車頁面
shopping.get('/wishlist', function (req, res) {
    res.render('shoppingWishlist.ejs')
})
// 點擊shoppingCheckput Next Step進入shoppingCheckputCustomer頁面

// shopping.get('/checkout', function (req, res) {
//     res.render('shoppingCheckout.ejs', {
//     })
// })

// 點擊shoppingCheckput Next Step進入shoppingCheckputCustomer頁面
shopping.get('/checkoutCustomer', function (req, res) {
    res.render('shoppingCheckoutCustomer.ejs', {
    })
})

// 所有商品div
shopping.get('/products/:xxx', function (req, res) {
    let sql = 'SELECT * from products';
    let data = [];
    if (req.params.xxx != 'all') {
        sql = 'SELECT * from products where productcategory = ?';
        data = [req.params.xxx];
    }
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
    // res.send("hi there");
});

shopping.get('/products/intro/:apple', function (req, res) {
    let sql = 'SELECT * from products where productID = ?';
    let data = [req.params.apple];
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
    // res.send("hi there");
});


// ---------------------
// fitting.ejs ajax 各種類商品div
shopping.get('/products/accessory', function (req, res) {
    //  {sql = 'SELECT * from products where productcategory = "accessory"';
    // arr = [] }
    let sql = 'SELECT * from products where productcategory = "accessory"';
    let data = []
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

shopping.get('/products/shoes', function (req, res) {
    let sql = 'SELECT * from products where productcategory = "shoes"';
    let data = []
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

shopping.get('/products/tops', function (req, res) {
    let sql = 'SELECT * from products where productcategory = "tops"';
    let data = []
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

shopping.get('/products/bottom', function (req, res) {
    let sql = 'SELECT * from products where productcategory = "bottom"';
    let data = []
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

shopping.get('/products/coat', function (req, res) {
    let sql = 'SELECT * from products where productcategory = "coat"';
    let data = []
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

// ------------------------------------購物車--------------------------------
//張家斌  查詢購物車
shopping.post('/products/getapple', function (req, res) {
    let sql = 'SELECT shopcart from shopcarts where userid = ?';
    let data = [req.body.user];
    // console.log(req.body)
    db.exec(sql, data, function (results, fields) {
        console.log(results);
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
    // res.send(req.body.user);
});

//張家斌 加入購物車
shopping.post('/products/apple', function (req, res) {
    console.log(req.body.user);
    console.log(req.body.shopcart);
    // res.send('ok');
    let sql = 'UPDATE `shopcarts` SET `shopcart` = ? WHERE `userid` = ?';
    let data = [req.body.shopcart, req.body.user]
    db.exec(sql, data, function (results, fields) {
        console.log(results);
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

// 送出訂單
shopping.post('/products/apple', function (req, res) {
    console.log(req.body.user);
    console.log(req.body.shopcart);
    // res.send('ok');
    let sql = 'UPDATE `shopcarts` SET `shopcart` = ? WHERE `userid` = ?';
    let data = [req.body.shopcart, req.body.user]
    db.exec(sql, data, function (results, fields) {
        console.log(results);
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

// 刪除品項
shopping.post('/products/apple/deleteitem/:which', function (req, res) {
    let which = req.params.which;
    let sql = `SELECT shopcart FROM shopcarts where userid = ?`;
    let data = [req.body.user]
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            let myjsondata = JSON.parse(results[0]["shopcart"]);
            myjsondata.splice(which, 1);
            console.log(myjsondata);
            let sql = `UPDATE shopcarts SET shopcart = ? WHERE userid = ?`;
            let data = [JSON.stringify(myjsondata), req.body.user]
            db.exec(sql, data, function (results, fields) {
                if (results) {
                    console.log(which);
                    res.send(which);
                } else {
                    res.end(
                        JSON.stringify(new Error('no result'))
                    );
                }
            })
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});
// ------------------------------------願望清單--------------------------------
//查詢願望清單
shopping.post('/products/getorange', function (req, res) {
    let sql = 'SELECT listcart from wishlist where userid = ?';
    let data = [req.body.user];
    // console.log(req.body)
    db.exec(sql, data, function (results, fields) {
        console.log(results);
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
    // res.send(req.body.user);
});


//加入願望清單
shopping.post('/products/orange', function (req, res) {
    console.log(req.body.user);
    console.log(req.body.listcart);
    // res.send('ok');
    let sql = 'UPDATE `wishlist` SET `listcart` = ? WHERE `userid` = ?';
    let data = [req.body.listcart, req.body.user]
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        // res.render('try', { data: results })
        if (results) {
            res.send(results)
            // res.send(
            //     JSON.stringify(results)
            // );
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});
// 刪除願望清單品項
shopping.post('/products/orange/deleteitem/:whichid', function (req, res) {
    let whichid = req.params.whichid;
    let sql = `SELECT listcart FROM wishlist where userid = ?`;
    let data = [req.body.user]
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            let myjsondata = JSON.parse(results[0]["listcart"]);
            // console.log(myjsondata);
            myjsondata.splice(whichid, 1);
            console.log(myjsondata);
            let sql = `UPDATE wishlist SET listcart = ? WHERE userid = ?`;
            let data = [JSON.stringify(myjsondata), req.body.user]
            db.exec(sql, data, function (results, fields) {
                if (results) {
                    console.log(whichid);
                    res.send(whichid);
                } else {
                    res.end(
                        JSON.stringify(new Error('no result'))
                    );
                }
            })
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});
// =====================================================================
// //願望清單品項 加入購物車
// shopping.post('/products/getapple/:randomid', function (req, res) {
//     let sql = 'SELECT shopcart from shopcarts where userid = ?';
//     let data = [req.body.user];
//     // console.log(req.body)
//     db.exec(sql, data, function (results, fields) {
//         console.log(results);
//         // res.render('try', { data: results })
//         if (results) {
//             res.send(
//                 JSON.stringify(results)
//             );
//         } else {
//             res.end(
//                 JSON.stringify(new Error('no result'))
//             );
//         };
//     });
//     // res.send(req.body.user);
// });

//願望清單品項 加入購物車
shopping.post('/products/orangeToapple/:addwhich', function (req, res) {
    console.log(req.body.user);
    console.log(req.body.shopcart);
    // res.send('ok');
    // let sql = 'UPDATE `shopcarts` SET `shopcart` = ? WHERE `userid` = ?; UPDATE `wishlist` SET `listcart` = ? WHERE `userid` = ?';
    // // let sql2 = 'UPDATE `wishlist` SET `listcart` = ? WHERE `userid` = ?';
    // let data = [req.body.shopcart, req.body.user, req.body.listcart, req.body.user];
    // // let data2 = [req.body.listcart, req.body.user];
    // db.exec(sql, data, function (results, fields) {
    //     console.log(results);

    //     if (results) {
    //         res.send(JSON.stringify(results))
    //         // res.send(
    //         //     JSON.stringify(results)
    //         // );
    //     } else {
    //         res.end(
    //             JSON.stringify(new Error('no result'))
    //         );
    //     };
    // });
    // ============================願望清單加入購物車後========================
    // 1. 刪除商品在listcart裡的資訊
    // 2. 將商品加入shopcart的陣列裡
    let sql = 'UPDATE `shopcarts` SET `shopcart` = ? WHERE `userid` = ?;';
    let sql2 = 'UPDATE `wishlist` SET `listcart` = ? WHERE `userid` = ?';
    let data = [req.body.shopcart, req.body.user];
    let data2 = [req.body.listcart, req.body.user];
    let addwhich = req.params.addwhich;
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        // 0503???????????願望清單加入不進購物車中
        if (results) {
            // 這裡不能send東西出來，會報錯
            // res.send(JSON.stringify(results))
            // res.send(
            //     JSON.stringify(results)
            // );
        } else {
            res.end(
                JSON.stringify(new Error('no result1'))
            );
        };
    });
    db.exec(sql2, data2, function (results, fields) {
        console.log(results);

        if (results) {
            res.send(JSON.stringify(results))
            // res.send(
            //     JSON.stringify(results)
            // );
        } else {
            res.end(
                JSON.stringify(new Error('no result2'))
            );
        };
    });
    // ===============================================================
});

// ======================fitting room add to wish list======================
//查詢願望清單 0503
shopping.post('/products/getmywishlist', function (req, res) {
    console.log(req.body.wishproductID);
    // console.log(req.body.user);
    // res.send(req.body.wishproductID);
    let sql = 'select * from products WHERE `productID` = ?';
    let data = [req.body.wishproductID];
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            res.send(JSON.stringify(results))
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
})
// ======================end of fitting room wish list======================

//比對願望清單 0503
shopping.post('/products/comparemywishlist', function (req, res) {
    console.log(req.body.user);
    let sql = 'select listcart from wishlist WHERE `userid` = ?';
    let data = [req.body.user];
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            res.send(JSON.stringify(results))
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
})

// 完成訂單送出
shopping.post('/products/pushcustomerdata', function (req, res) {
    let sql = `SELECT orderid FROM apparelCheckout where orderid like "S${req.body.date}%"`;
    let data = [];
    db.exec(sql, data, function (results, fields) {
        let oid = "S" + `${req.body.date}` + (results.length + 1).toString().padStart(4, "0");
        // console.log(oid);
        // ------------------------
        let sql = 'INSERT INTO `apparelcheckout` (`orderid`,`userid`, `userName`,`userEmail`, `useradd`, `usertel`, `usershopcart`, `userpayment`) VALUES (? , ?, ?, ?, ?, ?, ?, ?)';
        let data = [oid, req.session.user.username, req.body.customer, req.body.email,
            req.body.add, req.body.tel, req.body.shopcart, req.body.radio];
        db.exec(sql, data, function (results, fields) {
            console.log(results);
            if (results) {
                res.send(new Success(oid));
            } else {
                res.end(JSON.stringify(new Error('no result')));
            };
        });
    })


})

module.exports = shopping;