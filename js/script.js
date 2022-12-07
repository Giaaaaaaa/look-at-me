/*
-----header-----
1.disppear when scroll up, re-appear when scroll down
https://www.youtube.com/watch?v=Q_XZk5Vnujw
2.crown moves to the objects been pointed at and stays at the object been clicked. move back to previousely clicked object.
3.pull down menu for language button????
*/
const navList = document.querySelector('.nav-list');
const navLists = navList.querySelectorAll('li');
const navCrown = document.querySelector('.nav-crown');
const header = document.querySelector('header');
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

for (i = 0; i < navLists.length; i++) {
    navLists[i].addEventListener('mouseenter', function () {
        let step = alignNavCrown(this);
        animate(navCrown, step);
    });
    navLists[i].addEventListener('mouseleave', function () {
        animate(navCrown, currentOffsetLeft);
    });
    navLists[i].addEventListener('click', function () {
        currentOffsetLeft = alignNavCrown(this);
        animate(navCrown, currentOffsetLeft);
    });
}

// define how much the navCrown is going to move in order to align it to center of each nav list
function alignNavCrown(targetItem) {
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

/*-------projects------ 
1.link to the pages hosted on GitHub etc.
2.mouseenter to emphazise the description 
*/

/*---------find me--------
    mouseenter to show more info
*/