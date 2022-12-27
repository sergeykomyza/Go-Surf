
// ================================================== КУРСОР


// ================================================== ПРЕЛОАДЕР
function preloader(value){
    const preloader = document.querySelector('.preloader');
    if(value === true){
        preloader.classList.add('preloader__animation')
        document.documentElement.style.overflowY = 'hidden'
        setTimeout(() => {
            preloader.classList.add('preloader__hidden')
        }, 3000)
        setTimeout(() => {
            homeSwiperInit()
            document.documentElement.style.overflowY = 'auto'
        }, 5000)
    } else{
        homeSwiperInit()
    }
}

// ================================================== МОБИЛЬНОЕ МЕНЮ
function mobileMenu(){
    const gamburger = document.querySelector('.gamburger');
    const firstLine = gamburger.querySelectorAll('span')[0];
    const middleLine = gamburger.querySelectorAll('span')[1];
    const lastLine = gamburger.querySelectorAll('span')[2];
    gamburger.addEventListener('click', function(){
        middleLine.classList.toggle('open');
        firstLine.classList.toggle('open');
        lastLine.classList.toggle('open');
        document.querySelector('.navigation').classList.toggle('active')
    });
}

// ================================================== СЛАЙДЕРЫ
// функция смены названий локации
function locationName(parent, currentName) {
    const names = document.querySelector(parent).querySelectorAll('.location__value') // перебираем названия...
    names.forEach((item) => {
        item.style.display = 'none'                             // ...скрываем их все...
        item.classList.remove('animate__fadeIn')                
        item.classList.add('animate__fadeOut')                  
    })
    names[currentName].style.display = 'block'                  // ...показываем только то название, индекс которого совпадаем с индексом активного слайда...
    names[currentName].classList.remove('animate__fadeOut')     
    names[currentName].classList.add('animate__fadeIn')  
}

function homeSwiperInit() {
    const swiper = new Swiper('.home-slider .swiper', {
        effect: 'fade',
        on: {
            init: function () {
                createProgressLines()
                progressBullet()
            },
            slideChange: function () {
                progressBullet()
            },
        },
        pagination: {
            el: '.home-slider__pagination',
            bulletElement: 'div',
            bulletClass: 'home-slider__bullet',
            clickable: 'true',
        },
        navigation: {
            nextEl: '.home-slider__navigation--next',
            prevEl: '.home-slider__navigation--prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        parallax: true
    });

    const dots = document.querySelectorAll('.home-slider__dot')
    for (let i = 0; i < dots.length; i++) {
        const activeDot = dots[i]
        activeDot.onclick = function () {
            swiper.slideTo(i, 1000, false)
        }
    }

    // создаем новые элементы внутри кнопок. эти элементы будут прогрессбарами
    function createProgressLines() {
        document.querySelectorAll('.home-slider__bullet').forEach(item => {
            const progressLine = document.createElement('div')
            progressLine.classList.add('progressline')
            item.append(progressLine)
        })
    }

    // функция прогрессбара
    function progressBullet() {
        // перебираем кнопки
        document.querySelectorAll('.home-slider__bullet').forEach(item => {
            // выносим в переменную отдельный прогрессбар в отдельной кнопке     
            const activeProgressLine = item.querySelector('.progressline')
            // выносим в переменную длину прогрессбара     
            let widthPath = +activeProgressLine.offsetWidth
            // устанавливаем таймер     
            let timer = setInterval(() => {
                // увеличиваем длину на 1% за один шаг      
                widthPath += 1
                // задаем стиль для заполнения прогрессбара       
                activeProgressLine.style.width = widthPath + '%'
                // когда прогресс достигает конца или когда кнопка сменяется на неактивную (при клике)...       
                if (widthPath == 100 || !item.classList.contains('swiper-pagination-bullet-active')) {
                    // ...обнуляем таймер...        
                    clearInterval(timer)
                    // ...и очищаем прогрессбар         
                    activeProgressLine.style.width = 0
                }
                // если прогресс достигает конца и при этом автоплей слайдера останавливается...
                if (widthPath == 100 && item.classList.contains('swiper-pagination-bullet-active')) {
                    // то прогрессбар оставляем заполненным         
                    activeProgressLine.style.width = 100 + '%'
                }
            }, 52)
        })
    }
}

function surfSwiperInit() {
    const swiper = new Swiper('.surf .swiper', {
        slidesPerView: 1,
        on: {
            slideChange: function () {
                slidesTranslate()     // функция выполняется при смене слайдов
            },
        },
        navigation: {
            nextEl: '.surf__nav .slider-nav--next',
            prevEl: '.surf__nav .slider-nav--prev',
        },
        breakpoints: {
            565: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 4,
            },
        },
    });

    // управление слайдером через точки на карте
    const dots = document.querySelectorAll('.dot')
    const slides = document.querySelectorAll('.surf-slide')
    for (let i = 0; i < dots.length; i++) { // перебираем точки
        let activeDot = dots[i]                                               // выносим их в переменную
        activeDot.onclick = function () {   // кликаем по точке
            locationName('.surf', i)                                    
            swiper.slideTo(i, 1000, false) // при помощи встроенной функции двигаем слайдер. Активным становится слайд, соответствующий кликнутой точке
            dots.forEach(item => { item.classList.remove('active-dot') })         // у всех точек, кроме кликнутой, убираем активный класс
            slides.forEach(item => { item.classList.remove('active-slide') })     // у всех слайдов, кроме соответствующего активной точке, убираем активный класс
            this.classList.add('active-dot')                                  // текущей точке задаем активный класс
            slides[i].classList.add('active-slide')                           // задаем активный класс слайду, соответствующему активной точке
        }
    }

    //  функция слайдера (стили для слайдов и связка с точками)
    function slidesTranslate() {
        let activeSlide = slides[swiper.activeIndex] // выносим в переменную индекс активного слайда
        slides.forEach(item => {                        // перебираем все слайды... 
            item.style.transform = 'translate(0rem)' // ...всем задаем изначальный стиль...
            item.classList.remove('active-slide')    // ...и у всех убираем активный класс 
        })
        activeSlide.classList.add('active-slide')    // слайду с активным индексом присваиваем активный класс
        // этому же слайду и последующим трем задаем нужные стили (с учетом адаптивности)
        if(document.documentElement.clientWidth > 565){
            activeSlide.style.transform = 'translateY(2rem)'
            activeSlide.nextElementSibling.style.transform = 'translateX(-2rem)'
        }
        if(document.documentElement.clientWidth > 768){
            activeSlide.nextElementSibling.nextElementSibling.style.transform = 'translate(-4rem, 4rem)'
        }
        if(document.documentElement.clientWidth > 992){
            activeSlide.nextElementSibling.nextElementSibling.nextElementSibling.style.transform = 'translateX(-6rem)'
        }
        //  связываем слайды с точками
        dots.forEach((item, index) => {
            if (index == swiper.activeIndex) {          // если индекс точки совпадает с индексом активного слайда
                item.classList.add('active-dot')      // задаем этой точке активный класс
            }
            else {
                item.classList.remove('active-dot')  // иначе убираем активный класс
            }
        })

        locationName('.surf', swiper.activeIndex)
    }

    slidesTranslate() // функция выполняется сразу при загрузке

}

function travelSwiperInit(nameSlider){
    const swiper = new Swiper(`${nameSlider} .swiper`, {
        effect: 'fade',
        on: {
            slideChange: function () {
                locationName(nameSlider, swiper.activeIndex)
            },
        },
        navigation: {
            nextEl: `${nameSlider}__nav .slider-nav--next`,
            prevEl: `${nameSlider}__nav .slider-nav--prev`,
        },
        parallax: true
    });
    locationName(nameSlider, swiper.activeIndex)
}

function shopSwiperInit(){
    const swiper = new Swiper('.shop .swiper', {
        effect: 'fade',
        navigation: {
            nextEl: 'shop__nav .slider-nav--next',
            prevEl: 'shop__nav .slider-nav--prev',
        },
        parallax: true
    });
}

// ================================================== СЧИТАЕМ ЦЕНУ В БЛОКЕ SLEEP
function countPrice(){
    const btnCount = document.querySelectorAll('.data__btn')
    let sum = document.querySelector('.price')
    btnCount.forEach(item => {
        item.addEventListener('click', function(){
            let itemCount = this.closest('.data__box').querySelector('.data__value span')
            if(item.classList.contains('jsPlus')){
                sum.innerHTML = +sum.innerHTML + +itemCount.getAttribute('data-price')
            } else if(item.classList.contains('jsMinus') && itemCount.innerHTML > 1){
                console.log(itemCount.innerHTML)
                sum.innerHTML = +sum.innerHTML - +itemCount.getAttribute('data-price')
            }
            itemCount.innerHTML = item.classList.contains('jsPlus') ? +(itemCount.innerHTML) + 1 : +(itemCount.innerHTML) - 1
            if(itemCount.innerHTML < 1){
                itemCount.innerHTML = 1
            }
        })
    })
}

// ================================================== ДАТА
const date = function () {
    let date = new Date();
    let dayNum = document.querySelector('.dates__day')
    let monthNum = document.querySelector('.dates__month')
    let yearNum = document.querySelector('.dates__year')
    dayNum.innerText = ('0' + date.getDate()).slice(-2)
    monthNum.innerText = ('0' + (date.getMonth()+1)).slice(-2)
    yearNum.innerText = date.getFullYear()
}

// ================================================== SHOP
function board(){

    let set = {
        signPlus:            '<img src="img/Plus.svg" alt="sign">',
        signMinus:           '<img src="img/Minus.svg" alt="sign">',
        animateClassIn:      'animate__fadeInLeft',
        animateClassOut:     'animate__fadeOutRight',
        parentEl:            '.board__point',
        elementDot:          '.board__dot',
        elementText:         '.board__text',
        classForToggleState: 'closed'
    }
    const points = document.querySelectorAll(set.parentEl)
    points.forEach((item) => {
        const pointSign = item.querySelector(set.elementDot)
        const pointText = item.querySelector(set.elementText)
        item.classList.add(set.classForToggleState)
        pointSign.innerHTML = set.signPlus
        pointText.classList.add(set.animateClassOut)
        pointText.classList.remove(set.animateClassIn)
        points[0].classList.remove(set.classForToggleState)
        points[0].querySelector(set.elementDot).innerHTML = set.signMinus
        points[0].querySelector(set.elementText).classList.remove(set.animateClassOut)
        points[0].querySelector(set.elementText).classList.add(set.animateClassIn)
        item.addEventListener('click', function(){
            points.forEach(elem => {
                const pointSignEl = elem.querySelector(set.elementDot)
                const pointTextEl = elem.querySelector(set.elementText)
                if(item !== elem){
                    elem.classList.add(set.classForToggleState)
                    pointSignEl.innerHTML = set.signPlus
                    pointTextEl.classList.add(set.animateClassOut)
                    pointTextEl.classList.remove(set.animateClassIn)
                }
            })
            item.classList.toggle(set.classForToggleState)
            pointText.classList.toggle(set.animateClassOut)
            pointText.classList.toggle(set.animateClassIn)
            if(item.classList.contains(set.classForToggleState)){
                pointSign.innerHTML = set.signPlus
            } else {
                pointSign.innerHTML = set.signMinus
            }
        })
    })
}

// ================================================== GSAP
function animation(){

    const animationObjects = {
        obj0: {
            objName: '.home-slider__name',
            beginPosition: '0', 
            endPosition: '87rem',
            animationTrigger: '.home-slider', 
            startCoord: '730rem 730rem',
            endCoord: '1000rem 450rem',
            scrub: 2, 
            markers: false,
            objId: 'title'
        },
        obj1: {
            objName: '.surf__backtitle',
            beginPosition: '-30rem', 
            endPosition: '180rem',
            animationTrigger: '.surf', 
            startCoord: '100rem 730rem',
            endCoord: '2500rem bottom',
            scrub: 2, 
            markers: false,
            objId: 'surf__backtitle'
        },
        obj2: {
            objName: '.surf__map',
            beginPosition: '0rem', 
            endPosition: '-10rem',
            animationTrigger: '.surf', 
            startCoord: '100rem 900rem',
            endCoord: '500rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'map'
        },
        obj3: {
            objName: '.surf .swiper',
            beginPosition: '0rem', 
            endPosition: '-10rem',
            animationTrigger: '.surf .swiper', 
            startCoord: '100rem 900rem',
            endCoord: '500rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'surf__slider'
        },
        obj4: {
            objName: '.travel__backtitle',
            beginPosition: '-30rem', 
            endPosition: '140rem',
            animationTrigger: '.travel', 
            startCoord: '100rem 900rem',
            endCoord: '1700rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'travel__backtitle'
        },
        obj5: {
            objName: '.sleep__backtitle',
            beginPosition: '-30rem', 
            endPosition: '153rem',
            animationTrigger: '.sleep', 
            startCoord: '100rem 900rem',
            endCoord: '2200rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'sleep__backtitle'
        },
        obj6: {
            objName: '.shop__backtitle',
            beginPosition: '-30rem', 
            endPosition: '153rem',
            animationTrigger: '.shop', 
            startCoord: '100rem 700rem',
            endCoord: '2400rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'shop__backtitle'
        },
        obj7: {
            objName: '.travel .swiper',
            beginPosition: '0rem', 
            endPosition: '-10rem',
            animationTrigger: '.travel .swiper', 
            startCoord: '100rem 900rem',
            endCoord: '500rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'travel__slider'
        },
        obj8: {
            objName: '.sleep .swiper',
            beginPosition: '0rem', 
            endPosition: '-10rem',
            animationTrigger: '.sleep .swiper', 
            startCoord: '100rem 900rem',
            endCoord: '500rem 400rem',
            scrub: 2, 
            markers: false,
            objId: 'sleep__slider'
        }
    }

    const objectsArray = Object.entries(animationObjects)

    for(let i = 0; i < objectsArray.length; i++){
        let currObj = objectsArray[i][1]
        gsap.fromTo(currObj.objName, {
            y: currObj.beginPosition
        }, {
            y: currObj.endPosition,
            scrollTrigger: {
                pin: false,
                trigger: currObj.animationTrigger,
                start: currObj.startCoord,
                end: currObj.endCoord,
                scrub: currObj.scrub,
                markers: currObj.markers,
                id: currObj.objId
            }
        });
    }

}


preloader(true)
mobileMenu()
homeSwiperInit()
surfSwiperInit()
travelSwiperInit('.travel')
travelSwiperInit('.sleep')
shopSwiperInit()
countPrice()
date()
board()
animation()