$('body').append(`   
 <!-- 移動Icon -->
<div id="iconNav">
    <div id="goWhereBox"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-left"></i>
        <div id="goWhereIcon" class="iconBall"><i class="fas fa-globe" style="font-size: 30px;"></i></div>
    </div>
    <div id="homeIcon" class="iconBall"><i class="fas fa-home" style="font-size: 30px;"></i></div>
    <div id="arrIcon" class="iconBall"><i class="fas fa-location-arrow" style="font-size: 30px;"></i></div>
</div>

<!-- 登入大頭 -->
<div id="signHead" type="button" data-bs-toggle="modal" data-bs-target="#signInBox"><i class="fas fa-user"></i>
</div>

<!-- 登入面板 -->
<div class="modal fade" id="signInBox" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" style="width:650px">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">登 入</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-group col-12">
                    <div class="input-group my-3">
                        <div class="input-group-text">
                            <i class="fas fa-user"></i>
                        </div>
                        <input id="userName" name="userName" type="text" class="form-control" placeholder="帳號">
                    </div>
                    <div class="input-group my-3">
                        <div class="input-group-text">
                            <i class="fas fa-key"></i>
                        </div>
                        <input id="userPwd" name="userPwd" type="password" class="form-control" placeholder="密碼">
                    </div>
                </div>
                <p id="signWrongInfo" class="text-danger"></p>
            </div>
            <div class="modal-footer">
                <a href="/adminCenter.html">尚未成為市民?</a>
                <button type="button" id="signInYesBtn" class="btn btn-success fs-5">登 入</button>
                <button type="button" id="signInNoBtn" class="btn btn-secondary fs-5" data-bs-dismiss="modal">取
                    消</button>
            </div>
        </div>
    </div>
</div>

<!-- 登入後身分證 -->
<div id="signInAfter">
    <div id="closeUserInfo"><i class="fas fa-times"></i></div>
    <div id="bigHeadImg" class="my-1"></div>
    <div id="signInInfo" class="row my-1">
        <p class="my-0 text-white text-center fw-bold">[ 市民 ]</p><br>
        <p id="signName" class="my-0 text-white text-center fw-bold"></p>
    </div>
    <div class="my-1 text-center"><button id="readyToLogout" type="button" class="btn btn-sm btn-light text-success my-1" data-bs-toggle="modal"
            data-bs-target="#signOutBox">登出</button></div>
</div>

<!-- 登出面板 -->
<div class="modal fade" id="signOutBox" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" style="width:600px">
        <div class="modal-content">
            <div class="modal-body">
                <p>確認登出</p>
            </div>
            <div class="modal-footer">
                <button type="button" id="signOutYesBtn" class="btn btn-success fs-5">登 出</button>
                <button type="button" class="btn btn-secondary fs-5" data-bs-dismiss="modal">取
                    消</button>
            </div>
        </div>
    </div>
</div>
`);

let isSignIn = false;
let signInInfo = "";
$('#signInAfter').hide();

$(document).ready(function () {
    getUsers()
    async function getUsers() {
        try {
            const get = await axios.get('/signinCheck')
            const { data } = get; // 資料在 data 屬性
            // console.log(data)
            // console.log(data.errno)
            if (data.errno == 1) {
                signInInfo = data.data;
                $('#signHead').css({
                    'color': 'white',
                    'background-color': '#386b57',
                }).on('mouseenter', function (e) {
                    $(this).css({
                        'color': '#386b57',
                        'background-color': 'white',
                    });
                }).on('mouseleave', function (e) {
                    $(this).css({
                        'color': 'white',
                        'background-color': '#386b57',
                    });
                });
                $('#signName').text(data.data.username);
                if(data.data.usersex == 1){
                    $('#bigHeadImg').html("<img src='/images/male.png'>")
                }
                if(data.data.usersex == 0){
                    $('#bigHeadImg').html("<img id='bigHead_Img' src='/images/female.png'>")
                }
                
                $('#signHead').attr('data-bs-target', '')
                $('#signHead').attr('data-bs-toggle', '')
                isSignIn = true;
            }
            // .then((res) => {
            //     // console.log(res);
            //     // console.log(res.data.errno);
            //     console.log(isSignIn)
            //     }
            // })
            // .catch((error) => { console.log(error) })

        } catch (error) {
            console.log(error)
        }
    }

    $('#signHead,#readyToLogout').on('click', function (e) {
        if (isSignIn == true) {
            $('#signInAfter').toggle();
        }
    })

    $('#closeUserInfo').on('click', function (e) {
        $('#signInAfter').hide();
    })
});


// 登入
//-----------------------------------------------
$('#signInYesBtn').on('click', function (e) {
    let data = { username: $('#userName').val(), userpwd: $('#userPwd').val() }
    if ($('#userName').val() == '' || $('#userPwd').val() == '') {
        $('#signWrongInfo').text('請輸入帳號/密碼')
    } else {
        axios.post('/signin', data)
            .then((res) => {
                // console.log(res.data);
                if (res.data == "signinFalse") {
                    $('#signWrongInfo').text('帳號/密碼輸入錯誤');
                    $('#userName').val('');
                    $('#userPwd').val('');
                } else {
                    location.reload();
                }
            })
            .catch((error) => { console.log(error) })
    };
});

// 取消時清空
$('#signInNoBtn').on('click', function (e) {
    $('#userName').val('');
    $('#userPwd').val('');
    $('#signWrongInfo').text('')
});

// 登出
$('#signOutYesBtn').on('click', function (e) {
    axios.get('/signout').then((res) => {
        console.log(res.data);
        location.reload();
    })
        .catch((error) => { console.log(error) })
    $('#signHead').attr('data-bs-target', '#signInBox')
    $('#signHead').attr('data-bs-toggle', 'modal')
});



// 導覽列
// -----------------------------------------
$('#homeIcon').on('click', function (e) {
    $(location).prop('href', '/')
});

let indexGoWhere = 0;
let innText = '';
let goUrl = '';

$('.fa-chevron-right').on('click', function (e) {
    indexGoWhere++;
    indexGoWhere > 6 ? indexGoWhere = 0 : "";
    gowhereSwitch()
    $('#goWhereIcon').html(`${innText}`)
});

$('.fa-chevron-left').on('click', function (e) {
    indexGoWhere--;
    indexGoWhere < 0 ? indexGoWhere = 6 : "";
    gowhereSwitch()
    $('#goWhereIcon').html(`${innText}`)
});

$('#goWhereIcon').on('click', function (e) {
    (goUrl == '') ? '' : $(location).prop('href', `${goUrl}`);
});

function gowhereSwitch() {
    switch (indexGoWhere) {
        case 0:
            innText = '<i class="fas fa-globe"  style="font-size: 30px;"></i>';
            goUrl = '';
            break;
        case 1:
            innText = '<span>服飾店</span>';
            goUrl = '/shopping';
            break;
        case 2:
            innText = '<span>蛋糕店</span>';
            goUrl = '/cakeShop';
            break;
        case 3:
            innText = '<span>咖啡廳</span>';
            goUrl = '/cafeShop';
            break;
        case 4:
            innText = '<span>銀行</span>';
            goUrl = '/bank';
            break;
        case 5:
            innText = '<span>里民<br>中心</span>';
            goUrl = '/forum';
            break;
        case 6:
            innText = '<span>戶政<br>事務所</span>';
            goUrl = '/adminCenter';
            break;
        default:
            break;
    }
}

// 返回鍵
// $('#returnIcon').on('click', function (e) {
//     $(location).prop('href', '/')
// });

