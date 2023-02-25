  // On next and prev click
  function plusSlides(event) {
    let dataset = event.target.dataset;
    let slides = document.querySelectorAll('div[data-slide-name="'+dataset.slideName+'"]');
    let slideIndex = parseInt(slides[0].dataset.slideIndex);

    if (dataset.slideAction == 'next') {
      slideIndex = slideIndex + 1;
    } else {
      slideIndex = slideIndex - 1;
    }

    if (slideIndex > slides.length) { slideIndex = 1 } // when next on last slide
    if (slideIndex < 1) { slideIndex = slides.length } // when click prev on first slide

    showSlides(dataset.slideName, slideIndex);
  }

  // On dots click
  function switchSlide(event) {
    const dataset = event.target.dataset;

    showSlides(dataset.slideName, parseInt(dataset.slideIndex));
  }

  // slideName: string, value of [data-slide-name]
  // slideIndex: number, new slide index to move to
  function showSlides(slideName, slideIndex) {
    let i;
    let slides = document.querySelectorAll('div[data-slide-name="'+slideName+'"]');
    let activeSlide = slides[slideIndex-1];
    let dots = document.querySelectorAll('.dot[data-slide-name="'+slideName+'"]');

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    activeSlide.style.display = "block";
    slides[0].dataset.slideIndex = slideIndex;
    dots[slideIndex-1].className += " active";

  }

  function bootsrapSlideShow() {
    let zoomistIndex = 0;

    Array.from(document.getElementsByClassName('js-slide-dot')).forEach(function(element) {
      element.addEventListener('click', switchSlide);
    });


    Array.from(document.getElementsByClassName('js-slide-action')).forEach(function(element) {
      element.addEventListener('click', plusSlides);
    });

    // A recursive function that will init zoomiest
    // in all element with [data-zoomist-src]
    // at the end of slide group, call showSlides
    // it's important that everything run in correct order.
    function buildSlideShow() {
      const zoomists = document.querySelectorAll('[data-zoomist-src]:not([id])');
      const element = zoomists[0];
      const nextElement = zoomists[1];

      zoomistIndex = zoomistIndex + 1;

      if (element) {
        element.id = 'zoomist-' + zoomistIndex;
        new Zoomist('#' + element.id, {
          height: '75%',
          slider: true,
          zoomer: true,
          on: {
            ready: function() {
              if (
                !nextElement ||
                (element.parentElement.dataset.slideName != nextElement.parentElement.dataset.slideName)
              ) {
                showSlides(element.parentElement.dataset.slideName, 1)
              }
              buildSlideShow()
            }
          }
        });
      }
    }

    buildSlideShow();
  }

  bootsrapSlideShow();
