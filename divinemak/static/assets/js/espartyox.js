(function ($) {
  "use strict";

  /* main slider title animation */
  $('.main-slider-one__title, .main-slider-two__title').each(function () {
    const originalHtml = $(this).html();
    let newHtml = '';
    let i = 0;
    let delay = 0.05;
    let insideTag = false;
    let tagBuffer = '';
    let tagStack = [];

    function wrapWord(word, isManualDiv = false) {
      let result = isManualDiv ? '' : '<span style="display:inline-block;">';
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        if (char.trim()) {
          result += `<span style="animation-delay:${(delay).toFixed(2)}s">${char}</span>`;
          delay += 0.05;
        } else {
          result += char;
        }
      }
      if (!isManualDiv) result += '</span>';
      return result;
    }

    let buffer = '';
    let insideManualDiv = false;

    while (i < originalHtml.length) {
      const char = originalHtml[i];

      if (char === '<') {
        if (buffer.trim()) {
          const words = buffer.split(/(\s+)/);
          for (const word of words) {
            if (word.trim()) {
              newHtml += wrapWord(word, insideManualDiv);
            } else {
              newHtml += word;
            }
          }
        } else {
          newHtml += buffer;
        }
        buffer = '';
        insideTag = true;
        tagBuffer = '<';
      } else if (insideTag) {
        tagBuffer += char;
        if (char === '>') {
          insideTag = false;

          const isClosing = /^<\//.test(tagBuffer);
          const tagNameMatch = tagBuffer.match(/^<\/?(\w+)/);
          const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';

          if (tagName === 'div') {
            if (!isClosing) {
              tagStack.push('div');
              insideManualDiv = true;
            } else {
              tagStack.pop();
              insideManualDiv = tagStack.includes('div');
            }
          }

          newHtml += tagBuffer;
          tagBuffer = '';
        }
      } else {
        buffer += char;
      }

      i++;
    }

    if (buffer.trim()) {
      const words = buffer.split(/(\s+)/);
      for (const word of words) {
        if (word.trim()) {
          newHtml += wrapWord(word, insideManualDiv);
        } else {
          newHtml += word;
        }
      }
    } else {
      newHtml += buffer;
    }

    $(this).html(newHtml);
  });

  /*-- Checkout Accoradin --*/
  if ($(".checkout-page__payment__title").length) {
    $(".checkout-page__payment__item")
      .find(".checkout-page__payment__content")
      .hide();
    $(".checkout-page__payment__item--active")
      .find(".checkout-page__payment__content")
      .show();
    $(".checkout-page__payment__title").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__item")
        .removeClass("checkout-page__payment__item--active");
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__content")
        .slideUp();
      $(this).parent().addClass("checkout-page__payment__item--active");
      $(this).parent().find(".checkout-page__payment__content").slideDown();
    });
  }

  /*------ Language Toggler -----*/
  $('.user-info__btn').on('click', function (e) {
    e.preventDefault();
    $('.user-info__dropdown').slideToggle();
  });

  /*-- Dynamic Year --*/
  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  /*-- Count Bar --*/
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
        accY: -50,
      }
    );
  }

  /*-- Fact Counter + Text Count --*/
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate({
            countNum: n,
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            },
          });
        }
      }, {
        accY: 0,
      }
    );
  }

  /*--  Custom Coursor --*/
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  /*--  Contact Form Validated --*/
  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        message: {
          required: true,
        },
        subject: {
          required: true,
        },
      },
      submitHandler: function (form) {
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      },
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false,
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true,
        },
      });
    });
  }

  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  //Show Popup menu
  $(document).on("click", ".megamenu-clickable--toggler > a", function (e) {
    $("body").toggleClass("megamenu-popup-active");
    $(this).parent().find("ul").toggleClass("megamenu-clickable--active");
    e.preventDefault();
  });
  $(document).on("click", ".megamenu-clickable--close", function (e) {
    $("body").removeClass("megamenu-popup-active");
    $(".megamenu-clickable--active").removeClass("megamenu-clickable--active");
    e.preventDefault();
  });

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", 
      animateClass: "animated", 
      mobile: true, 
      live: true, 
    });
    wow.init();
  }

  //accrodion
  if ($(".espartyox-accrodion").length) {
    var accrodionGrp = $(".espartyox-accrodion");
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accrodion");
      Self.addClass(accrodionName);
      Self.find(".accrodion .accrodion-content").hide();
      Self.find(".accrodion.active").find(".accrodion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accrodion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".espartyox-accrodion." + accrodionName)
                .find(".accrodion")
                .removeClass("active");
              $(".espartyox-accrodion." + accrodionName)
                .find(".accrodion")
                .find(".accrodion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accrodion-content").slideDown();
            }
          });
      });
    });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });

  $(".sub").on("click", function () {
    if ($(this).next().val() > 0) {
      if ($(this).next().val() > 0)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  function thmOwlInit() {
    let espartyoxowlCarousel = $(".espartyox-owl__carousel");
    if (espartyoxowlCarousel.length) {
      espartyoxowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }
    let espartyoxowlCarouselNav = $(".espartyox-owl__carousel--custom-nav");
    if (espartyoxowlCarouselNav.length) {
      espartyoxowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }
  }

  function espartyoxSlickInit() {
    let espartyoxslickCarousel = $(".espartyox-slick__carousel");
    if (espartyoxslickCarousel.length) {
      espartyoxslickCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let espartyoxslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
    let espartyoxslickCarouselCounter = $(
      ".espartyox-slick__custome-counter"
    );
    if (espartyoxslickCarouselCounter.length) {
      espartyoxslickCarouselCounter.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let currentSlide;
        let slidesCount;
        let sliderCounter = document.createElement("div");
        sliderCounter.classList.add("espartyox-slick__counter");

        let updateSliderCounter = function (slick, currentIndex) {
          currentSlide = slick.slickCurrentSlide() + 1;
          slidesCount = slick.slideCount;
          $(sliderCounter).html(
            '<span class="espartyox-slick__counter__active">' +
            currentSlide +
            "</span>" +
            "" +
            "<span>" +
            slidesCount +
            "</span>"
          );
        };
        elm.on("init", function (event, slick) {
          elm.append(sliderCounter);
          updateSliderCounter(slick);
        });
        elm.on("afterChange", function (event, slick, currentSlide) {
          updateSliderCounter(slick, currentSlide);
        });

        let espartyoxslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }
  $(".espartyox-owl__carousel").on("initialized.owl.carousel", function () {
    console.log("Carousel initialized with thumbnail dots");
  });

  /*-- One Page Menu --*/
  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
              scrollTop: $(target.attr("href")).offset().top - headerH + "px",
            },
            900,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        anchor.removeClass("current-menu-ancestor");
        anchor.removeClass("current_page_item");
        anchor.removeClass("current-menu-parent");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  // window scroll event
  function stickyMenuUpScroll($targetMenu, $toggleClass) {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 500) {
          if (st > lastScrollTop) {
            // downscroll code
            $targetMenu.removeClass($toggleClass);
            // console.log("down");
          } else {
            // upscroll code
            $targetMenu.addClass($toggleClass);
            // console.log("up");
          }
        } else {
          $targetMenu.removeClass($toggleClass);
        }
        lastScrollTop = st;
      },
      false
    );
  }
  stickyMenuUpScroll($(".sticky-header--normal"), "active");

  //Strech Column
  function espartyox_stretch() {
    var i = $(window).width();
    $(".row .case-study-two__item__box").each(function () {
      var $this = $(this),
        row = $this.closest(".row"),
        cols = $this.closest('[class^="col-"]'),
        colsheight = $this.closest('[class^="col-"]').height(),
        rect = this.getBoundingClientRect(),
        l = row[0].getBoundingClientRect(),
        s = cols[0].getBoundingClientRect(),
        r = rect.left,
        d = i - rect.right,
        c = l.left + (parseFloat(row.css("padding-left")) || 0),
        u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
        p = s.left,
        f = i - s.right,
        styles = {
          "margin-left": 0,
          "margin-right": 0,
        };
      if (Math.round(c) === Math.round(p)) {
        var h = parseFloat($this.css("margin-left") || 0);
        styles["margin-left"] = h - r;
      }
      if (Math.round(u) === Math.round(f)) {
        var w = parseFloat($this.css("margin-right") || 0);
        styles["margin-right"] = w - d;
      }
      $this.css(styles);
    });
  }
  espartyox_stretch();

  /*-- Price Range --*/
  function priceFilter() {
    if ($(".price-ranger").length) {
      $(".price-ranger #slider-range").slider({
        range: true,
        min: 50,
        max: 1000,
        values: [11, 500],
        slide: function (event, ui) {
          $(".price-ranger .ranger-min-max-block .min").val("$" + ui.values[0]);
          $(".price-ranger .ranger-min-max-block .max").val("$" + ui.values[1]);
        },
      });
      $(".price-ranger .ranger-min-max-block .min").val(
        "$" + $(".price-ranger #slider-range").slider("values", 0)
      );
      $(".price-ranger .ranger-min-max-block .max").val(
        "$" + $(".price-ranger #slider-range").slider("values", 1)
      );
    }
  }

  /*-- Back-to-top --*/
  function scrollTopPercentage() {
    const scrollPercentage = () => {
      const scrollTopPos = document.documentElement.scrollTop;
      const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
      const scrollElementWrap = $("#scroll-top");

      scrollElementWrap.css(
        "background",
        `conic-gradient( var(--espartyox-base) ${scrollValue}%, var(--espartyox-white) ${scrollValue}%)`
      );

      // ScrollProgress
      if (scrollTopPos > 100) {
        scrollElementWrap.addClass("active");
      } else {
        scrollElementWrap.removeClass("active");
      }

      if (scrollValue < 96) {
        $("#scroll-top-value").text(`${scrollValue}%`);
      } else {
        $("#scroll-top-value").html('<i class="fas fa-arrow-up"></i>');
      }
    };
    window.onscroll = scrollPercentage;
    window.onload = scrollPercentage;

    // Back to Top
    function scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    $("#scroll-top").on("click", scrollToTop);
  }
  scrollTopPercentage();

  // window load event
  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    thmOwlInit();
    espartyoxSlickInit();
    priceFilter();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        let circleProgress = $(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }
  });

  $(window).on("scroll", function () {
    if ($(".sticky-header--one-page").length) {
      var headerScrollPos = 130;
      var stricky = $(".sticky-header--one-page");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("active");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("active");
      }
    }

    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });

  $(window).on("resize", function () {
    espartyox_stretch();
  });

  // Portfolio Hover Image
  const link = document.querySelectorAll(".case-study-two__item");
  const linkHoverReveal = document.querySelectorAll(".case-study-two__item__box");
  const linkImages = document.querySelectorAll(".case-study-two__item__box__img");
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("mousemove", (e) => {
      linkHoverReveal[i].style.opacity = 1;
      linkHoverReveal[
        i
      ].style.transform = `translate(-100%, -50% )`;
      linkImages[i].style.transform = "scale(1, 1)";
      linkHoverReveal[i].style.left = e.clientX + "px";
    });
    link[i].addEventListener("mouseleave", (e) => {
      linkHoverReveal[i].style.opacity = 0;
      linkHoverReveal[i].style.transform = `translate(50%, 50%)`;
      linkImages[i].style.transform = "scale(0.8, 0.8)";
    });
  }
})(jQuery);
