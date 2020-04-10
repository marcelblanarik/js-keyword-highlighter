const content = document.querySelector(".content");
const instance = new Mark(content);
const className = " current";
let currentIndex;
let results;
let isNext;

const search = keyword => {
  instance.unmark();
  instance.mark(keyword, {
    element: "mark",
    className: "highlight",
    diacritics: true
  });
  currentIndex = 0;
  results = content.getElementsByTagName("mark");
  results[0] ? (results[0].className += className) : null;
};

const next = () => {
  if (!isNaN(currentIndex) && results.length > 0) {
    isNext = true;
    currentIndex++;
    jumpTo();
  }
};

const prev = () => {
  if (!isNaN(currentIndex) && results.length > 0) {
    isNext = false;
    --currentIndex;
    jumpTo();
  }
};

function jumpTo() {
  if (isNext) {
    if (currentIndex > results.length - 1) {
      results[currentIndex - 1].className -= className;
      currentIndex = 0;
      results[currentIndex].className += className;
      window.scroll(0, findPos(results[currentIndex]));
    } else {
      results[currentIndex - 1].className -= className;
      results[currentIndex].className += className;
      window.scroll(0, findPos(results[currentIndex]));
    }
  } else {
    if (currentIndex < 0) {
      results[currentIndex + 1].className -= className;
      currentIndex = results.length - 1;
      results[currentIndex].className += className;
      window.scroll(0, findPos(results[currentIndex]));
    } else {
      results[currentIndex + 1].className -= className;
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
