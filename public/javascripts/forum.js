$(function () {
    var username = 'aro';
    var userid = 1;
    let finLike = [];
    let b = "";

    function reRenderComt() {
        // 重新render留言數 +111111111111。
        $.ajax({
            url: '/forum/howmanyComt',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                artiId: numm
            }),
            success: function (res) {
                // console.log('留言數+1');
                // if(res == 'comtPlusOne'){
                //     // 留言那個小數字就加一。
                let theComtCount = $(`span[data-comt="${numm}"]`);
                let att = JSON.parse(res);
                console.log(att[0]["COUNT(commentId)"]);
                theComtCount.text(att[0]["COUNT(commentId)"]);
            }
        })
    }

    let comtArr = [];

    let a = "";
    let artiIdArr = [];
    let countComt = [];
    // let artiIID = [];

    // function renderComtFirst() {

    //     // for(i=0; i<$(`span`).attr('data-like').length; i++){
    //     //     artiIID.push($(`span`).attr('data-like')[i]);
    //     // }

    //     console.log(artiIID);

    //     $.ajax({
    //         url: '/forum/howmanyComtRender',
    //         type: 'get',
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify({
    //             getdata: $(`span`).attr('data-like')
    //         }),
    //         success: function (res) {

    //             // 所以這邊先傳一個getdata去後端，getdata是$(comt-like)撈出來的所有的articleId。

    //             comtArr = [];

    //             // 把articleId推進comtArr。
    //             // 但我是抓到所有的文章，分類的文章沒有變動。
    //             for (i = 0; i < res.length; i++) {
    //                 comtArr.push(res[i].articleId);
    //             }



    //             // 留言們屬於哪個文章。
    //             console.log(comtArr);


    //             // 數comtArr裡面有幾則留言屬於誰。
    //             var result = comtArr.reduce((obj, item) => {
    //                 obj[item] = obj[item] ? obj[item] + 1 : 1;
    //                 return obj;
    //             }, {});

    //             console.log(result);



    //             for(item in result){
    //                 console.log(item,result[item]);
    //                 $(`.comtSpan[data-comt="${item}"]`).text(result[item]);
    //             }




    //         }
    //     })
    // }

    // renderComtFirst();

    // howmany 是頁面上所有的articleId。
    // console.log($('.comtSpan'));

    // console.log(howmany);



    // function renderComt() {
    //     let howmany = [];
    //     for (i = 0; i < $('.comtSpan').length; i++) {

    //         howmany.push(parseInt($('.comtSpan')[i].dataset.comt));
    //     }
    // console.log($('.comtSpan').length);
    // 要把這些人map進資料庫，帶出另一個物件，來返回使用留言數到底有多少，才可以render。
    //     $.ajax({
    //         url: '/forum/howmanyComtRender',
    //         type: 'post',
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify({
    //             artiId: howmany
    //         }),
    //         success: function (res) {
    //             console.log(res);
    //             console.log(howmany);
    //             for (i = 0; i < res.length; i++) {
    //                 let anum = (res)[i];
    //                 // console.log(anum);

    //                 let aee = $('.comtSpan')[i];
    //                 // console.log(aee);

    //                 aee.innerText = anum;
    //                 // console.log($('.comtSpan')[1]);
    //             }
    //         },
    //         error(err) {
    //             console.log(err);
    //         }





    //         // success: function (res) {
    //         //     console.log(res);

    //         //     for (i = 0; i < res.length; i++) {
    //         //         let anum = (res)[i]["COUNT(commentId)"];
    //         //         // console.log(anum);

    //         //         let aee = $('.comtSpan')[i];
    //         //         // console.log(aee);

    //         //         aee.innerText = anum;
    //         //         // console.log($('.comtSpan')[1]);
    //         //     }
    //         // },
    //         // error: function (err) {
    //         //     console.log(err);
    //         // }
    //     })
    // }

    // renderComt();

    //<!-- SELECT count(IFNULL(commentId, 0))   FROM comment where articleId in (2, 1, 4, 3, 60, 65, 26, 57, 59, 27, 33, 36, 53, 58, 61, 64) group by articleId order by field (articleId, 2, 1, 4, 3, 60, 65, 26, 57, 59, 27, 33, 36, 53, 58, 61, 64) -->

    // 尋找動態生成的文章愛心，然後用js addClass讓他們動態變成紅色

    function likeAjax() {
        $.ajax({
            url: '/forum/userLikeFirst',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                userid: userid
            }),
            success: function (res) {
                const arrLike = JSON.parse(res);
                const strLike = arrLike[0].userLike;


                // 字串變陣列，把處理好的陣列往主陣列裡塞。
                // finLike: user喜歡過的文章陣列。
                finLike = strLike.slice(0, strLike.length - 1).split(`,`);
                // console.log(finLike);

                // artiIdArr: 每一個文章id篩出來的陣列。
                let a = "";
                for (i = 0; i < $('.heartTar').length; i++) {
                    a += ($('.heartTar')[i].dataset.like + `,`);
                }

                let artiIdArr = [];
                artiIdArr = a.slice(0, a.length - 1).split(`,`);
                // console.log($('.heartTar'));
                // console.log(artiIdArr);

                // 兩個陣列的比較結果。
                let endding = finLike.map(function (x) {
                    return artiIdArr.indexOf(x);
                });
                // console.log(endding);

                // console.log($('.heartTar'));

                // 一個一個添加紅心到畫面上。
                for (i = 0; i < endding.length; i++) {
                    if (endding[i] > 0) {
                        b = $('.heartTar')[endding[i]];
                        // console.log(b);
                        b.classList.add("heartOuter");
                    }

                }
                // console.log('---------------------------');
            }
        })
        return 'ajax end';
    }

    likeAjax();


    if (location.pathname == "/forum/talkhome") {
        $('#popularCate').addClass('active');
        $('#talkTitle').text("熱門文章");
    }
    if (location.pathname == "/forum/new") {
        $('#latestCate').addClass('active');
        $('#talkTitle').text("最新文章");
    }


    // 點分類： 運動、衣服、電影、美食。
    $('.cate').on('click', function () {
        const cate = $(this).text();

        const good = $(this).attr('data-good');
        // console.log(good);
        $.ajax({
            url: "/forum/article/" + good,
            type: "get",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                const arr = JSON.parse(res);
                // console.log(arr);
                // console.log(toArr[0].slice(1, -1));
                // console.log(typeof(JSON.parse(arr[0].articleImg)));
                $('#talkOuter').empty();
                $.each(arr, function (index, value) {
                    let toArr = value.articleImg.slice(2, -2).split(",");

                    // "['/img/1619593071249-截圖 2021-03-31 上午9.35.55.png','/img/1619593071268-截圖 2021-04-05 下午11.03.58.png']"

                    let eachArti = `<div class="arti" data-articleId="${value.articleId}">
                            <div class="imgOuter"><img class="artiTitle" src="${toArr[0].slice(1, -1)}"></div>
                            <p class="artiContent">
                            ${value.articleContent.replace(/<br>/g, ``)}
                            </p>

                            <hr>
                            <div class="likeComment">
                                <i class="fas fa-heart heartTar" data-like="${value.articleId}"></i>
                                <span class="likeCommentSpan" data-like="${value.articleId}">${value.articleLike}</span>
                                <i class="far fa-comment-alt"></i>
                                <span class="likeCommentSpan comtSpan" data-comt="${value.articleId}">
                                ${value.articleComment}</span>
                            </div>
                        </div>`
                    // function cateAppend() {
                    $('#talkOuter').append(eachArti);


                    // return console.log('append end');
                    // }

                    // console.log('append');
                    // 放這裡還沒有append完就會先跑愛心的ajax。

                });

                catcharticleid();

                $('.heartTar').removeClass('heartOuter');
                finLike.forEach(ele => {
                    $(`.heartTar[data-like=${ele}]`).addClass('heartOuter');
                })
                // renderComt();
            },
            error: function (err) {
                console.log(err);
            }
        })
        $('#talkTitle').text(cate);
        // renderComt() 但元素還沒生成完畢。
        // renderComtFirst();

    })

    // 點熱門。
    $('#popularCate').on('click', function () {
        $.ajax({
            url: "/forum/articleP",
            type: "get",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                const arr = JSON.parse(res);
                // console.log(arr);

                $('#talkOuter').empty();
                $.each(arr, function (index, value) {
                    let toArr = value.articleImg.slice(2, -2).split(`, `);
                    let eachArti = `<div class="arti" data-articleId="${value.articleId}">
                            <div class="imgOuter"><img class="artiTitle" src="${toArr[0].slice(1, -1)}"></div>
                            <p class="artiContent">
                            ${value.articleContent.replace(/<br>/g, ``)}
                            </p><hr>
                    
                            <div class="likeComment">
                                <i class="fas fa-heart heartTar" data-like="${value.articleId}"></i>
                                <span class="likeCommentSpan" data-like="${value.articleId}">${value.articleLike}</span>
                                <i class="far fa-comment-alt"></i>
                                <span class="likeCommentSpan comtSpan" data-comt="${value.articleId}">
                                ${value.articleComment}
                                </span>
                            </div>
                        </div>`
                    $('#talkOuter').append(eachArti);
                });

                $('.heartTar').removeClass('heartOuter');
                finLike.forEach(ele => {
                    $(`.heartTar[data-like=${ele}]`).addClass('heartOuter');
                })

            },
            error: function (err) {
                console.log(err);
            }

        })
        $('#talkTitle').text('熱門文章');
        // renderComt();
        // renderComtFirst();
    })

    // 點最新。
    $('#latestCate').on('click', function () {
        $.ajax({
            url: "/forum/articleL",
            type: "get",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                const arr = JSON.parse(res);
                // console.log(arr);
                $('#talkOuter').empty();
                $.each(arr, function (index, value) {
                    let toArr = value.articleImg.slice(2, -2).split(`, `);
                    let eachArti = `<div class="arti" data-articleId="${value.articleId}">
                            <div class="imgOuter"><img class="artiTitle" src="${toArr[0].slice(1, -1)}"></div>
                            <p class="artiContent">
                            ${value.articleContent.replace(/<br>/g, ``)}
                            </p><hr>
        
                            <div class="likeComment">
                                <i class="fas fa-heart heartTar" data-like="${value.articleId}"></i>
                                <span class="likeCommentSpan" data-like="${value.articleId}">${value.articleLike}</span>
                                <i class="far fa-comment-alt"></i>
                                <span class="likeCommentSpan comtSpan" data-comt="${value.articleId}">
                                ${value.articleComment}
                                </span>
                            </div>
                        </div>`
                    $('#talkOuter').append(eachArti);

                    $('.heartTar').removeClass('heartOuter');
                    finLike.forEach(ele => {
                        $(`.heartTar[data-like=${ele}]`).addClass('heartOuter');
                    })
                });
            },
            error: function (err) {
                console.log(err);
            }

        })
        $('#talkTitle').text('最新文章');
        // renderComtFirst();
        // renderComt();
    })

    // 點文章。
    let num = 0;
    $('#talkOuter').on('click', '.arti', function () {
        num = 0;
        num = $(this).attr('data-articleId');
        $('#inputhidden').val(num);


        $('#artiMain').addClass('show');
        $('#artiSub').scrollTop(0);

        // $("html").addClass("noscroll");
        // $("html").addClass("fixWindow");
        $('#cover').css('display', 'block');
        $('#cover').css('height', document.body.clientHeight + 'px');

        $.get(`/forum/look/${num}`, function (res) {

            // render圖片。
            $('div[data-swi="mySwiper"]').empty();


            let toArr = res[0].articleImg.slice(2, -2).split(`, `);
            let arrL = toArr.length;
            let oneImg = "";
            for (i = 0; i < arrL; i++) {
                oneImg += `<div class="swiper-slide"><img class="imgincar" src="${toArr[i].slice(1, -1)}"></div>`
            }


            let str = `<i class="fas fa-heart heartAni"></i>` + oneImg;


            $('div[data-swi="mySwiper"]').append(str);

            (function () {
                var swiper = new Swiper('.swiper-container', {
                    cssMode: true,
                    // loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    mousewheel: true,
                    keyboard: true,
                });
            }());

            // render留言。
            $.ajax({
                url: "/forum/getComt",
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    n1: num
                }),
                success: function (res) {
                    $('#comtText').empty();
                    let comtFor = "";
                    for (i = 0; i < res.length; i++) {
                        comtFor += `<p class="comtSelf"><small>@${res[i].commentUser}</small><button class="delComt" data-comtId="${res[i].commentId}"><i class="fas fa-times comtI"></i></button><br>${res[i].commentText}</p>`
                    }
                    $('#comtText').append(comtFor);
                }

            })



            // 作者、時間。
            $('#forUserTime').empty();
            $('#contentBox').empty();
            let userTime = `<small>@${res[0].articleUser}</small>
            <small>${res[0].articleTime}</small>`
            let content = `<p>${res[0].articleContent}</p>`
            // let comtlike = `<i class="fas fa-heart heartInner"></i>
            // </span>`

            $('#forUserTime').append(userTime);
            $('#contentBox').append(content);
            // $('#likecomtInner').append(comtlike);


        })

    })

    // 留言處。
    let numm = 0;
    $('#comtSubmit').on('click', function () {
        // 留言時，塞進資料庫。
        $.ajax({
            url: "/forum/addComt",
            type: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                comtVal: $('#comtInput').val().replace(/[\r\n]+/g, '<br>'),
                artiIdforComt: $('#inputhidden').val(),
                comtTime: new Date(),
                artiId: num
            }),
            success: function (res1) {
                console.log(res1);
                if (res1 == 'ok') {
                    $('#comtInput').val("");


                    // 留言後，再次render留的言。
                    $.ajax({
                        url: "/forum/getComt",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            n1: $('#inputhidden').val(),
                        }),
                        success: function (res) {

                            $('#comtText').empty();
                            let comtFor = "";
                            for (i = 0; i < res.length; i++) {
                                comtFor += `<p class="comtSelf"><small>@${res[i].commentUser}</small><button class="delComt" data-comtId="${res[i].commentId}"><i class="fas fa-times comtI"></i></button><br>${res[i].commentText}</p>`
                            }
                            $('#comtText').append(comtFor);
                            $('#artiSub').scrollTop(10000);
                        }


                    })

                    $('#closeMain').on('click', function () {

                        numm = $('#inputhidden').val();


                        reRenderComt();

                    })
                }

            }

        })

    })

    // 刪除留言，deleeeeeeeeeeeeeeeete!!!!!!!
    $('#comtText').on('click', '.delComt', function () {
        console.log('點到我啦');
        const comtNum = $(this).attr('data-comtId');
        const artiNum = num;

        $.ajax({
            url: "/forum/deleteComt",
            type: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                n2: comtNum,
                artiID: artiNum
            }),
            success: function (res) {
                if (res == 'ok') {
                    // 確定有刪除成功，要重新render畫面一次。
                    $.ajax({
                        url: "/forum/getComt",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            n1: $('#inputhidden').val(),
                        }),
                        success: function (res) {


                            // 刪除後，重新render。
                            $('#comtText').empty();
                            let comtFor = "";
                            for (i = 0; i < res.length; i++) {
                                comtFor += `<p class="comtSelf"><small>@${res[i].commentUser}</small><button class="delComt" data-comtId="${res[i].commentId}"><i class="fas fa-times comtI"></i></button><br>${res[i].commentText}</p>`
                            }
                            $('#comtText').append(comtFor);
                            $('#artiSub').scrollTop(10000);

                            let textt = $(`.comtSpan[data-comt="${num}"]`);

                            // console.log($(`.comtSpan[data-comt="${num}"]`).text());
                            // console.log(textt.text());
                            textt.text(parseInt(textt.text() - 1));
                        }

                    })
                }
            },
            error: function (err) {
                console.log(err);
            }

        })
    })

    // $('#cover').on('click',function () {
    //     $('#artiNewDiv').removeClass('show');
    //     $('#artiMain').removeClass('show');
    //     $("html").removeClass("noscroll");
    //     $("html").removeClass("fixWindow");
    //     $('#cover').css('display', 'none');
    //     likeAjax();
    //     console.log('關閉啦～')
    //     let ele1 = -1;
    //     $('.heartTar').removeClass('heartOuter');
    //     finLike.forEach(ele => {
    //         $(`.heartTar[data-like=${ele}]`).addClass('heartOuter');
    //         ele1 = ele;
    //     })
    // });

    // 點關閉。
    $('#artiMain').on('click', '#closeMain', function () {
        $('#artiNewDiv').removeClass('show');
        $('#artiMain').removeClass('show');
        $("html").removeClass("noscroll");
        $("html").removeClass("fixWindow");
        $('#cover').css('display', 'none');

        likeAjax();


        console.log('關閉啦～')

        let ele1 = -1;
        $('.heartTar').removeClass('heartOuter');
        finLike.forEach(ele => {
            $(`.heartTar[data-like=${ele}]`).addClass('heartOuter');
            ele1 = ele;
        })
    })

    $('#talkCate>div').on('click', function () {

        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    })

    let likes = [];
    let num2 = 0;
    // 雙擊愛心動畫
    $('.swiper-wrapper').on('dblclick', function () {
        $('.heartAni').addClass('show');

        setTimeout(function () {
            $('.heartAni').removeClass('show');
        }, 800);

        $.ajax({
            url: '/forum/userLike',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                userid: userid,
                artiid: num
            }),
            success: function (res) {
                const att = JSON.parse(res);
                const theLike = att[0].userLike;
                likes = [];


                // return
                if (theLike != "") {

                    likes = theLike.slice(0, theLike.length - 1).split(`,`)
                    console.log(likes);

                    // likes是使用者所有讚過的陣列。
                    // 把最後一個逗點去掉。
                    // 用逗點分開大家，分別push進likes。
                }
                // return
                if (likes.indexOf(num) == -1) {
                    likes.push(num);
                    num2 = num;

                    console.log(num2);
                }
                // console.log(likes);
                let str = "";
                for (i = 0; i < likes.length; i++) {
                    str += `${likes[i]},`;
                }

                // str是字串，塞回資料庫。
                console.log(str);

                $.ajax({
                    url: '/forum/updLike',
                    type: 'post',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        newdata: str,
                        userid: userid,
                        artiId: num2
                    }),
                    success: function (res) {
                        if (res == 'articleLike upded') {
                            console.log('已更新');

                            let afterLike = parseInt($(`span[data-like="${num2}"]`).text()) + 1;
                            $(`span[data-like="${num2}"]`).text(`${afterLike}`);

                        }
                    }
                })
            }
        })

    })

    let arrr = [];
    function catcharticleid() {
        arrr = [];

        $('.arti').each((idx, elm) => {
            arrr.push($(elm).attr("data-articleId"));
        })

        artiIdArr = arrr;
    }





})