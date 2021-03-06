//TODO ***********************************************Слайдер Swiper***************************************************


if(document.querySelector('.slider-content__slider-main')){
	new Swiper('.slider-content__slider-main', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		//Dotts
		pagination: {
			el: '.slider-controls__dotts',
			clickable: true,
		},
		//Arrows
		navigation: {
			nextEl: '.slider-arrow_next',
			prevEl: '.slider-arrow_prev',
		},
	});
}

if(document.querySelector('.slider-rooms__body')){
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		speed: 800,
		loop: true,
		watchOverflow: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts 
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
		},
		//Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		}
	}); 
}

if(document.querySelector('.slider-tips__body')){
	new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: '3',
		spaceBetween: 32,
		speed: 800,
		loop: true,
		watchOverflow: true,
		// Dotts 
		pagination: {
			el: '.slider-tips__dotts',
			clickable: true,
		},
		//Arrows
		navigation: {
			nextEl: '.slider-tips .slider-arrow_next',
			prevEl: '.slider-tips .slider-arrow_prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		}
	}); 
}

/*
new Swiper('.swiper-container',{
	//Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	//Навигация
	//Буллеты, текущего положения, прогрессбар
	pagination: {
		el: '.swiper-pagination',
		//Буллеты
		type: 'bullets',
		clickable: true,
		//Динамические буллеты
		dynamicBullets: true,
		//Кастомные буллеты
		renderBullet: function (index, className) {
			return '<span class = "' + className + '">' + (index + 1) + '</span>';
		}
		
		//Фракция
		type: 'fraction',
		// Кастомный вывод фракции
		renderFraction: function(currentClass, totalClass) {
			return 'Фото <span class = "' + currentClass + '"></span>' + 
				' из ' + '<span class="' + totalClass + '"></span>';
		},

		// Прогрессбар
		type: 'progressbar'
	},
	//Скролл
	scrollbar: {
		el: '.swiper-scrollbar',
	 	//Возможность перетаскивать скролл
		draggable: true
	},

	//Включение/отключение перетаскивания на ПК
	simulateTouch: true,
	//Чувствительность свайпа
	touchRatio: 1,
	//Угол срабатывания свайпа/перетаскивания
	touchAngle: 45,
	//Курсор перетаскивания
	// grabCursor: true,

	//Переключение при клике на слайд
	slideToClickedSlide: true,

	//Управление клавиатурой
	keyboard: {
		//Включить/выключить
		enabled: true,
		//Включить/выключить только когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		//Включить/выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	//Управление колесом мыши
	mousewheel: {
		//Чувствительность колеса мыши
		sensitivity: 1,
		//Класс объекта на котором будет срабатывать прокрутка мышью
		eventsTarget: '.image-slider'
	},

	//Автовысота
	autoHeight: false,

	//Количество слайдов для показа
	slidesPerView: 2,

	//Отключение функционала если слайдов меньше чем нужно
	watchOverflow: true,

	//Отступ между слайдами
	spaceBetween: 30,

	//Количество пролистываемых слайдов
	slidesPerGroup: 1,

	//Активный слайд по центру
	centeredSlides: true,

	//Стартовый слай
	initialSlide: 0,

	//Мультирядность
	 slidesPerColumn: 2,

	//Бесконечный слайдер
	loop: true,

	//Свободный режим
	freeMode: true,

	//Автопрокрутка
	autoplay: {
		//Пауза между прокруткой
		delay: 3000,
		//Закончить на последнем слайде
		stopOnLastSlide: false,
		//Отключить после ручного переключения
		disableOnInteraction: false
	},

	//Скорость
	speed: 800,

	//Вертикальный слайдер
	direction: 'vertical',

	//Эффекты переключения слайдов
	//Листание
	effect: 'slide',

	//Смена прозрачности
	effect: 'fade',

	//Дополнение к fade
	fadeEffect: {
		//Параллельная смена прозрачности
		crossFade: true
	}

	//Переворот
	effect: 'flip',

	Дополнение к flip
	flipEffect: {
		//Тень
		slideShadows: false,
		//Показ только активного слайда
		limitRotation: true
	},

	// Куб
	effect: 'cube',

	//Дополнение к cube
	cubeEffect: {
	 	//Настройки тени
		slideShadows: true,
		shadow: true,
		shadowOffset: 20,
		shadowScale: 0.94
	},

	//Эффект потока
	effect: 'coverflow',
	
	//Дополнение к coverflow
	coverflowEffect: {
		//Угол
		rotate: 20,
		//Наложение
		stretch: 50,
		//Тень
		slideShadown: true,
	},

	//Брейк поинты (адаптив)
	//Ширина экрана
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		}
	},

	//Отключить предзагрузку картинок
	preloadImages: false,
	//LazyLoading (подгрузка картинок)
	lazy: {
		//Подгружать на старте переключения слайда
		loadOnTransitionStart: false,
		//Подгружать предыдущую и следующую картинки
		loadPrevNext: false,
	},
	//Слежка за видимыми слайдами
	watchSlidesProgress: true,
	//Добавление класса видимым слайдам
	watchSlidesVisibility: true,

});
*/