/* =========================================================
   KAKINADA DIARIES
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");


/* OPEN MOBILE MENU */

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("open");
        document.body.style.overflow = "hidden";
    });
}


/* CLOSE MOBILE MENU */

if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
    });
}


/* CLOSE MENU AFTER CLICKING A LINK */

if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            document.body.style.overflow = "";

        });

    });
}


/* CLOSE MENU WITH ESC KEY */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && mobileMenu) {

        mobileMenu.classList.remove("open");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   02. DESTINATION CAROUSEL
   ========================================================= */

const carousel = document.getElementById("carousel");

const cards = document.querySelectorAll(".destination-card");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


/* CHECK IF CAROUSEL EXISTS */

if (carousel && cards.length > 0) {

    let currentIndex = 0;

    const totalCards = cards.length;


    /* =====================================================
       UPDATE CAROUSEL
       ===================================================== */

    function updateCarousel() {

        cards.forEach((card, index) => {

            /* REMOVE OLD STATES */

            card.classList.remove(
                "active",
                "left-card",
                "right-card",
                "hidden-card"
            );


            /* CALCULATE POSITION */

            const difference =
                (index - currentIndex + totalCards)
                % totalCards;


            /* CENTER CARD */

            if (difference === 0) {

                card.classList.add("active");

            }


            /* RIGHT CARD */

            else if (difference === 1) {

                card.classList.add("right-card");

            }


            /* LEFT CARD */

            else if (difference === totalCards - 1) {

                card.classList.add("left-card");

            }


            /* HIDDEN CARDS */

            else {

                card.classList.add("hidden-card");

            }

        });

    }


    /* =====================================================
       NEXT SLIDE
       ===================================================== */

    function nextSlide() {

        currentIndex =
            (currentIndex + 1) % totalCards;

        updateCarousel();

    }


    /* =====================================================
       PREVIOUS SLIDE
       ===================================================== */

    function previousSlide() {

        currentIndex =
            (currentIndex - 1 + totalCards)
            % totalCards;

        updateCarousel();

    }


    /* =====================================================
       ARROW BUTTONS
       ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            nextSlide
        );

    }

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            previousSlide
        );

    }


    /* =====================================================
       AUTO SLIDE
       ===================================================== */

    let autoSlide = setInterval(
        nextSlide,
        5000
    );


    /* =====================================================
       PAUSE ON MOUSE HOVER
       ===================================================== */

    carousel.addEventListener(
        "mouseenter",
        () => {

            clearInterval(autoSlide);

        }
    );


    /* RESUME AFTER MOUSE LEAVES */

    carousel.addEventListener(
        "mouseleave",
        () => {

            clearInterval(autoSlide);

            autoSlide = setInterval(
                nextSlide,
                5000
            );

        }
    );


    /* =====================================================
       MOBILE SWIPE
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    /* TOUCH START */

    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    /* TOUCH END */

    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchEndX - touchStartX;


            /* IGNORE SMALL MOVEMENTS */

            if (Math.abs(distance) < 50) {
                return;
            }


            /* SWIPE LEFT */

            if (distance < 0) {

                nextSlide();

            }


            /* SWIPE RIGHT */

            else {

                previousSlide();

            }

        },
        { passive: true }
    );


    /* =====================================================
       INITIALIZE CAROUSEL
       ===================================================== */

    updateCarousel();

}


/* =========================================================
   03. SEARCH BUTTON
   ========================================================= */

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        /*
         * Search functionality will be added
         * in a later stage.
         */

        console.log(
            "Kakinada Diaries search clicked."
        );

    });

}


/* =========================================================
   04. THEME BUTTON
   ========================================================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        /*
         * Theme functionality will be added
         * after the main website is completed.
         */

        console.log(
            "Kakinada Diaries theme button clicked."
        );

    });

}


/* =========================================================
   05. PAGE READY
   ========================================================= */

console.log(
    "Kakinada Diaries website loaded successfully."
);
