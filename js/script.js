/*
-----header-----
1.disppear when scroll up, re-appear when scroll down
https://www.youtube.com/watch?v=Q_XZk5Vnujw
2.crown moves to the objects been pointed at and stays at the object been clicked. move back to previousely clicked object.
3.move to certain part of the page thr nav bar smoothly
4.pull down menu for language button????
*/
const navList = document.querySelector('.nav-list');
const navLists = navList.querySelectorAll('li');
const navCrown = document.querySelector('.nav-crown');
const header = document.querySelector('header');
const main = document.querySelector('main');

let lastScrollY = window.scrollY; //initial the Y value

// disppear when scroll up, re-appear when scroll down
window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) { // to define it is scrolling down
        header.classList.remove('nav-show');
        header.classList.add('nav-hidden'); // hide nav bar slowly
    } else {
        header.classList.remove('nav-hidden');
        header.classList.add('nav-show'); // nav bar reappear slowly
    }
    lastScrollY = window.scrollY; // reset the Y value
})


// when the page loads up, initialise the position of navCrown, above bio.
let currentOffsetLeft = navLists[0].offsetLeft;
// when window resizes, reset the position of the navCrown and move it to the new position.
window.addEventListener('resize', function () {
    currentOffsetLeft = navLists[0].offsetLeft;
    animate(navCrown, currentOffsetLeft);
})

for (let i = 0; i < navLists.length; i++) {
    navLists[i].addEventListener('mouseenter', function () {
        let step = justifyNavCrown(this);
        animate(navCrown, step);
    });
    navLists[i].addEventListener('mouseleave', function () {
        animate(navCrown, currentOffsetLeft);
    });
    navLists[i].addEventListener('click', function () {
        currentOffsetLeft = justifyNavCrown(this);
        animate(navCrown, currentOffsetLeft);
    });
}

// define how much the navCrown is going to move in order to justify itself to the center of each nav list
function justifyNavCrown(targetItem) {
    switch (targetItem) {
        case navLists[0]:
            step = targetItem.offsetLeft;
            break;
        case navLists[1]:
            step = targetItem.offsetLeft + 10;
            break;
        case navLists[2]:
            step = targetItem.offsetLeft + 25;
            break;
        case navLists[3]:
            step = targetItem.offsetLeft + 23;
            break;
    }
    return step;
}





/*
--------Bio-------
click arrow to show the bio content
 */

const bioArrow = document.querySelector('.bio-arrow');
const bioGrid = document.querySelector('#bio-section > .grid');
const bio = document.querySelector('.bio');
const bioContent = document.querySelector('.bio-content');
let flag = 0;
bioArrow.addEventListener('click', () => {
    if (flag == 0) {
        bioArrow.id = 'bio-arrow';
        bio.id = 'bio';
        bioContent.id = 'bio-content';
        flag = 1;
    } else {
        bioArrow.removeAttribute('id');
        bio.removeAttribute('id');
        bioContent.removeAttribute('id');
        flag = 0;
    }
})

/* -----skills-----
1.slide and display different skill cards autoly
2.click prev and next btn to change cards
3.click circle to choose cards
*/
const arrowR = document.querySelector('.arrow-r');
const arrowL = document.querySelector('.arrow-l');

// https://www.youtube.com/watch?v=XtFlpgaLbZ4&list=PLPO_K_9yOHNF4rG0aMCABVyi_q1wUo3GG&index=7

const carouselContainer = document.querySelectorAll('.carousel-container');

carouselContainer.forEach((carouselContainer) => {
    //global var
    cards = carouselContainer.querySelectorAll('.card');

    //create an btn array of three items. the num of cards = 3
    const carouselBtns = Array.from(cards, () => {
        return `<span class="carousel-btn"></span>`;
    });

    // join the btn array into one string of HTML code and insert it after the arrow-r element
    arrowR.insertAdjacentHTML('afterend',
        `<div class="carousel-nav">${carouselBtns.join("")}</div>`
    );
    //global var
    buttons = document.querySelectorAll('.carousel-btn');
    buttons.forEach((button, i) => {
        //set data-index for every btn

        button.setAttribute('data-index', i);
        button.addEventListener("click", () => {
            // un-select all cards
            cards.forEach(card => card.classList.remove('card-showed'));
            // un-select all buttons
            buttons.forEach(button => button.classList.remove('selected'));
            // add the class to selected card and button
            cards[i].classList.add('card-showed');
            button.classList.add('selected');

        });
    });

    // Select the first item on page load
    cards[0].classList.add("card-showed");
    buttons[0].classList.add("selected");

});

//set data-index for every card
cards.forEach((card, i) => {
    card.setAttribute('data-index', i);
});

// next arrow
arrowR.addEventListener('click', () => {
    let currentIndex = getCurrentIndexAndUnselect();
    currentIndex++;
    if (currentIndex < cards.length) {
        cards[currentIndex].classList.add('card-showed');
        buttons[currentIndex].classList.add('selected');
    } else {
        cards[0].classList.add('card-showed');
        buttons[0].classList.add('selected');
    }


});

arrowL.addEventListener('click', () => {
    let currentIndex = getCurrentIndexAndUnselect();
    currentIndex--;
    if (currentIndex < 0) {
        cards[cards.length - 1].classList.add('card-showed');
        buttons[cards.length - 1].classList.add('selected');
    } else {
        cards[currentIndex].classList.add('card-showed');
        buttons[currentIndex].classList.add('selected');
    }


});

function getCurrentIndexAndUnselect() {
    let showedCard = document.querySelector('.card-showed');
    let selectedBtn = document.querySelector('.selected');

    //as the cards and btns share the same index
    let currentIndex = showedCard.dataset.index;

    // un-select all cards
    cards.forEach(card => card.classList.remove('card-showed'));
    // un-select all buttons
    buttons.forEach(button => button.classList.remove('selected'));

    return currentIndex;
}


/*-------projects------ 
1.link to the pages hosted on GitHub etc.
2.mouseenter to emphazise the description 
*/



/*---------find me--------
    mouseenter to show more info
*/