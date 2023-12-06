var express = require("express");
var db = require('./db.js');
var { Success, Error } = require('./response');
var multer = require('multer');
const e = require("express");

const forum = express.Router();

forum.get('/', function (req, res) {
    res.render('talkcircle.ejs');
})

forum.get('/talkhome', function (req, res) {
    // console.log(req.body.userid);
    // return
    // select userLike from users where userId = ?', [req.body.userid]
    let sql = 'select * from article order by articleLike desc;';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(res);
            res.render('forum.ejs', {
                data: results
            });

        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });


})

// // 文章詳細頁。
forum.get('/look/:num', function (req, res) {
    let sql = 'select * from article WHERE articleId = ?';
    let data = [req.params.num];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(results);
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

forum.post('/getComt', function (req, res) {
    let sql = 'select * from article inner join comment on article.articleId = comment.articleId where article.articleId = ?';
    let data = [req.body.n1];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(results);
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

forum.post('/howmanyComt', function (req, res) {
    let sql = `SELECT COUNT(commentId) FROM comment where articleId = ?`;
    let data = [req.body.artiId];

    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log([req.body.artiId]);
            // console.log(results);
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });

})

forum.get('/howmanyComtRender', function (req, res) {

    let sql = `SELECT articleId FROM comment where articleId in(?) order by articleId`;
    let getdata = [req.body.getdata]

    db.exec(sql, getdata,function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(results);

        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });

})


forum.post('/addComt', function (req, res) {
    // console.log('~~');
    let sql = "INSERT INTO `comment` (`commentUser`, `commentText`, `articleId`, `commentTime`) VALUES ('iamkevin', ?, ?, ?); update article set articleComment = (articleComment + 1) where articleId = ?"
    let data = [req.body.comtVal, req.body.artiIdforComt, req.body.comtTime, req.body.artiId];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send('ok');
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// 運動、衣服、電影、美食。
forum.get('/article/:xxx', function (req, res) {
    let sql = 'select * from article where articleCate = ?';
    let data = [req.params.xxx];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// popular。
forum.get('/articleP', function (req, res) {
    let sql = 'select * from article order by articleLike desc';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

// // latest。
forum.get('/articleL', function (req, res) {
    let sql = 'select * from article order by articleTime desc limit 20';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
})

// 刪除留言，deleeeeeeeeeeeeeeeete!!!!!!!
forum.post('/deleteComt', function (req, res) {
    let sql = `INSERT into deleComt (commentId, commentUser, commentText, articleId, commentTime)SELECT * from comment where comment.commentId = ?; DELETE FROM comment WHERE commentId = ?; update article set articleComment = (articleComment - 1) where articleId = ?`;
    let data = [req.body.n2, req.body.n2, req.body.artiID];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(artiID);
            res.send('ok');
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

//自定義 storage
var myGlobal = "";
var myGlobalPartner = "";
var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(myStorage.destination);
        // console.log(2);
        cb(null, "public/images/forum/");    // 保存的路徑 (需先自己創建)
    },
    filename: function (req, file, cb) {
        // console.log(1);
        myGlobal = "";
        cb(null, myGlobal = (Date.now() + '-' + file.originalname));
        // 自定義檔案名稱
        // myGlobal += (Date.now() + '-' + file.originalname);
        // 這裡是不是要跑foreach?
        myGlobalPartner += (`'/images/forum/` + myGlobal + `', `);
    }
});


var upload = multer({
    storage: myStorage,  // 設置 storage
    fileFilter: function (req, file, cb) {  // 檔案過濾
        // console.log(3);
        if (file.mimetype == '') {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
});

forum.post('/upload_file', upload.array('myfile', 10), function (req, res) {
    let aaa = `"[` + myGlobalPartner.substring(0, myGlobalPartner.length - 2) + `]"`;
    let sql = `INSERT INTO article(articleUser, articleContent, articleTime, articleLike, articleComment, articleCate, articleImg) VALUES ("iamjackie",?,?,"100","0",?,?);`;
    let data = [req.body.cgcg.replace(/[\r\n]+/g, `<br>`), new Date(Date.now()), req.body.selectCate, aaa];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.redirect("/forum/new");
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
    myGlobalPartner = "";
});

forum.get("/new", function (req, res) {
    let sql = 'select * from article order by articleTime desc limit 20';
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            // console.log(results);
            res.render('forum.ejs', {
                data: results
            });
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});


forum.post('/userLike', function (req, res) {
    // console.log(req.body.user);
    // return
    let sql = 'SELECT userLike FROM `forumusers` WHERE userId = ?';
    let data = [req.body.userid];
    db.exec(sql, data, function (results, fields) {
        // console.log(data);
        if (results) {
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});

forum.post('/updLike', function (req, res) {
    let sql = `update forumusers set userLike = ? where userId = ?;`
    let data = [req.body.newdata, req.body.userid];
    db.exec(sql, data, function (results, fields) {
        // console.log(req.body.newdata);
        if (results) {
            // console.log(results);
            // res.send('okgood');

            let sql2 = `update article set articleLike = articleLike + 1 where articleId = ?`;
            let data2 = [req.body.artiId];

            db.exec(sql2, data2, function (results, fields) {
                // console.log(data2);
                if (results) {
                    res.send('articleLike upded');
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


forum.post('/userLikeFirst', function (req, res) {
    let sql = 'SELECT userLike FROM `forumusers` WHERE userId = ?';
    let data = [req.body.userid];
    db.exec(sql, data, function (results, fields) {
        if (results) {

            // console.log(results);
            res.send(JSON.stringify(results));
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    });
});


module.exports = forum;
