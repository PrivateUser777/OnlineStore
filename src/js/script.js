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

		//!Присвоение класса _active к полю поиск
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

		//!Подгрузка товара
		if(targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			event.preventDefault();
		}

		//!Добавляем товар в карзину
		if(targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			event.preventDefault();
		}

		//!Открытие и закрытие карзины
		if(targetElement.classList.contains('actions__icon') || targetElement.closest('.actions__icon')) {
			if(document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.actions__body').classList.toggle('actions__body_active');
				event.preventDefault();
				console.log('true');
			}
		} else if (!targetElement.closest('.actions__body') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.actions__body').classList.remove('actions__body_active');
			console.log('false');
		}

		if(targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			event.preventDefault();
		}
	}

	//!Добавляет фон меню при скроле
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



	//!Подгрузка товара
	async function getProducts(button){
		if(!button.classList.contains('_hold')){
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if(response.ok){
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert('Ошибка');
			}
		}
	}

	function loadProducts(data){
		const productsItems = document.querySelector('.products__items');

		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
				<a href="${productUrl}" class="item-product__image _ibg">
					<img src="img/products/${productImage}" alt="${productTitle}">
				</a>
			`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
				<div class="item-product__content">
					<h3 class="item-product__title">${productTitle}</h3>
					<div class="item-product__text">${productText}</div>
				</div>
			`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
				<div class="item-product__actions actions-product">
					<div class="actions-product__body">
						<a href="#" class="actions-product__button actions-product__button_white _btn ">Add to cart</a>
						<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
						<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
					</div>
				</div>
			`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

			productsItems.insertAdjacentHTML('beforeend', productTemplate);
		});
	}

	//!Добавление товаров в карзину
	function addToCart(productButton, productId){
		if(!productButton.classList.contains('_hold')){
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');

			const cart = document.querySelector('.actions__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.item-product__image');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class', '_flyImage _ibg');
			productImageFly.style.cssText = `
				left: ${productImageFlyLeft}px;
				top: ${productImageFlyTop}px;
				width: ${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
			`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText = `
				left: ${cartFlyLeft}px;
				top: ${cartFlyTop}px;
				width: 0px;
				height: 0px;
				opacity: 0;
			`;

			productImageFly.addEventListener('transitionend', function() {
				if(productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			});
		}
	}

	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.actions__cart');
		const cartIcon = cart.querySelector('.actions__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.actions__list');

		//Добавляем
		if(productAdd) {
			if(cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}

			if(!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.item-product__image').innerHTML;
				const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
				const cartProductContent = `
					<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
					<div class="cart-list__body">
						<a href="" class="cart-list__title">${cartProductTitle}</a>
						<div class="cart-list__quantity">Quantity: <span>1</span></div>
						<a href="" class="cart-list__delete">Delete</a>
					</div>
				`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}

			//После всех действий
			productButton.classList.remove('_hold');
		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if(!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if(cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('actions__body_active');
			}
		}
	}

	//Furniture Gallery
	const furniture = document.querySelector('.furniture__body');
	if(furniture && !isMobile.any()) {
		const furnitureItems = document.querySelector('.furniture__items');
		const furnitureColumn = document.querySelectorAll('.furniture__column');

		//Скорость анимации
		const speed = furniture.dataset.speed;

		//Объявление переменных
		let positionX = 0;
		let coordXprocent = 0;

		function setMouseGalleryStyle(){
			let furnitureItemsWidth = 0;
			furnitureColumn.forEach(element => {
				furnitureItemsWidth += element.offsetWidth;
			});

			const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
			const distX = Math.floor(coordXprocent - positionX);

			positionX = positionX + (distX * speed);
			let position = furnitureDifferent / 200 * positionX;

			furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

			if(Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseGalleryStyle);
			} else {
				furniture.classList.remove('_init');
			}
		}

		furniture.addEventListener('mousemove', function(e) {
			//Получение ширины 
			const furnitureWidth = furniture.offsetWidth;

			//Ноль по середине
			const coordX = e.pageX - furnitureWidth / 2;

			//Получаем проценты
			coordXprocent = coordX / furnitureWidth * 200;

			if(!furniture.classList.contains('_init')) {
				requestAnimationFrame(setMouseGalleryStyle);
				furniture.classList.add('_init');
			}
		});
	}
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
