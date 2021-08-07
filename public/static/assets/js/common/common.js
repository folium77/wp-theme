/* ドロップダウン
---------------------------------------------------------- */
const dropdown = function() {

  const button = document.querySelectorAll('.js-dropdown-toggle');
  const close = document.querySelectorAll('.js-dropdown-close');
  const openClass = 'is-expand';

  Array.prototype.forEach.call(button, function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      el.parentNode.parentNode.classList.toggle(openClass);
    });
  });

  Array.prototype.forEach.call(close, function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      el.parentNode.parentNode.classList.remove(openClass);
    });
  });

}

/* タブ
---------------------------------------------------------- */
const tab = function() {

  const tab = document.querySelectorAll('.js-tab');

  if ( tab.length < 1 ) return false;

  Array.prototype.forEach.call(tab, function(el, i) {

    const tab_head = el.querySelectorAll('.js-tab-head');
    const tab_head_child = tab_head[0].children;
    const tab_body = el.querySelectorAll('.js-tab-body');
    const tab_body_child = tab_body[0].children;

    tab_body_child[0].classList.add('is-active');
    tab_head_child[0].classList.add('is-active');

    for (let $i = 0; $i < tab_head_child.length; $i++) {
      let index = $i;
      tab_head_child[$i].addEventListener("click", function() {
        for (let $i = 0; $i < tab_head_child.length; $i++) {
          tab_body_child[$i].classList.remove('is-active');
          tab_head_child[$i].classList.remove('is-active');
        }

        tab_body_child[index].classList.add('is-active');
        tab_head_child[index].classList.add('is-active');
      });
    }

  });

}

/* スクロール禁止
---------------------------------------------------------- */
const scrollLock = function() {

  const body = document.body;

  // Gnav
  const gnav = document.getElementById('gnav');
  const gnavToggle = document.getElementById('nav-toggle');
  const gnavOpenClass = 'is-nav-opened';

  //Event nav
  const eventNavToggle = document.getElementById('js-event-nav');
  const eventNav = document.getElementById("event-nav-sp");
  const eventNavOpenClass = 'is-event-nav-opened';

  // Overlay
  const overlay = document.getElementById('overlay');

  // bodyScrollLockAction
  const bodyScrollLockAction = function() {

    if( body.classList.contains(gnavOpenClass) || body.classList.contains(eventNavOpenClass) ){
      bodyScrollLock.enableBodyScroll(gnav);
      bodyScrollLock.enableBodyScroll(eventNav);
    } else {
      bodyScrollLock.disableBodyScroll(gnav);
      bodyScrollLock.disableBodyScroll(eventNav);
    }

  }

  if( gnavToggle !== null ) {
    gnavToggle.addEventListener('click', function() {
      bodyScrollLockAction();
    });
  }

  if( overlay !== null ) {
    overlay.addEventListener('click', function() {
      bodyScrollLockAction();
    });
  }

  if( eventNavToggle !== null ) {
    eventNavToggle.addEventListener('click', function() {
      bodyScrollLockAction();
    });
  }
}

/* グローバルナビ
---------------------------------------------------------- */
const gnavAction = function(e, el) {

  const body = document.body;
  const gnavOpenClass = 'is-nav-opened';
  const eventNavOpenClass = 'is-event-nav-opened';

  e.preventDefault();
  gnavInnnerClose();

  if( body.classList.contains(gnavOpenClass) ){
    body.classList.remove(gnavOpenClass);
  } else {
    body.classList.add(gnavOpenClass);
  }

  body.classList.remove(eventNavOpenClass);

}

const gnavToggle = function() {

  const gnavToggle = document.querySelectorAll('.js-gnav-toggle');
  const overlay = document.getElementById('overlay');

  // ハンバーガーメニュークリック
  if( gnavToggle !== null ) {
    Array.prototype.forEach.call(gnavToggle, function(el) {
      el.addEventListener('click', function(e) {
        console.log('OK');
        gnavAction(e);
      });
    });
  }

  // 背景クリック
  if( overlay !== null ) {
    overlay.addEventListener('click', function(e) {
      gnavAction(e);
    });
  }

}

const gnavInnnerClose = function() {

  const dropdown = document.querySelectorAll('.gnav-dropdown');
  const openClass = 'is-expand';

  if ( document.body.classList[0] === 'is-nav-opened' ) {
    Array.prototype.forEach.call(dropdown, function(el) {
      el.classList.remove(openClass);
    });
  }

}

/* スティッキー IE11対策
---------------------------------------------------------- */
const headerFixed = function() {

  const el = document.querySelectorAll('.gnav');
  Stickyfill.add(el);

}

/* LazyLoad
---------------------------------------------------------- */
const lazyLoad = function() {

  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

}

/* pagetopButton
---------------------------------------------------------- */
const pagetopButton = function() {

  const pagetop = document.getElementById('pagetop');
  const fixedClass = 'is-fixed';

  if( pagetop === null ) return false;

  const fixedToggle = function() {

    const docHeight = document.body.clientHeight;
    const scrollCount = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPos = document.documentElement.clientHeight + scrollCount;
    const footerHeight = document.querySelector('footer').clientHeight;

    if (docHeight - scrollPos <= footerHeight) {
      pagetop.classList.remove(fixedClass);
    } else {
      pagetop.classList.add(fixedClass);
    }

  }

  window.addEventListener('load', fixedToggle);
  window.addEventListener('scroll', fixedToggle);
  window.addEventListener('touchmove', fixedToggle);

}

/* scrolledClassToggle
---------------------------------------------------------- */
const scrolledClassToggle = function() {

  const body = document.body;
  const scrolledClass = 'is-scrolled';

  const scrolledAction = function() {

    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    if ( scrollTop > 50 ) {
      body.classList.add(scrolledClass);
    } else {
      body.classList.remove(scrolledClass);
    }

  }

  window.addEventListener('load', scrolledAction);
  window.addEventListener('scroll', scrolledAction);
  window.addEventListener('touchmove', scrolledAction);

}

/* smoothScroll
---------------------------------------------------------- */
const headerHeight = function() {
  const gnav = document.querySelector('.gnav');
  const height = gnav.offsetHeight;
  return height;
}

const smoothScroll = function(obj) {

  const scroll = new SmoothScroll('.pagetop__link', {
    speed: 500,
    speedAsDuration: true,
    updateURL: false,
  });

  const btn = document.querySelectorAll('a[href^="#"]');

  Array.prototype.forEach.call(btn, function(el) {
    const href = el.hash.replace('#', '');
    const target = document.getElementById(href);
    el.addEventListener('click', function(e) {
      const targetPos = ( target ) ? target.getBoundingClientRect().top - headerHeight() + window.pageYOffset : 0;
      scroll.animateScroll(targetPos);
      e.preventDefault();
    });
  });

  if( obj ) {

    const idx = obj.selectedIndex;
    const value = obj.options[idx].value;
    const anchor = document.querySelector(value);

    if( value ) {
      scroll.animateScroll(anchor);
    }

  }

}

const loadAnchor = function() {
  const hash = location.hash.replace('#', '');
  const target = document.getElementById(hash);
  const targetPos = ( target ) ? target.getBoundingClientRect().top - headerHeight() + window.pageYOffset : 0;
  window.addEventListener('load', function(){
    scrollTo( 0, targetPos );
  });
}

/* share
---------------------------------------------------------- */
const share = function() {

  const shareTitle = encodeURI(document.title);
  const shareUrl = encodeURI(document.URL);
  const shareBtn = document.querySelectorAll('.js-share-btn');
  const twitter = document.querySelectorAll('.js-twitter-share');
  const facebook = document.querySelectorAll('.js-facebook-share');
  const pinterest = document.querySelectorAll('.js-pinterest-share');
  const line = document.querySelectorAll('.js-line-share');

  if( twitter !== null ) {
    Array.prototype.forEach.call(twitter, function(el) {
      el.setAttribute('href', 'http://twitter.com/share?url=' + shareUrl + '&text=' + shareTitle);
    });
  }

  if( facebook !== null ) {
    Array.prototype.forEach.call(facebook, function(el) {
      el.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl);
    });
  }

  if( pinterest !== null ) {
    Array.prototype.forEach.call(pinterest, function(el) {
      el.setAttribute('href', 'https://pinterest.com/pin/create/button/?url=' + shareUrl + '&media=InURL&description=' + shareTitle);
    });
  }

  if( line !== null ) {
    Array.prototype.forEach.call(line, function(el) {
      el.setAttribute('href', 'https://social-plugins.line.me/lineit/share?url=' + shareUrl);
    });
  }

  if( shareBtn !== null ) {
    Array.prototype.forEach.call(shareBtn, function(el) {
      el.addEventListener('click', function(e) {
        window.open(this.href, 'social_window','width=600,height=600,resizable=yes,scrollbars=yes,toolbar=yes');
        e.preventDefault();
      });
    });
  }

}

/* mediaQuery
---------------------------------------------------------- */
const isSp = function() {

  mq = ( window.matchMedia( "(max-width: 767px)" ).matches ) ? true : false;
  return mq;

}

const isTb = function() {

  mq = ( window.matchMedia( "(max-width: 999px)" ).matches ) ? true : false;
  return mq;

}

/* Init
---------------------------------------------------------- */
dropdown();
tab();
scrollLock();
gnavToggle();
headerFixed();
lazyLoad();
pagetopButton();
scrolledClassToggle();
smoothScroll();
loadAnchor();
share();