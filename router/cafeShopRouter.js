var express = require('express');
var splitText = require('../apps/booktext');
var db = require('./db.js');
var { Success, Error } = require('./response');

const cafeShop = express.Router();


//router
cafeShop.get("/", (req, res) => {
    res.render("cafeShop.ejs");
})

cafeShop.get("/chatroom", (req, res) => {
    res.render("cafeChatroom.ejs")
})

cafeShop.get("/bookshelf", (req, res) => {
    let sql = "SELECT * FROM booklist";
    let data = [];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.render('cafeBookshelf.ejs', {
                books: results
            })
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    })
});

// 撈出該分類書本
cafeShop.get("/bookshelfabc", (req, res) => {
    // console.log(req.query.bookid);
    let sql = ""
    let data = [req.query.bookid];
    if (req.query.bookid === "所有書單") {
        sql = "SELECT * FROM `booklist`";
    } else {
        sql = "SELECT * FROM `booklist` where book_category = ?";
    }
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            res.send(results);
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    })
});

//撈出點擊書本的簡介
cafeShop.get("/bookshelfDM", (req, res) => {
    let sql = "SELECT * FROM `booklist` where book_title = ?";
    let data = [req.query.des];
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            res.send(results);
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    })
});

//顯示書籍內容在翻頁效果上面
cafeShop.get("/bookread", (req, res) => {
    let sql = "SELECT * FROM booklist where book_title = ?";
    let data = [req.query.booktext];
    db.exec(sql, data, function (results, fields) {
        console.log(results);
        if (results) {
            let data = splitText(results[0])
            console.log(data);
            res.render("cafeBookread.ejs", {
                bookdata: results,
                desc: data
            });
        } else {
            res.end(
                JSON.stringify(new Error('no result'))
            );
        };
    })
});

//搜尋書籍
cafeShop.get("/bookshelfFilter",(req,res) => {
    let sql = "SELECT * FROM booklist where book_title like ? ";
    let data = [`%${req.query.book}%`];
    console.log(data)
    db.exec(sql,data,function(results,fields) {
        console.log(results);
        if(results){
            res.send(results);
        }else{
            res.end(
                JSON.stringify(new Error('no result'))
            );
        }
    })
})




module.exports = cafeShop;