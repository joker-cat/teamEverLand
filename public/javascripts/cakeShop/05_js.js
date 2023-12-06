
$('.gototop').click(function () {
    $(window).scrollTop(0);
})
const burgerClick = document.querySelector('#burger');
const navOpen = document.querySelector('#navOpen');
const navhoverbg = document.querySelectorAll('.navhover_bg');
const hoverLi = document.querySelectorAll('.hoverLi');
const sec1Sliderimgset = document.querySelectorAll('.sec1Slider_imgset')
const sliderdotbtnset = document.querySelectorAll('.sliderdot_btnset');
const sec4_sliderdotbtnset = document.querySelectorAll('.sec4_sliderdot_btnset');
const playlogo = document.querySelector('.play_logo');
const burgerin = document.querySelector('#burger_in');
const burgerin1 = document.querySelector('#burger_in1');
const sec5con1 = document.querySelector('.sec5_con1');
const sec5con2 = document.querySelector('.sec5_con2');
const sec6con = document.querySelector('.sec6_con');
const sec7con = document.querySelector('.sec7_con');
const sec7con_rightFontset = document.querySelectorAll('.sec7_con_rightFontset');
let movieShow = document.querySelector('.movieShow');
let ifr = document.querySelector('iframe');
let myboxani = document.querySelectorAll('.myboxani');
let sec3bigimg = document.querySelectorAll('.sec3_bigimg');


hoverLi.forEach((el,index) =>{
    el.addEventListener('mouseenter',()=>{
        console.log(index);
        for (let arr = 0; arr < 5; arr++) {
            navhoverbg[arr].classList.remove('hoverShow');
        }
        navhoverbg[index].classList.add('hoverShow');
    })
})

window.addEventListener('scroll', () => {
    let z = sec7con.getBoundingClientRect().top;
    // console.log(z);
    if (z < document.documentElement.clientHeight - 15) {
        // el.style.transform = "translateX(50px)";

        //同時修改多屬性
        Object.assign(sec7con.style, { transform: 'translateY(0px)', opacity: '1' })

        sec7con_rightFontset.forEach(el =>{
            el.classList.add('showsec7');
        })

    }
})


window.addEventListener('scroll', () => {
    let z = sec6con.getBoundingClientRect().top;
    if (z < document.documentElement.clientHeight - 15) {

        //同時修改多屬性
        Object.assign(sec6con.style,{
            transform: 'translateY(0px)',
            opacity: '1'
        })
    }
})


window.addEventListener('scroll', () => {
    let z = sec5con1.getBoundingClientRect().top;
    // console.log(z);
    if (z < document.documentElement.clientHeight - 15) {
        // el.style.transform = "translateX(50px)";

        //同時修改多屬性
        Object.assign(sec5con1.style, { transform: 'translateY(0px)', opacity: '1' })
    }
})


window.addEventListener('scroll', () => {
    let z = sec5con2.getBoundingClientRect().top;
    // console.log(z);
    if (z < document.documentElement.clientHeight - 15) {
        // el.style.transform = "translateX(50px)";

        //同時修改多屬性
        Object.assign(sec5con2.style, { transform: 'translateY(0px)', opacity: '1' })
    }
})

sec3bigimg.forEach(el => {
    window.addEventListener('scroll', () => {
        let z = el.getBoundingClientRect().top;
        // console.log(z);
        if (z < document.documentElement.clientHeight - 15) {
            // el.style.transform = "translateX(50px)";

            //同時修改多屬性
            Object.assign(el.style, { transform: 'translateY(0px)', opacity: '1' })
        }
    })
})

myboxani.forEach(el => {
    window.addEventListener('scroll', () => {
        // console.log(el.getBoundingClientRect().bottom);
        // console.log(el.getBoundingClientRect().bottom);
        let z = el.getBoundingClientRect().top;
        if (z < document.documentElement.clientHeight - 15) {
            el.classList.add('opcaani');
        }
    })
})



// console.log(window.scrollY); //滾軸滾動的距離
// console.log($('#info_attr').offset().top); //dom與頂部的距離

// console.log(document.querySelector('#info_attr').getBoundingClientRect().bottom);
// 抓取dom與視窗的距離

// console.log(document.documentElement.clientHeight); //視窗高度



//宣告全遇變數
//先呼叫計時器
//先抓小黑點 並給予click事件 ＝>計數器歸零 在呼叫一次計數器
//抓取數字對應的圖片 並顯示
//把初始化入函式 並把被點的按鈕變黑

burgerin.addEventListener('click', () => {
    // burgerClick.classList.toggle('on_off');
    navOpen.style.opacity = '0';
    navOpen.style.zIndex = '-1';
})
burgerin1.addEventListener('click', () => {
    // burgerClick.classList.toggle('on_off');
    navOpen.style.opacity = '0';
    navOpen.style.zIndex = '-1';
})

// --------------------崩潰區-(幹終於解決了)---------------------
sliderdotbtnset[0].style.backgroundColor = 'black';
sec4_sliderdotbtnset[0].style.backgroundColor = 'black';
sliderdotbtnset.forEach((btnclick, index) => {
    //按鈕事件
    btnclick.addEventListener('click', (btn, ii) => {
        $('.autoplay').slick('slickGoTo', index);
        for (var a = 0; a <= 4; a++) {
            sliderdotbtnset[a].style.backgroundColor = 'white';
        }
        sliderdotbtnset[index].style.backgroundColor = 'black';
    })
})
$('.autoplay').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // console.log(nextSlide);
    for (var a = 0; a <= 4; a++) {
        sliderdotbtnset[a].style.backgroundColor = 'white';
    }
    sliderdotbtnset[nextSlide].style.backgroundColor = 'black';

});

$('.sec4_container').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // console.log(nextSlide);
    for (var b = 0; b <= 5; b++) {
        sec4_sliderdotbtnset[b].style.backgroundColor = '#cbc0c0';
    }
    sec4_sliderdotbtnset[nextSlide].style.backgroundColor = 'black';
});

// setInterval(() => {
//     sec1Sliderimgset.forEach((imgclick, index) => {
//         sliderdotbtnset[index].style.backgroundColor = 'white';
//         if ($(imgclick).hasClass('slick-active')) {
//             // console.log(index);
//             sliderdotbtnset[index].style.backgroundColor = 'black';
//         }
//     })
// }, 5000); 

// -----------------------------------------------



//------------------------------------------------
playlogo.addEventListener(('click'), () => {
    movieShow.style.zIndex = '999'
})

movieShow.addEventListener(('click'), () => {
    // 利用設定屬性來讓影片回到播放前的狀態
    $('iframe').attr('src', $('iframe').attr('src'));
    movieShow.style.zIndex = '-1'
})

sec4_sliderdotbtnset.forEach((btnclick, index) => {
    //按鈕事件
    btnclick.addEventListener('click', (btn) => {
        $('.sec4_container').slick('slickGoTo', index);
        for (var b = 0; b <= 5; b++) {
            sec4_sliderdotbtnset[b].style.backgroundColor = '#cbc0c0';
        }
        sec4_sliderdotbtnset[index].style.backgroundColor = 'black';
    })
})

burgerClick.addEventListener('click', () => {
    // burgerClick.classList.toggle('on_off');
    navOpen.style.opacity = '1';
    navOpen.style.zIndex = '9999';
})


$('.autoplay').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    pauseOnHover: false,
});

$('.sec4_container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    centerMode: true,

    responsive:[
        {breakpoint:920,
            settings:{
                slidesToShow:2,
        }},
        {breakpoint:640,
            settings:{
                slidesToShow:1,
        }},
      ],
});