/* =====================================
   SHARED ELEMENTS
===================================== */

const letterSection =
    document.getElementById("letter");

const yesScreen =
    document.getElementById("yesScreen");


/* =====================================
   WHERE FLOATERS GO
   (floaters use z-index: -2, so they sit
   behind the content of whatever layer
   they are added to. The letter and the
   YES screen are their own layers, so
   floaters are added inside them while
   they are open.)
===================================== */

function getLayer() {

    if (yesScreen.style.display === "flex") {
        return yesScreen;
    }

    const openLayer =
        document.querySelector(".letter-section.open");

    if (openLayer) {
        return openLayer;
    }

    return document.body;
}


/* =====================================
   CREATE STARS
===================================== */

const starsContainer = document.querySelector(".stars");

for (let i = 0; i < 140; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 4 + "s";

    starsContainer.appendChild(star);
}


/* =====================================
   YES ANSWER
===================================== */

function sayYes() {

    yesScreen.style.display = "flex";

    createHearts(70);

    for (let i = 0; i < 6; i++) {
        setTimeout(createWaguri, i * 400);
    }
}


/* =====================================
   MAYBE ANSWER
===================================== */

function sayMaybe() {

    const screen =
        document.getElementById("maybeScreen");

    screen.style.display = "flex";
}


/* =====================================
   CLOSE YES
===================================== */

function closeYes() {

    yesScreen.style.display = "none";
}


/* =====================================
   CLOSE MAYBE
===================================== */

function closeMaybe() {

    document.getElementById("maybeScreen")
        .style.display = "none";
}


/* =====================================
   FLOATING HEARTS
===================================== */

function createHearts(amount) {

    const heartTypes = [
        "💗",
        "💕",
        "💖",
        "💘",
        "❤️",
        "✨",
        "🌸",
        "🐾"
    ];

    for (let i = 0; i < amount; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.classList.add(
                "floating-heart"
            );

            heart.innerHTML =
                heartTypes[
                    Math.floor(
                        Math.random() *
                        heartTypes.length
                    )
                ];

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.fontSize =
                15 +
                Math.random() * 35 +
                "px";

            heart.style.animationDuration =
                3 +
                Math.random() * 4 +
                "s";

            getLayer().appendChild(heart);

            setTimeout(() => {

                heart.remove();

            }, 7000);

        }, i * 60);
    }
}


/* =====================================
   WAGURI GIF FLOATER
   (floats up, sways, fades in and out,
   always behind the content)
===================================== */

const WAGURI_GIF = "images/waguri1.gif";

function createFloater(src, minSize, maxSize) {

    const vw = window.innerWidth;

    const size =
        minSize + Math.random() * (maxSize - minSize);

    const left =
        Math.random() * (vw * 0.85);

    const drift =
        Math.random() * 120 - 60;

    const waguri =
        document.createElement("img");

    waguri.src = src;
    waguri.alt = "";
    waguri.draggable = false;

    waguri.classList.add(
        "floating-waguri"
    );

    waguri.style.width =
        size + "px";

    waguri.style.left =
        left + "px";

    const duration =
        7 + Math.random() * 4;

    waguri.style.animationDuration =
        duration + "s";

    waguri.style.setProperty(
        "--drift",
        drift + "px"
    );

    getLayer().appendChild(waguri);

    setTimeout(() => {

        waguri.remove();

    }, duration * 1000 + 200);
}


/* ✏️ Waguri floats inside the popups (letter, quiz, message)
   and the YES screen. Set this to true if you also want it
   drifting behind the main page sections. */
const WAGURI_ON_PAGE = false;

function createWaguri() {

    if (getLayer() === document.body && !WAGURI_ON_PAGE) {
        return;
    }

    createFloater(WAGURI_GIF, 70, 120);
}

/* =====================================
   RANDOM CUTE FLOATING EMOJIS
===================================== */

const cuteEmojis = [
    "♡",
    "✦",
    "✧",
    "✨",
    "💕"
];

setInterval(() => {

    const emoji =
        document.createElement("div");

    emoji.classList.add(
        "floating-heart"
    );

    emoji.innerHTML =
        cuteEmojis[
            Math.floor(
                Math.random() *
                cuteEmojis.length
            )
        ];

    emoji.style.left =
        Math.random() * 100 + "vw";

    emoji.style.fontSize =
        15 +
        Math.random() * 20 +
        "px";

    emoji.style.animationDuration =
        6 +
        Math.random() * 4 +
        "s";

    getLayer().appendChild(emoji);

    setTimeout(() => {

        emoji.remove();

    }, 11000);

}, 1300);


/* =====================================
   SPAWN WAGURI EVERY FEW SECONDS
===================================== */

setInterval(createWaguri, 4500);

/* one right away so it shows up early */
setTimeout(createWaguri, 1500);


/* =====================================
   POPUP HELPERS
   (letter, quiz and message all share
   the same "letter-section" popup layer)
===================================== */

function openPopup(el) {

    el.classList.add("open");
    el.scrollTop = 0;

    document.body.style.overflow = "hidden";

    /* clear any Waguri floating behind, then
       start fresh inside the popup layer */
    document
        .querySelectorAll(".floating-waguri")
        .forEach((item) => item.remove());

    setTimeout(createWaguri, 600);
}

function closePopup(el) {

    el.classList.remove("open");

    if (!document.querySelector(".letter-section.open")) {
        document.body.style.overflow = "";
    }
}


/* =====================================
   OPEN LETTER / CONTINUE
===================================== */

document.getElementById("openLetterBtn")
    .addEventListener("click", (e) => {

        e.preventDefault();

        openPopup(letterSection);
    });

document.getElementById("continueBtn")
    .addEventListener("click", () => {

        closePopup(letterSection);

        /* one step at a time: only "Things I like about you"
           unlocks here. The next sections unlock on their
           own Next buttons. */
        document
            .querySelector(".moments-section")
            .classList.remove("locked");

        document
            .querySelector(".moments-section")
            .scrollIntoView({ behavior: "smooth" });
    });


/* =====================================
   NEXT  ->  "I REALLY LIKE YOU"
===================================== */

document.getElementById("momentsNextBtn")
    .addEventListener("click", () => {

        const next =
            document.querySelector(".confession-section");

        next.classList.remove("locked");

        next.scrollIntoView({ behavior: "smooth" });
    });


/* =====================================
   NEXT  ->  MINI QUIZ
===================================== */

/* ✏️ Accepted answers (lowercase, no accents, no dots).
   The check ignores capitals, dots, extra spaces and the
   ñ, so "Lorenzo P. Peñarubia" / "lorenzo p penarubia"
   both work. */
const ACCEPTED_NAMES = [
    "lorenzo p penarubia",
    "lorenzo penarubia"
];

const quizScreen =
    document.getElementById("quizScreen");

const nameInput =
    document.getElementById("nameInput");

const quizFeedback =
    document.getElementById("quizFeedback");

const checkNameBtn =
    document.getElementById("checkNameBtn");

let wrongTries = 0;

const wrongMessages = [
    "Hmm, not quite 🥺 try again!",
    "Ehh close?? maybe?? try again 🐱",
    "Nooo you can do it 💗 again!"
];

function normalizeName(text) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function checkName() {

    const guess = normalizeName(nameInput.value);

    nameInput.classList.remove("wrong");

    if (!guess) {
        quizFeedback.textContent =
            "Type your answer first 🥺";
        return;
    }

    if (ACCEPTED_NAMES.includes(guess)) {

        nameInput.classList.add("correct");

        quizFeedback.textContent =
            "Correct!! 🥹💗";

        checkNameBtn.disabled = true;

        createHearts(30);

        setTimeout(() => {

            closePopup(quizScreen);

            openPopup(
                document.getElementById("messageScreen")
            );

        }, 1300);

        return;
    }

    wrongTries++;

    /* restart the shake animation */
    void nameInput.offsetWidth;
    nameInput.classList.add("wrong");

    quizFeedback.textContent =
        wrongTries >= 3
            ? "Hint: it starts with an L 🐱"
            : wrongMessages[(wrongTries - 1) % wrongMessages.length];
}

document.getElementById("nextBtn")
    .addEventListener("click", () => {

        wrongTries = 0;

        nameInput.value = "";
        nameInput.classList.remove("wrong", "correct");

        quizFeedback.textContent = "";
        checkNameBtn.disabled = false;

        openPopup(quizScreen);

        setTimeout(() => nameInput.focus(), 500);
    });

checkNameBtn.addEventListener("click", checkName);

nameInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        checkName();
    }
});


/* =====================================
   MESSAGE POPUP  ->  "MAY I COURT YOU"
===================================== */

document.getElementById("messageContinueBtn")
    .addEventListener("click", () => {

        closePopup(
            document.getElementById("messageScreen")
        );

        document
            .querySelectorAll(".court-section, footer")
            .forEach((el) => el.classList.remove("locked"));

        document
            .querySelector(".court-section")
            .scrollIntoView({ behavior: "smooth" });
    });


/* =====================================
   NO GETS SMALLER, YES GETS BIGGER
   (every time No is clicked)
===================================== */

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");

let noClicks = 0;

/* ✏️ tweak these to change the effect */
const MAX_NO_CLICKS  = 10;   /* growth stops after this many clicks */
const YES_GROW_STEP  = 0.3;  /* Yes gets +30% bigger each click     */
const NO_SHRINK_STEP = 0.1;  /* No gets 10% smaller each click      */
const NO_MIN_SCALE   = 0.3;  /* No never goes smaller than this     */

function sizeButton(button, scale) {

    button.style.fontSize =
        14 * scale + "px";

    button.style.padding =
        17 * scale + "px " + 35 * scale + "px";
}

function sayNo() {

    noClicks = Math.min(noClicks + 1, MAX_NO_CLICKS);

    /* smaller growth on phones so Yes stays on screen */
    const grow =
        window.innerWidth < 650
            ? YES_GROW_STEP * 0.6
            : YES_GROW_STEP;

    sizeButton(yesBtn, 1 + noClicks * grow);

    sizeButton(
        noBtn,
        Math.max(NO_MIN_SCALE, 1 - noClicks * NO_SHRINK_STEP)
    );
}