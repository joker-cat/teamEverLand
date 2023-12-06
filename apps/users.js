const users = [];

//將使用者加入聊天
function userJoin(id, username, roomName) {
  const user = { id, username, roomName };

  if (users.length == 2 && users[0].username == "") {
    users[0] = user
  }else if(users.length == 2 && users[1].username == ""){
    users[1] = user
  }else{
    users.push(user);
  }

  return user;
}

//撈出所有用戶的陣列
function getAllUserData(){
  return users;
}

//撈出目前的用戶
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function getAllUser() {
  if (users.length !== 0) {
    return users.map((user) => user.username);
  }
}

//用戶離開聊天室
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  const leaveUser = users.find((user) => user.id === id);
  let apple = users[index];
  if (index !== -1) {
    users[index] = {
      id: "yiyKqZ3R1bH4qcURAAAE",
      username: "",
      roomName: `${leaveUser.roomName}`,
    };
    return apple;
  }
}

//撈出聊天室的使用者
function getRoomUsers(room) {
  return users.filter((user) => user.roomName === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUser,
  getAllUserData
};
