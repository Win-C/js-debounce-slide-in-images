"use strict";

const sliderImages = document.querySelectorAll('.slide-in');

/** Function runs whenever user scrolls */
function checkSlide(evt) {
  sliderImages.forEach(sliderImage => {
    // get pixel level when each image should be slid in at (halfway thru image)
    const slideInAt = (
      (window.scrollY + window.innerHeight) - sliderImage.height / 2
    );
    // get bottom of image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

/** Function controls how many times checkSlide runs 
 *  Wait every 20seconds 
 *  debounce is a common function in librairies like Lodash
*/
function debounce(func, wait = 20, immediate = true) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

window.addEventListener('scroll', debounce(checkSlide));
