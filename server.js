var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();
var db = require('./router/db.js');
var { Success, Error } = require('./router/response');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


var listenPort = 3000;


app.use(session({
    secret: 'iamagooddeveloperofjavascript',
    resave: false,
    // 強制將session存回 session store, 即使它沒有被修改。預設是 true
    saveUninitialized: true,
    // 強制將未初始化的session存回 session store，未初始化的意思是它是新的而且未被修改
    cookie: {
        // 適用此cookie的路徑，預設： “/”.
        path: '/',
        // 僅限後端存取，無法使用前端document.cookie取得
        httpOnly: true,
        // 設定此cookie是否只在https使用。
        secure: false,
        // 只存在n秒，n秒後自動消失
        maxAge: 1000 * 60 * 60
    }
}));

app.use(function (req, res, next) {
    // res.locals.session = req.session;
    if (!req.session.user) {
        req.session.user = {}
        req.session.user.username = "guest";
        req.session.user.myname = "guest";
    }
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// 分流
// =================================================================
var cafeShop = require('./router/cafeShopRouter.js')
var adminCenter = require('./router/adminCenterRouter.js')
var shopping = require('./router/shoppingRouter.js')
var forum = require('./router/forumRouter.js')
var cakeShop = require('./router/cakeShopRouter.js')
var bank = require('./router/bankRouter.js')


app.use('/cafeShop', cafeShop)
app.use('/adminCenter', adminCenter)
app.use('/shopping', shopping)
app.use('/forum', forum)
app.use('/cakeShop', cakeShop);
app.use('/bank', bank);

// 登入登出系統
// =================================================================
app.post('/signin', function (req, res) {
    let sql = 'select * FROM userdata where username = ?';
    let data = [req.body.username];
    db.exec(sql, data, function (results, fields) {
        if (results[0] == undefined) {
            res.send("signinFalse");
            return;
        }
        if (req.body.userpwd == results[0].userpwd) {
            req.session.user = {
                username: results[0].username,
                usermail: results[0].usermail,
                userphone: results[0].userphone,
                myname: results[0].myname,
                address: results[0].address,
                userbirth: results[0].userbirth,
                usersex: results[0].usersex,
            };
            res.send(new Success("signinSuccess"))
        } else {
            res.send(new Error("signinError"));
        };
    });
});

app.get('/signinCheck', function (req, res) {
    // console.log(req.session.user)
    if (req.session.user.username != 'guest') {
        // console.log(res.locals.session);
        res.send(new Success(req.session.user));
    } else {
        res.send(new Error("Not Signin"));
    }
});

app.get('/signout', function (req, res) {
    delete req.session.user;
    req.session.destroy();
    res.send("isSignout")
});

// =================================================================



// 咖啡廳聊天室用
//------------------------------------------------
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./apps/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getAllUser, getAllUserData } = require('./apps/users');

const server = http.createServer(app);
const io = socketio(server);

const botName = '官方'

// //當用戶連接上聊天室
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, roomName }) => {
        const user = userJoin(socket.id, username, roomName);

        const allUserData = getAllUserData();

        console.log(allUserData);

        socket.join(user.roomName);

        //歡迎現有的用戶
        socket.emit('message', formatMessage(botName, '歡迎來到EverLand cafe'));


        // 當新用戶連接上，傳送連接訊息
        socket.broadcast.to(user.roomName).emit('message', formatMessage(botName, `${user.username}加入聊天室`));

        //傳送用戶及桌號資訊
        io.to(user.roomName).emit('roomUsers', {
            room: user.roomName,
            users: getRoomUsers(user.roomName)
        });
    });



    //聽取chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        console.log(user);


        const allUserName = getAllUser()  //取得所有用戶的名字，陣列
        const currentUser = formatMessage(user.username, msg);
        const currentUserName = currentUser.username; //輸入對話的本人名字
        const currentUserText = currentUser.text;   //輸入對話的內容
        console.log(currentUserName, currentUserText, allUserName)

        io.to(user.roomName).emit('message', formatMessage(user.username, msg));
        io.to(user.roomName).emit('dialogMessage', currentUserName, currentUserText, allUserName);
    })

    //當用戶離開時，傳送離開訊息
    socket.on('disconnect', () => {
        const user = userLeave(socket.id); //回傳離開用戶的資訊，是一個物件

        if (user) {
            console.log(user)
            const leaveUser = user.username

            io.to(user.roomName).emit('message', formatMessage(botName, `${user.username}離開聊天室`));
            io.to(user.roomName).emit('deleteMesssage', leaveUser);

            //傳送用戶及桌號資訊
            io.to(user.roomName).emit('roomUsers', {
                room: user.roomName,
                users: getRoomUsers(user.roomName)
            });
        }
    })
})

const PORT = process.env.PORT || listenPort;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//------------------------------------------------
