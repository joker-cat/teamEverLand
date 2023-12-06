const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const chatRoomName = document.getElementById('room-name');
const chatRoomUser = document.getElementById('users');

const firstUser = document.querySelector('.username1');
const SecondUser = document.querySelector('.username2');
const ThirdUser = document.querySelector('.username3');
const ForthUser = document.querySelector('.username4');

const dialogContent1 = document.getElementById('dialogContent1'); //左邊的對話框
const dialogContent2 = document.getElementById('dialogContent2'); //右邊的對話框
const dialogContent3 = document.getElementById('dialogContent3'); //左上的對話框
const dialogContent4 = document.getElementById('dialogContent4'); //右上的對話框

const dialogContainer1 = document.querySelector('dialogContainer1');
const dialogContainer2 = document.querySelector('dialogContainer2')

//取得用戶名
const {username} = Qs.parse(location.search,{
   ignoreQueryPrefix: true
});

console.log(username,roomName);

socket.emit('joinRoom',{username,roomName})

//撈出聊天室和用戶
socket.on('roomUsers',({room,users}) => {
    outputRoomName(room);
    outputUsers(users);
    console.log(users);
});

//從伺服器傳來的     message會是個物件，該物件會是發送訊息的用戶資訊{username,text}
socket.on('message',message => {
    outputMessage(message)

    //訊息自動捲動至最下面
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//從伺服器傳來的目前使用者名字、訊息、所有使用者用戶，訊息將會放入對話框裡頭
socket.on('dialogMessage',(currentUserName,currentUserText,allUserName) => {
    console.log(allUserName.indexOf(currentUserName));

    if(allUserName.indexOf(currentUserName) == 0){
        outputDialogMessageLeft(currentUserText)

    }else if(allUserName.indexOf(currentUserName) == 1){
        outputDialogMessageRight(currentUserText)
    }else if(allUserName.indexOf(currentUserName) == 2){
        outputDialogMessageCenterL(currentUserText)
    }else if(allUserName.indexOf(currentUserName) == 3){
        outputDialogMessageCenterR(currentUserText)
    }
    

})

socket.on('deleteMesssage',leaveUser => {
    console.log(leaveUser)
    deleteMessage(leaveUser)
})

//點擊送出按鈕觸發事件
chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    
    //取得輸入內容
    const msg = e.target.elements.msg.value;
    
    //傳送訊息給伺服器端
    socket.emit('chatMessage',msg);

    //清除input的輸入訊息
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//渲染訊息至人物頭上的對話框裡頭
function outputDialogMessageLeft(currentUserText){
    dialogContent1.innerText = currentUserText;
}

function outputDialogMessageRight(currentUserText){
    dialogContent2.innerText = currentUserText;
}
function outputDialogMessageCenterL(currentUserText){
    dialogContent3.innerText = currentUserText;
}
function outputDialogMessageCenterR(currentUserText){
    dialogContent4.innerText = currentUserText;
}

//渲染訊息至DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}</p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//把聊天室號碼渲染在頁面對話框左側
function outputRoomName(room){
    if(room === "chatroom"){
        chatRoomName.innerText = "桌號1"
    }else if(room === "chatroom2"){
        chatRoomName.innerText = "桌號2"
    }
}

//把聊天室用戶名渲染在頁面對話框左側
function outputUsers(users){
    chatRoomUser.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
    
    //顯示名字在人物頭上的對話框上面
    firstUser.innerText = users[0].username;
    if(users[1]){
        SecondUser.innerText = users[1].username;
    }else{
        SecondUser.innerText = "";
    }
    if(users[2]){
        ThirdUser.innerText = users[2].username;
    }else{
        ThirdUser.innerText = "";
    }
    if(users[3]){
        ForthUser.innerText = users[3].username;
    }else{
        ForthUser.innerText = "";
    }
}


function deleteMessage(leaveUser){
    if(firstUser.textContent == leaveUser){
        dialogContent1.textContent = "";
    }else if(SecondUser.textContent == leaveUser){
        dialogContent2.textContent = "";
    }else if(ThirdUser.textContent == leaveUser){
        dialogContent3.textContent = "";
    }else if(ForthUser.textContent == leaveUser){
        dialogContent4.textContent = "";
    }
    
}

    





//桌子動畫效果
function addDialogAnimation(x){
    x.classList.add('animate__animated');
    x.classList.add('animate__rubberBand');
}

function removeDialogAnimation(x){
    x.classList.remove('animate__animated');   
    x.classList.remove('animate__rubberBand');
}

