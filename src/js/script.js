'use strict'


//Библиотеки*****************************
@@include('swiper.min.js');

//Мои файлы******************************
@@include('dynamicAdapt.js');
@@include('swiperSlider.js');
@@include('functions.js');
@@include('spoilers.js');




//TODO *********************************************Основной JavaScript код****************************************************************

window.onload = function (){

	document.addEventListener('click', documentActions);

	const menuItems = document.querySelectorAll('.menu__item');

	function documentActions(event){
		const targetElement = event.target;
		if(window.innerWidth > 768 && isMobile.any()){

			//При нажатии на стрелку подменю будет открываться и закрываться
			if(targetElement.classList.contains('menu__arrow')){
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}

			//на тачскринах при нажатии на пустое поле, под меню будет закрываться
			if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0){
				menuItems.forEach(item => {
					item.classList.remove('_hover');
				});
			}
		}

		//Присвоение класса _active к полю поиск
		if(targetElement.classList.contains('search__icon')){
			document.querySelector('.search').classList.toggle('_active');
		}
		
		if(!targetElement.closest('.search') && document.querySelectorAll('.search._active')){
			document.querySelector('.search').classList.remove('_active');
		}

		//!Меню бургер

		if(targetElement.classList.contains('menu__link') || targetElement.classList.contains('menu__sub-link')){
			document.querySelector('.menu').classList.toggle('_active');
			document.querySelector('.burger').classList.toggle('burger_active');
		}
		if(targetElement.closest('.burger')){
			document.querySelector('.burger').classList.toggle('burger_active');
			document.querySelector('.menu').classList.toggle('_active');
		}
		if(targetElement.classList.contains('menu')){
			document.querySelector('.burger').classList.toggle('burger_active');
			document.querySelector('.menu').classList.toggle('_active');
		}
	}

	//!Добавляет фот меню при скроле
	const headerElement = document.querySelector('.header');

	const callback = function(entries, observer) {
		if(entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);

}
	
	

























//!Меню бургер
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //
	// const headerList = document.querySelector('.header__list');
	// const headerItem = document.querySelectorAll('.header__item');
	// const headerBurger = document.querySelector('.header__burger');

	// headerBurger.addEventListener('click', () => {
	//     headerBurger.classList.toggle('header__burger_active');
	//     headerList.classList.toggle('header__list_active');
	// });

	// headerItem.forEach(item => {
	//     item.addEventListener('click', () => {
	//        headerBurger.classList.toggle('header__burger_active');
	//         headerList.classList.toggle('header__list_active');
	//     });
	// }); 
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //

//!Слайдер
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //
	/*$('.slider').slick({
		arrows: true,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 700,
		easing: 'linear',
		infinite: true,
		initialSlide: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnFocus: true,
		pauseOnHover: true,
		pauseOnDotsHover: true,
		draggable: true,
		swipe: true,
		touchThreshold: 5,
		touchMove: true,
		waitForAnimate: true,
		centerMode: false,
		variableWidth: false,
		rows: 1,
		slidesPerRow: 1,
		vertical: false,
		verticalSwiping: false,
		fade: false,
		// asNavFor: "класс слайдера с которым нужно связать";
		responsive: [
			{
					breakpoint: 1000,
					settings: {
						slidesToShow: 2
					}
			},
			{
					breakpoint: 698,
					settings: {
						slidesToShow: 1
					}
			}
		],
		mobileFirst: false,
	}); */
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //
	
//!Код к спойлерам
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //
/* $('.spoilers__title').click(function () {
		if ($('.spoilers').hasClass('one')) {
			$('.spoilers__title').not($(this)).removeClass('active');
			$('.spoilers__text').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});*/
// // // // // // // // // // // // // // // // // // // // //// // // // // // // // // // // // // // // // //
