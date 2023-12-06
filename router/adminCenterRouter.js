var express = require('express');
var db = require('./db.js');
var { Success, Error } = require('./response');

const adminCenter = express.Router();

adminCenter.get('/', function (req, res) {
    res.redirect('adminCenter.html');
});

adminCenter.get('/register', function (req, res) {
    res.redirect('/register.html');
});

adminCenter.get('/userInfoChange', function (req, res) {
    res.redirect('/userInfoChange.html');
});

adminCenter.post('/getver', function (req, res) {
    const accountSid = 'AC86c758ecf99532193d218fa04175a2f4';
    const authToken = '3da7421549c05ebfe8b1237957cb39ce';
    const client = require('twilio')(accountSid, authToken);
    const textNum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    const sendphone = req.body.phone.slice(1);
    console.log(sendphone);
    client.messages
        .create({
            body: `歡迎蒞臨EverLand，感謝您的註冊，請輸入驗證碼：${textNum}`,
            from: '+18317773822',
            to: `+886${sendphone}`
        })
        .then(() => {
            res.send(`${textNum}`);
        })
});


adminCenter.post('/sendUserData', function (req, res) {
    let sql = 'INSERT INTO userdata set username = ? , userpwd = ? , usermail = ? ,' +
        'userphone = ? , myname = ?, address = ?, userbirth = ?, usersex = ?';
    let data = [
        req.body.username, req.body.userpwd, req.body.usermail, req.body.userphone,
        req.body.myname, req.body.address, req.body.userbirth, req.body.usersex
    ];
    db.exec(sql, data, function (results, fields) {
        console.log("userdata post OK");
        if (results) {
            res.send(new Success(results))
        } else {
            res.send(new Error("reg fali"))
        }
    });
});

adminCenter.post('/updateUserData', function (req, res) {
    let sql = `UPDATE userdata SET usermail = ?,  myname = ?, address = ?, userbirth = ? WHERE username = ?`;
    let data = [
        req.body.usermail, req.body.myname, req.body.address, req.body.userbirth, req.body.username
    ];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            req.session.user.usermail = req.body.usermail;
            req.session.user.myname = req.body.myname;
            req.session.user.address = req.body.address;
            req.session.user.userbirth = req.body.userbirth;
            console.log(req.session.user);
            res.send(new Success(results))
        } else {
            res.send(new Error("reg fali"))
        }
    });
});

adminCenter.get('/orderRecord', function (req, res) {
    let sql = 'select * FROM cakesearchorder where userid = ? ORDER BY orderid desc';
    let data = [req.session.user.username];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(new Success(results))
        } else {
            res.send(new Error("no result"))
        }
    });
});

adminCenter.get('/shopRecord', function (req, res) {
    let sql = 'select * FROM apparelcheckout where userid = ? ORDER BY orderid desc';
    let data = [req.session.user.username];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(new Success(results))
        } else {
            res.send(new Error("no result"))
        }
    });
});


adminCenter.get('/bookRecord', function (req, res) {
    let sql = 'select * FROM cakeorderdata where userid = ? ORDER BY date asc';
    let data = [req.session.user.username];
    db.exec(sql, data, function (results, fields) {
        if (results) {
            res.send(new Success(results))
        } else {
            res.send(new Error("no result"))
        }
    });
});

module.exports = adminCenter;