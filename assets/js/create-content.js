import { createTable } from './create-table';

var navLinksTemplate = require('../../templates/pagination-links.handlebars'),
    previous = document.querySelectorAll('.js-previous'),
    next = document.querySelectorAll('.js-next'),
    first = document.querySelectorAll('.js-nav-first'),
    last = document.querySelectorAll('.js-nav-last'),
    pagination = document.querySelectorAll('.pagination'),
    appendLInksTo,
    currentPage = 0;

/*
* Export function to be used by other scripts
* parameters array repositories, integer numberOfPages
*/
export function createContent(repositories, numberOfPages) {

  //create links on page load
  createLinks(currentPage, numberOfPages);

  //give click event listeners to the link of the first page
  for (let i = 0; i < first.length; i++) {
     first[i].addEventListener('click', () => {
         currentPage = 0;
         createLinks(currentPage, numberOfPages);
     });
  }

  //give click event listeners to the link of the last page
  for (let i = 0; i < last.length; i++) {
     last[i].addEventListener('click', () => {
         currentPage = numberOfPages - 1;
         createLinks(currentPage, numberOfPages);
     });
     last[i].children[0].children[0].innerHTML = numberOfPages;
  }

  //give click event listeners to previous navigation links
  for (let i = 0; i < previous.length; i++) {
     previous[i].addEventListener('click', () => {
         if (currentPage < 1)
           return;

         currentPage--;
         createLinks(currentPage, numberOfPages);
     });
  }

  //give click event listeners to next navigation links
  for (let i = 0; i < next.length; i++) {
     next[i].addEventListener('click', () => {
         if (currentPage >= numberOfPages - 1)
           return;

         currentPage++;
         createLinks(currentPage, numberOfPages);
     });
  }

  // function to be called on clicking the page links
  function pageLinks() {
    currentPage = this.dataset.page -1;
    createLinks(currentPage, numberOfPages);
  }

  //toggle active class on links based on the current page
  // params integer currentPage, array links
  function activeState(currentPage, links) {
    for (let i = 0; i < links.length; i++) {
       links[i].classList.remove('active');
    }

    var idNumber = currentPage + 1;
    var activeLink = document.querySelectorAll('.page-' + idNumber);
    for (let i = 0; i < activeLink.length; i++) {
       activeLink[i].className = 'active';
    }

    previous.disabled = currentPage < 1;
    next.disabled = currentPage >= numberOfPages - 1;
  }

  // create only 3 links at the time along with the first and the last page links
  // parameters integer currentPage, integer numberOfPages
  function createLinks(currentPage, numberOfPages) {

    var end,
        start,
        pagesCutOff = 3,
        page = currentPage + 1,
        ceiling = Math.ceil(pagesCutOff / 2),
        floor = Math.floor(pagesCutOff / 2);

    // toggle the visibility of the first and the last page link, based on the current page
    toggleNavsVisibility(page);

    // set the start and the end for the loop when creating the navigation links
    if (numberOfPages < pagesCutOff) {
        end = numberOfPages;
        start = 0;
    } else if (page >= 1 && page <= ceiling) {
        end = pagesCutOff;
        start = 0;
    } else if ((page + floor) >= numberOfPages) {
        start = (numberOfPages - pagesCutOff);
        end = numberOfPages;
    } else {
        start = (page - ceiling);
        end = (page + floor);
    }

    var liElements = document.querySelectorAll('.js-page-nav');

    // remove all old links if they exist before creating new ones
    if (liElements != null) {
      for(let i = 0; i < liElements.length; i++){
        liElements[i].parentNode.removeChild(liElements[i]);
      }
    }

    // create new navigation links
    for(let i = end; i > start; i--){
      var link = navLinksTemplate({ pageNumber: i });
      for(let j = 0; j < appendLInksTo.length; j++){
        appendLInksTo[j].insertAdjacentHTML('afterend', link);
      }
    }

    var links = document.querySelectorAll('.page-links');

    // add event listeners to new links
    for(let i = 0; i < links.length; i++){
      links[i].addEventListener('click', pageLinks);
    }

    // create table and update active state based on currentPage
    createTable(repositories, currentPage);
    activeState(currentPage, links);
  }

  // toggle visibility of the first and the last page links, as well as the dots element
  function toggleNavsVisibility(page) {
    var navFirst = document.querySelectorAll('.js-nav-first'),
        navLast = document.querySelectorAll('.js-nav-last'),
        navDotsStart = document.querySelectorAll('.js-navdots-start'),
        navDotsLast = document.querySelectorAll('.js-navdots-end'),
        visibilityOffsetNavs = 1,
        visibilityOffsetDots = 2;

    if (page -visibilityOffsetNavs > 1) {
      appendLInksTo = navFirst;
      for(let i = 0; i < navFirst.length; i++){
        navFirst[i].style.display = 'inline';
      }
    }
    else {
      appendLInksTo = document.querySelectorAll('.js-append-links');
      for(let i = 0; i < navFirst.length; i++){
        navFirst[i].style.display = 'none';
      }
    }

    if (page - visibilityOffsetDots > 1) {
      appendLInksTo = navDotsStart;
      for(let i = 0; i < navFirst.length; i++){
        navDotsStart[i].style.display = 'inline';
      }
    }
    else {
      for(let i = 0; i < navFirst.length; i++){
        navDotsStart[i].style.display = 'none';
      }
    }

    if (page + visibilityOffsetNavs >= numberOfPages) {
      for(let i = 0; i < navFirst.length; i++){
        navLast[i].style.display = 'none';
      }
    }
    else {
      for(let i = 0; i < navFirst.length; i++){
        navLast[i].style.display = 'inline';
      }
    }

    if (page + visibilityOffsetDots >= numberOfPages) {
      for(let i = 0; i < navFirst.length; i++){
        navDotsLast[i].style.display = 'none';
      }
    }
    else {
      for(let i = 0; i < navFirst.length; i++){
        navDotsLast[i].style.display = 'inline';
      }
    }
  }
}
