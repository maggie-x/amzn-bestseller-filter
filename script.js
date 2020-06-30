// ==UserScript==
// @name         Amazon BestSeller Filter
// @namespace    https://www.amazon.com/Best-Sellers*
// @version      0.1
// @description  Filter Amazon Best Sellers
// @author       Maggie Xu
// @match        https://www.amazon.com/Best-Sellers-*
// @grant        none
// ==/UserScript==



function gradeItem(i, reviewCount, starCount) {
    if (starCount < 4.0) {
            i.style.backgroundColor = "#cccccc";
            i.style.opacity = "0.2";
        return;
    }

    if (reviewCount > 10000) {
        i.style.backgroundColor = "#ffc033";
        return;
    }
    if (reviewCount > 5000) {
        i.style.backgroundColor = "#ffff4c";
        return;
    }

}

(function() {
    'use strict';

    // Your code here...
    const listOfItems = document.querySelector('#zg-ordered-list').childNodes;

    listOfItems.forEach(i => {
        i.style.height = "400px";

        const targetInfo = i.querySelector('.a-icon-row');
        if (!targetInfo || !targetInfo.children) {
            return;
        }

        // get information
        const [stars, reviews] = targetInfo.children;
        const ratingStr = stars.title;
        const starCount = parseFloat((ratingStr).substring(0, ratingStr.indexOf(" out of 5 stars")));
        const reviewCount = parseInt((reviews.innerText).replace(/,/g, ''));


        // conditions
        gradeItem(i, reviewCount, starCount);

        // create element for exact star rating
        const exactRatingNode = document.createElement('div');
        exactRatingNode.innerText = `${starCount}`;
        exactRatingNode.setAttribute('style', "color: #ff7100; font-size: x-large; padding: 10px 0px; font-weight: bold;");
        stars.appendChild(exactRatingNode);

        // increase font size of no. of reviews
        reviews.classList.replace("a-size-small", "a-size-medium");


    });
})();
