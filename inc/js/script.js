//initHeader
function initMainHeader() {
	var headerWrap = $("#header_wrap");
	var hCurrent = false;
	var mainSearch = $("#main_search");
	var mode = ""
	var adminbarTop = function() {
		if(jQuery("#wpadminbar").size() > 0) {
			return jQuery("#wpadminbar").outerHeight()
		} else {
			return 0
		}
	}
	
	$(window).on("load resize",function() {
		if(jQuery("#wpadminbar").size() > 0) {
			jQuery("#wpadminbar").css({
				"position": "fixed"
			})
			headerWrap.animate({
				"top": adminbarTop()+"px"
			},200)
		}
	})

	function responHeader (e) {
		e.preventDefault();
		if ($(window).scrollTop() >= 100-adminbarTop() && window.innerWidth > 1290) {
			headerWrap.addClass("on");
			hCurrent = true;
			// console.log($(this).scrollTop());
			$(".header_ranking").addClass("on");
		}
		else {
			$(".header_ranking").removeClass("on");
			headerWrap.removeClass("on");
			hCurrent = false;
		}
	}
	$(window).scroll(responHeader);
	$(window).resize(responHeader);
	$(window).load(responHeader);

	jQuery(window).on("load",function() {

		jQuery(".main #container").animate({
			"opacity": 1
		})

		//메인 애니메이션
		mainSearch.find('> h2 a').animate({"opacity": 1 },100,function(){
			mainSearch.find('> h2 a').css('transform','translateY(0px)');
			mainSearch.find('> h2 p').animate({ "opacity": 1 },100,function(){
				$(this).css('transform','translateY(0px)');
			});
			mainSearch.find(".searchBox").animate({ "opacity": 0 },300,function(){
				$(this).css('transform','translateY(0px)');
				$(this).css('opacity','1');
			});
		});
			
	})    

};

//initGnb
function initGnb(deps1,deps2) {
	var header = $("header#header");
	var btnOpen = header.find("button.btn_gnb_m");
	var gnb = header.find("nav#gnb");
	var deps1List = gnb.find(">ul")
	var deps1Item = deps1List.find(">li");
	var deps2List = deps1Item.find(">ul");
	var deps2Item = deps2List.find(">li");
	var depsTarget = -1
	var depsOpening = false;
	var btnClose = gnb.find("button.btn_gnb_m.on");
	var winWidth = function() {
			return $(window).width();
		}
	var adminbarTop = function() {
		if(jQuery("#wpadminbar").size() > 0) {
			return jQuery("#wpadminbar").outerHeight()
		} else {
			return 0
		}
	}
	var container = $("#container");
	var mode = ""

	function returnDeps() {
		depsTarget = -1
		depsOpening = false;
		deps1Item.find("a").removeClass("on")
		deps2List.hide();

		if(deps1 > 0) {
			deps1Item.eq(deps1-1).find(">a").addClass("on");

			if(winWidth() <= 1121 && deps1Item.eq(deps1-1).find(">ul").size() > 0) {
				deps1Item.eq(deps1-1).find(">ul").show();
			}
		}
		if(deps2 > 0) {
			deps1Item.eq(deps1-1).find(">ul>li:eq("+(deps2-1)+")>a").addClass("on");
		}
	}
	returnDeps();

	deps1Item.find(">a").on("mouseenter focusin",function(e) {
		if(depsTarget != $(this).parent().index()) {
			deps1Item.find(">a").removeClass("on");
			$(this).addClass("on");
			if(mode == "pc") {
				deps2List.hide();
			}
			if($(this).parent().hasClass("link") == false && depsOpening == false) {
				depsOpening = true;
				deps2List.hide();
				$(this).next("ul").slideDown(200,function() {
					depsOpening = false;
				});
			}
			depsTarget = $(this).parent().index()
		}
	})
	deps1Item.find(">a").on("mouseleave",function() {
		depsOpening = false;
	})
	header.on("mouseleave",returnDeps)
	header.find("h1").on("mouseenter",returnDeps)
	container.on("mouseenter",returnDeps)

	$(window).on("load resize",function() {
		if(winWidth() > 1121 && mode != "pc") {
			mode = "pc"
			$("html,body").css('overflow','');
			header.removeAttr("style");
			gnb.removeAttr("style");
			gnb.find("ul").removeAttr("style");
			returnDeps();
		} else if(winWidth() <= 1121 && mode != "mobile") {
			returnDeps();
			mode = "mobile"
		}

	})

	var btnClose = gnb.find("button.btn_close");

    btnOpen.on("click",function(e){
        if(gnb.hasClass('on')) {
            gnb.removeClass('on');
            btnOpen.removeClass('on');
            jQuery("html,body").css({"overflow":""});
			jQuery("body").unbind('touchmove');

        }else{
            gnb.addClass('on');
            btnOpen.addClass('on');
            jQuery("html,body").css({"overflow":"hidden"})
            jQuery("body").bind('touchmove', function(e){
                e.preventDefault()
                e.stopPropagation();
            });
        };
    });

}


// 헤더 랭킹 마우스 오버
function initHeaderRanking() {
	var header = $("header#header");
	var hdRang = header.find(".header_ranking");
	var rangBox = header.find(".ranking_box");
	var depsOpening = false;
	var mode = ""
	var winWidth = function() {
		return $(window).width();
	}
	$(window).on("load resize",function() {
		if(winWidth() > 1280 && mode != "pc" ) {
			mode = "pc"
			hdRang.on("mouseenter focusin",function() {
				$(this).siblings(".ranking_box").removeClass("on");
				$(this).siblings(".ranking_box").addClass("on");
			})
			hdRang.on("mouseleave",function() {
				depsOpening = false;
				$(this).siblings(".ranking_box").removeClass("on");
			})
			rangBox.on("mouseenter focusin",function() {
				$(this).removeClass("on");
				$(this).addClass("on");
			});
			rangBox.on("mouseleave",function() {
				depsOpening = false;
				$(this).removeClass("on");
			})
		} else if(winWidth() <= 1280 && mode != "mobile") {
			rangBox.on("mouseleave",function() {
				$(this).addClass("on");
			})
			mode = "mobile"
		}

	})

}

// 헤더 반응형 모바일 검색
function initHeaderSearch() {
	var header = $("header#header");
	var serachOpen = header.find("button.btn_search_m");
	var headerSearch = header.find(".header_search");
	var rangBox = header.find(".ranking_box");
	var modal = $(".modal_bg");
	var winWidth = function() {
		return $(window).width();
	}
	
	$(window).on("load resize",function() {
		if(winWidth() > 1296 ) {
			headerSearch.removeClass('on');
            serachOpen.removeClass('on');
           	rangBox.removeClass('on');
            modal.css('display', 'none');
            jQuery("html,body").css({"overflow":""});
			jQuery("body").unbind('touchmove');
		} 
	});
	
    serachOpen.on("click",function(e){
        if(headerSearch.hasClass('on')) {
			headerSearch.removeClass('on');
            serachOpen.removeClass('on');
           	rangBox.removeClass('on');
            modal.css('display', 'none');
            jQuery("html,body").css({"overflow":""});
			jQuery("body").unbind('touchmove');

        }else{
            headerSearch.addClass('on');
            serachOpen.addClass('on');
           	rangBox.addClass('on');
            modal.css('display', 'block');
            jQuery("html,body").css({"overflow":"hidden"})
            jQuery("body").bind('touchmove', function(e){
                e.preventDefault()
                e.stopPropagation();
            });
        };
    });

}

//container 높이 세팅
function initContainer() {
	var header = jQuery("#header_wrap");
	var hwHeight = function() {
		return header.outerHeight();
	}

	var container = jQuery("#container");
	var footer = jQuery("footer#footer");
	var ftHeight = function() {
		return footer.outerHeight();
	}

	jQuery(window).on("load resize",function() {
		if(header.hasClass("main_header") == false) {
			container.css({
				"minHeight": jQuery(this).outerHeight()-(hwHeight()+ftHeight())+"px"
			})
		}
	})
}


//패밀리 사이트
function familySite(){
	var footer = jQuery("footer#footer");
	var familyLink = footer.find("a.link");

	familyLink.on("click",function() {
		if(jQuery(this).hasClass("on")) {
			jQuery(this).removeClass("on");
			jQuery(this).next("ul").fadeOut(300);
		} else {
			familyLink.addClass("on");
			jQuery(this).next("ul").fadeIn();
		}
	})
}

//게시판 페이지 네비
function initPageNavi() {
	if(jQuery(".page_navi").size() == 0) return false;

	var pageNavi = jQuery(".page_navi");
	var pCurrent = pageNavi.find("a.num.current");

	jQuery(window).on("load resize",function() {
		if(jQuery(this).outerWidth() <= 710) {
			pCurrent.prev().prevAll("a.num").hide();
			pCurrent.next().nextAll("a.num").hide();
		} else {
			pCurrent.prev().prevAll("a.num").show();
			pCurrent.next().nextAll("a.num").show();
		}
	})
}


//슬라이드 : 최신뉴스 반응형
function initRspNews() {
	var ww = $(window).width();
	var newsSwiper = undefined;
	
	function initSwiper() {
	
	  if (ww < 1280 && newsSwiper == undefined) {
		newsSwiper = new Swiper(".main_swiper", {
			slidesPerView: 1,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	  } else if (ww >= 1280 && newsSwiper != undefined) {
		newsSwiper.destroy();
		newsSwiper = undefined;
	  }
	}
	
	initSwiper();
	
	$(window).on('load resize', function () {
	  ww = $(window).width();
	  initSwiper();
	});

}


//슬라이드 : 헤더 롤링
function initHdRolling() {
	var swiperHdRoll = new Swiper(".swiperHdRoll", {
		autoHeight: true,
		direction: 'vertical',
		pagination : false,
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction : false
		},
		observer: true,
		observeParents: true,
	});
}

//슬라이드 : 위키
function initWiki(){
	var swiperWiki = new Swiper(".wiki .swiperWiki", {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}

//슬라이드 : 배너
function initBanner(){
	var swiperBanner = new Swiper(".swiper_banner", {
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
		effect: "fade",
		loop: true,
	});
}



//팝업

function windowPopup(pUrl,pWidth,pHeight) {
	var popupX = (window.screen.width / 2) - (pWidth / 2);
	// 만들 팝업창 좌우 크기의 1/2 만큼 보정값으로 빼주었음

	var popupY= (window.screen.height /2) - (pHeight / 2);
	// 만들 팝업창 상하 크기의 1/2 만큼 보정값으로 빼주었음

	window.open(pUrl, '', 'status=no, height='+pHeight+', width='+pWidth+', left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY + ', scrollbars=yes');
}


// 탭 메뉴 공통 script
$(document).ready(function(){
	if ( $("*").is(".tabbox")){
		$(".tabbox ul.tab li a").click(function(){
			var tabidx = $(this).parent("li").index();
			var tabHref = $(this).attr("href");

			if ( !$(this).parent("li").hasClass("active") ){
				$(this).parent().parent().parent().parent(".tabbox").find("ul.tab li").removeClass("active");
				$(this).parent("li").addClass("active");

				if (tabHref.match("#")){
					$(this).parent().parent().parent().parent().find(".tab_cont").fadeOut(0);
					$(tabHref).fadeIn(100);
					return false;
				}else {
					$(this).parent().parent().parent().parent().find(".tab_cont").fadeOut(0);
					$(this).parent().parent().parent().parent().find(".tab_cont:eq("+tabidx+")").fadeIn(100);
				}
			}
		});
		var tabboxtot = $(".tabbox").length;
		
		for( var i = 0 ; i < tabboxtot ; i++ ){
			var thisobj = $(".tabbox").eq(i);
			for( var j = 0 ; j < thisobj.find("ul li").length ; j++ ){
				if ( thisobj.find("ul.tab li").eq(j).hasClass("active") ){
					thisobj.find(".tab_cont").fadeOut(0);
					thisobj.find(".tab_cont:eq("+j+")").fadeIn(100);
				}
			}
		}
	}
});


jQuery(document).ready(function() {
	initContainer();
	//패밀리 사이트
	familySite();
	// 헤더 랭킹 마우스 오버
	initHeaderRanking();

	// 헤더 반응형 모바일 검색
	initHeaderSearch();

	//슬라이드 : 헤더 검색어 롤링
	initHdRolling();
})

