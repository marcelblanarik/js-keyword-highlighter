const content = document.querySelector(".content");
const instance = new Mark(content);
const className = " current";
let currentIndex;
let results;
let isNext;

const search = keyword => {
  instance.unmark();
  instance.mark(keyword, {
    element: "span",
    className: "highlight",
    diacritics: true
  });
  currentIndex = 0;
  results = content.getElementsByTagName("span");
  results[0] ? (results[0].className += className) : null;
};

const next = () => {
  if (!isNaN(currentIndex) && results.length > 0) {
    isNext = true;
    jumpTo();
    currentIndex++;
  }
};

const prev = () => {
  if (!isNaN(currentIndex) && results.length > 0) {
    isNext = false;
    jumpTo();
    --currentIndex;
  }
};

function jumpTo() {
  if (isNext) {
    console.log(currentIndex);

    results[currentIndex].className -= className;
    if (results[currentIndex + 1] != undefined) {
      results[currentIndex + 1].className += className;
      window.scroll(0, findPos(results[currentIndex + 1]));
    } else {
      currentIndex = 0;
      results[currentIndex].className += className;
      window.scroll(0, findPos(results[currentIndex]));
    }
  } else {
    if (results[currentIndex - 1] != undefined) {
      results[currentIndex].className -= className;
      results[currentIndex - 1].className += className;
      window.scroll(0, findPos(results[currentIndex - 1]));
    } else {
      results[currentIndex].className += className;
      window.scroll(0, findPos(results[currentIndex]));
    }
  }
}

const reset = () => {
  instance.unmark();
};

function findPos(obj) {
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [curtop];
  } else {
    curtop = 0;
  }
}
