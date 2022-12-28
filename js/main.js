
// var words = document.getElementsByClassName('word');
// var wordArray = [];
// var currentWord = 0;

// words[currentWord].style.opacity = 1;
// for (var i = 0; i < words.length; i++) {
//   splitLetters(words[i]);
// }

// function changeWord() {
//   var cw = wordArray[currentWord];
//   var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
//   for (var i = 0; i < cw.length; i++) {
//     animateLetterOut(cw, i);
//   }
  
//   for (var i = 0; i < nw.length; i++) {
//     nw[i].className = 'letter behind';
//     nw[0].parentElement.style.opacity = 1;
//     animateLetterIn(nw, i);
//   }
  
//   currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
// }

// function animateLetterOut(cw, i) {
//   setTimeout(function() {
// 		cw[i].className = 'letter out';
//   }, i*45);
// }

// function animateLetterIn(nw, i) {
//   setTimeout(function() {
// 		nw[i].className = 'letter in';
//   }, 340+(i*45));
// }

// function splitLetters(word) {
//   var content = word.innerHTML;
//   word.innerHTML = '';
//   var letters = [];
//   for (var i = 0; i < content.length; i++) {
//     var letter = document.createElement('span');
//     letter.className = 'letter';
//     letter.innerHTML = content.charAt(i);
//     word.appendChild(letter);
//     letters.push(letter);
//   }
  
//   wordArray.push(letters);
// }

// changeWord();
// setInterval(changeWord, 3500);

// window.addEventListener('scroll', function () {
//   const navbar = document.querySelector('.site-header');
//   navbar.classList.toggle('abajo', window.scrollY > 0);
// })

// {
//   class SliderClip {
//     constructor(el) {
//       this.el = el;
//       this.Slides = Array.from(this.el.querySelectorAll("li"));
//       this.Nav = Array.from(this.el.querySelectorAll("div a"));
//       this.totalSlides = this.Slides.length;
//       this.current = 0;
//       this.autoPlay = true;
//       this.timeTrans = 4000;
//       this.IndexElements = [];

//       for (let i = 0; i < this.totalSlides; i++) {
//         this.IndexElements.push(i);
//       }

//       this.setCurret();
//       this.initEvents();
//     }
//     setCurret() {
//       this.Slides[this.current].classList.add("current");
//       this.Nav[this.current].classList.add("current_dot");
//     }
//     initEvents() {
//       const self = this;

//       this.Nav.forEach((dot) => {
//         dot.addEventListener("click", (ele) => {
//           ele.preventDefault();
//           this.changeSlide(this.Nav.indexOf(dot));
//         });
//       });

//       this.el.addEventListener("mouseenter", () => (self.autoPlay = false));
//       this.el.addEventListener("mouseleave", () => (self.autoPlay = true));

//       setInterval(function () {
//         if (self.autoPlay) {
//           self.current =
//             self.current < self.Slides.length - 1 ? self.current + 1 : 0;
//           self.changeSlide(self.current);
//         }
//       }, this.timeTrans);
//     }
//     changeSlide(index) {
//       this.Nav.forEach((allDot) => allDot.classList.remove("current_dot"));

//       this.Slides.forEach((allSlides) =>
//         allSlides.classList.remove("prev", "current")
//       );

//       const getAllPrev = (value) => value < index;

//       const prevElements = this.IndexElements.filter(getAllPrev);

//       prevElements.forEach((indexPrevEle) =>
//         this.Slides[indexPrevEle].classList.add("prev")
//       );

//       this.Slides[index].classList.add("current");
//       this.Nav[index].classList.add("current_dot");
//     }
//   }

//   const slider = new SliderClip(document.querySelector(".slider"));
// }

var slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

function slide(wrapper, items, prev, next) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add("loaded");

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });
  next.addEventListener("click", function () {
    shiftSlide(1);
  });

  // Transition events
  items.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);
