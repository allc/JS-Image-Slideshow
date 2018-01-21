/*
 * JS Image Slideshow
 * https://github.com/allc/JS-Image-Slideshow
 *
 * Copyright (c) 2017 Cui Jinxuan
 *
 * Licensed under the MIT license:
 * https://github.com/allc/JS-Image-Slideshow/blob/master/LICENSE
 */
function Slideshow(container, imagesPaths, options) {
    'use strict';
    var slideshow = this;

    // set default
    if (!options) {
        options = {};
    }
    if (typeof options.interval == 'undefined') {
        options.interval = 5000;
    }
    if (typeof options.control == 'undefined') {
        options.control = true;
    }
    if (typeof options.large == 'undefined') {
        options.large = false;
    }
    if (typeof options.transition == 'undefined') {
        options.transition = null;
    }
    if (typeof options.background == 'undefined') {
        options.background = false;
    }

    this.interval = options.interval;

    this.container = container;
    this.imagesPaths = imagesPaths;

    this.currentIndex = 0;
    this.isPlaying = false;

    this.container.classList.add('slideshow'); // add class to container

    // image container
    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('slideshowImageContainer');
    if (options.background) {
        this.imageContainer.classList.add('slideshowImageContainerBackground');
    }
    // images
    this.images = [];
    for (var i = 0; i < imagesPaths.length; i++) {
        var image = document.createElement('img');
        image.src = this.imagesPaths[i];
        image.classList.add('slideshowHiddenImage');
        if (options.large) {
            image.addEventListener("click", function(){slideshow.showLargeImage()});
        }

        // set transition
        switch (options.transition) {
            case 'fadeIn':
                image.classList.add('slideshowImageFadeIn');
                break;
            default:
                break;
        }
        this.imageContainer.appendChild(image);
        this.images.push(image);
    }
    // add image container
    this.container.appendChild(this.imageContainer);

    // control
    if (options.control) {
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("slideshowControl");
        // previous button
        this.previousButton = document.createElement("button");
        this.previousButton.textContent = '◂';
        this.previousButton.classList.add("slideshowButton");
        this.previousButton.addEventListener("click", function(){slideshow.nextPhoto(-1)});
        this.controlContainer.appendChild(this.previousButton);
        // pause button
        if (this.interval != 0) { // does not show pause button if interval is 0 (not automated slideshow)
            this.pauseButton = document.createElement("button");
            this.pauseButton.textContent = '||';
            this.pauseButton.classList.add("slideshowButton");
            this.pauseButton.addEventListener("click", function(){slideshow.pausePlay()});
            this.controlContainer.appendChild(this.pauseButton);
        }
        // next button
        this.nextButton = document.createElement("button");
        this.nextButton.textContent = '▸';
        this.nextButton.classList.add("slideshowButton");
        this.nextButton.addEventListener("click", function(){slideshow.nextPhoto(1)});
        this.controlContainer.appendChild(this.nextButton);
        // add control
        this.container.appendChild(this.controlContainer);
    }

    // start
    this.updateImage(this.currentIndex);
    this.startSlideshow();
}

Slideshow.prototype.updateImage = function(nextIndex, lastIndex) {
    'use strict';
    if (typeof lastIndex !== 'undefined') {
        this.images[lastIndex].classList.add("slideshowHiddenImage");
    }
    this.images[nextIndex].classList.remove("slideshowHiddenImage");
}

Slideshow.prototype.startSlideshow = function() {
    'use strict';
    if (this.interval == 0) { // slideshow is not automated if interval is 0
        return;
    }

    this.isPlaying = true;
    var slideshow = this;
    this.autoSlideshow = setInterval(function() {
        slideshow.nextPhoto(1);
    }, this.interval);
}

/*
 * Harry made the original version of this function.
 */
Slideshow.prototype.nextPhoto = function(skip) {
    'use strict';
    var lastIndex = this.currentIndex;
    this.currentIndex += skip;

    if(this.currentIndex < 0){
        this.currentIndex = this.imagesPaths.length + this.currentIndex;
    }
    if(this.currentIndex >= this.imagesPaths.length){
        this.currentIndex = this.currentIndex - this.imagesPaths.length;
    }

    this.updateImage(this.currentIndex, lastIndex);

    if (this.isPlaying) {
        // reset timer
        clearInterval(this.autoSlideshow);
        this.startSlideshow();
    }
}

Slideshow.prototype.pausePlay = function() {
    'use strict';
    if (this.isPlaying) {
        clearInterval(this.autoSlideshow);
        this.isPlaying = false;
        this.pauseButton.classList.add('slideshowButtonToggled');
    } else {
        clearInterval(this.autoSlideshow);
        this.startSlideshow();
        this.isPlaying = true;
        this.pauseButton.classList.remove('slideshowButtonToggled');
    }
}

Slideshow.prototype.showLargeImage = function() {
    'use strict';
}
