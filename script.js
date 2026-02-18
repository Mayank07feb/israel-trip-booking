/**
 * Travel UI — Complete JavaScript
 * File: script.js
 * Contains: Swiper init, trip sections, modal logic,
 *           keyboard support, CoBrowse screen sharing
 */

'use strict';

/* ============================================
   COBROWSE — Screen Sharing (Agent Support)
   ============================================ */

(function (w, t, c, p, s, e) {
            p = new Promise(function (r) {
                w[c] = {
                    client: function () {
                        if (!s) {
                            s = document.createElement(t);
                            s.src = 'https://js.cobrowse.io/CobrowseIO.js';
                            s.async = 1;
                            s.crossOrigin = 'anonymous';
                            e = document.getElementsByTagName(t)[0];
                            e.parentNode.insertBefore(s, e);
                            s.onload = function () { r(w[c]); };
                        }
                        return p;
                    }
                };
            });
        })(window, 'script', 'CobrowseIO');
        CobrowseIO.license = "-7gRachELA6a3A";
        CobrowseIO.client().then(function () { CobrowseIO.start(); });


/**
 * Travel UI - Main JavaScript
 * File: js/main.js
 * Description: Handles swiper initialization, modal logic, and UI interactions
 */

'use strict';

/* ============================================
   SWIPER INITIALIZATION
   ============================================ */

var swiper;
var swiperForeColumn;

/**
 * Initialize 2-column swiper carousel
 */
function initialize2ColumnSwiper() {
    swiperForeColumn = new Swiper('.swiper_2_column', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}

/**
 * Initialize single swiper carousel
 */
function initializeSwiper() {
    swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}

/* ============================================
   TRIP SECTION TOGGLE
   ============================================ */

/**
 * Toggle visibility of a trip section
 * @param {string} sectionId
 */
function openTripSection(sectionId) {
    var sectionSummary = document.getElementById('trip-section-summary-' + sectionId);
    var section = document.getElementById('trip-section-' + sectionId);

    if (!section || !sectionSummary) return;

    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        sectionSummary.style.display = 'none';
        initializeSwiper();
        initialize2ColumnSwiper();
    } else {
        section.style.display = 'none';
        sectionSummary.style.display = 'block';
    }
    toggleButtons(sectionId);
}

/**
 * Toggle plus/close button visibility
 * @param {string} sectionId
 */
function toggleButtons(sectionId) {
    var plusButton = document.getElementById('plus-button-' + sectionId);
    var closeButton = document.getElementById('close-button-' + sectionId);

    if (!plusButton || !closeButton) return;

    if (plusButton.style.display !== 'none') {
        plusButton.style.display = 'none';
        closeButton.style.display = 'block';
    } else {
        plusButton.style.display = 'block';
        closeButton.style.display = 'none';
    }
}

/* ============================================
   IFRAME TOGGLE (Package purchase)
   ============================================ */

/**
 * Toggle iframe source visibility
 */
function showIframeSource() {
    var purchaseBtn = document.getElementById('quieroComprarBtn');
    var iframe = document.getElementById('changeedIfrmSource');

    if (!purchaseBtn || !iframe) return;

    if (iframe.style.display === 'none' || iframe.style.display === '') {
        iframe.style.display = 'block';
        purchaseBtn.style.display = 'none';
    } else {
        iframe.style.display = 'none';
        purchaseBtn.style.display = 'block';
    }
}

/* ============================================
   DETAIL MODAL
   ============================================ */

var modalCurrentSlide = 0;
var modalTotalSlides = 0;

/**
 * Modal data per trip item type
 * Each entry has: title, meta, desc, images[]
 */
var modalData = {
    flight: {
        title: "טיסה",
        meta: "ישראל &rarr; רומא &bull; EL AL LY386",
        desc: "טיסה ישירה מתל אביב לרומא עם אל על. הטיסה כוללת כבודה מוגדרת, ארוחה על הטיסה ושירות לקוחות מלא.",
        images: [
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
            "https://images.unsplash.com/photo-1544016768-982d1554f1e8?w=800&q=80",
            "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80"
        ]
    },
    transfer: {
        title: "העברה פרטית",
        meta: "שדה תעופה &rarr; מלון",
        desc: "נסיעה פרטית ונוחה משדה התעופה ישירות למלון. הנהג יחכה לכם עם שלט שמכיל את שמכם ויסייע עם המזוודות.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
        ]
    },
    hotel: {
        title: "Hotel Berchielli",
        meta: "4 כוכבים &bull; 3 לילות",
        desc: "מלון קלאסי בפירנצה, הממוקם על גדות נהר הארנו, סמוך לפונטה וקיו ולגלריית אופיצי. המלון מציע חדרים אלגנטיים עם נוף לעיר או לנהר, ארוחת בוקר עשירה ושירות אדיב.",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"
        ]
    },
    train: {
        title: "רכבת",
        meta: "Roma Termini &rarr; Firenze &bull; 2h 30m",
        desc: "רכבת מהירה ונוחה מרומא לפירנצה. כרטיסים כלולים בחבילה, עם מושבים שמורים מראש.",
        images: [
            "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
            "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&q=80"
        ]
    },
    car: {
        title: "רכב השכרה",
        meta: "Hyundai Tucson or similar &bull; Avis",
        desc: "רכב נוח ומרווח להשכרה לנסיעות עצמאיות. מיזוג אוויר, GPS מובנה, ביטוח כולל.",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80"
        ]
    },
    food: {
        title: "חוויה קולינרית",
        meta: "ארוחה במסעדה טוסקנית אותנטית",
        desc: "ארוחה אותנטית במסעדה טוסקנית מקומית. תהנו ממנות מסורתיות, יינות מקומיים ואווירה ייחודית.",
        images: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        ]
    },
    cooking: {
        title: "סדנת בישול",
        meta: "Italian Cooking Class &bull; Chianti",
        desc: "סדנת בישול איטלקית מקצועית בלב קיאנטי. למדו להכין פסטה טרייה, רטבים מסורתיים ועוגיות טוסקניות.",
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
            "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80"
        ]
    },
    activities: {
        title: "פעילויות נוספות",
        meta: "סיורים מיוחדים באזור",
        desc: "בתוספת תשלום מחוץ לחבילה - סיורים מודרכים, טיולי יין, ביקור בכפרים היסטוריים ועוד.",
        images: [
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
            "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80"
        ]
    },
    checkout: {
        title: "פינוי חדרים",
        meta: "Check-out 12:00",
        desc: "פינוי חדרים עד השעה 12:00. ניתן לאחסן מזוודות בקבלת המלון עד לנסיעה.",
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    }
};

/**
 * Open detail modal with content for given type
 * @param {string} type - key from modalData
 */
function openDetailModal(type) {
    var data = modalData[type] || {
        title: type,
        meta: '',
        desc: '',
        images: ['https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80']
    };

    modalCurrentSlide = 0;

    // Set text content
    document.getElementById('modalTitle').innerHTML = data.title;
    document.getElementById('modalMeta').innerHTML = data.meta;

    var descEl = document.getElementById('modalDesc');
    if (descEl) descEl.innerHTML = data.desc || '';

    // Build image slides
    var slidesEl = document.getElementById('modalSlides');
    slidesEl.innerHTML = '';
    data.images.forEach(function (src) {
        var slide = document.createElement('div');
        slide.className = 'modal-slide';
        slide.innerHTML = '<img src="' + src + '" alt="' + data.title + '" loading="lazy">';
        slidesEl.appendChild(slide);
    });
    modalTotalSlides = data.images.length;

    // Build dot indicators
    var dotsEl = document.getElementById('modalDots');
    dotsEl.innerHTML = '';
    data.images.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'modal-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.onclick = (function (idx) {
            return function () { goToModalSlide(idx); };
        })(i);
        dotsEl.appendChild(dot);
    });

    updateModalSlider();

    // Show modal
    document.getElementById('detailModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the detail modal
 */
function closeDetailModal() {
    document.getElementById('detailModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Slide in a given direction
 * @param {number} dir - 1 for next, -1 for prev
 */
function modalSlide(dir) {
    modalCurrentSlide = (modalCurrentSlide + dir + modalTotalSlides) % modalTotalSlides;
    updateModalSlider();
}

/**
 * Jump to a specific slide
 * @param {number} index
 */
function goToModalSlide(index) {
    modalCurrentSlide = index;
    updateModalSlider();
}

/**
 * Update slider transform and dot states
 */
function updateModalSlider() {
    var slidesEl = document.getElementById('modalSlides');
    if (slidesEl) {
        slidesEl.style.transform = 'translateX(' + (modalCurrentSlide * 100) + '%)';
    }
    var dots = document.querySelectorAll('.modal-dot');
    dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === modalCurrentSlide);
    });
}

/* ============================================
   KEYBOARD SUPPORT
   ============================================ */

document.addEventListener('keydown', function (e) {
    var overlay = document.getElementById('detailModalOverlay');
    if (!overlay || !overlay.classList.contains('active')) return;

    if (e.key === 'Escape') closeDetailModal();
    if (e.key === 'ArrowLeft') modalSlide(1);
    if (e.key === 'ArrowRight') modalSlide(-1);
});

/* ============================================
   INIT ON DOM READY
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initializeSwiper();
    initialize2ColumnSwiper();
});