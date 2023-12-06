//表單燈箱效果

let enterChat = document.getElementById('enterChat');
let formLightBox = document.querySelector('.enterChatRoom');
let enterbookshelf = document.getElementById('enterbookshelf');
let noSignDialogBox = document.getElementById('noSignDialogBox');
let noSignDialog = document.getElementById('noSignDialog');
let welcomeDialogBox = document.getElementById('welcomeDialogBox');
let welcomeDialog = document.getElementById('welcomeDialog');


window.onload = function () {
    axios.get('/signinCheck').then((res) => {
        if (res.data.errno == 1) {
            welcomeDialog.innerHTML = `歡迎光臨~${res.data.data.username}`;
        }
        welcomeDialogBox.style.visibility = 'visible';
        setTimeout(() => { welcomeDialogBox.style.visibility = 'hidden' }, 2500);
    }).catch((error) => { console.log(error) })
};

enterChat.addEventListener('click', function () {
    if (isSignIn == true) {
        formLightBox.classList.add('active');
    } else {
        SignDialog();
    };

})

formLightBox.addEventListener('click', function (e) {
    if (e.target !== e.currentTarget) return
    formLightBox.classList.remove('active')
})

enterbookshelf.addEventListener('click', function (e) {
    if (isSignIn == true) {
        window.location.href = "/cafeShop/bookshelf"
    } else {
        SignDialog();
    };
})

function SignDialog() {
    welcomeDialogBox.style.visibility = 'hidden'
    noSignDialogBox.style.visibility = 'visible'
    setTimeout(() => { noSignDialogBox.style.visibility = 'hidden' }, 2000);
}
