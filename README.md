# JS Image Slideshow

Using JavaScript to add image slideshows onto the webpages. This has been built for the slideshows on [the University of Southampton Electronics and Computer Science Society website](<https://society.ecs.soton.ac.uk>), and the style comes with the website's theme colour.

## Demo

[JS Image Slideshow Demo](https://allc.github.io/JS-Image-Slideshow/demo/)

## Setup

Include the JS Image Slideshow script and the style sheet in the html:

```HTML
<link rel="stylesheet" href="css/slideshow.css">
<script src="js/slideshow.js"></script>
```

## Usage

In the application code, create a slideshow like this:

```JavaScript
var imagePaths = ['images/0.png', 'images/1.png', 'images/2.png'];
var slideshowOptions = {
    interval: 3000,
    transition: 'fadeIn'
};
new Slideshow(document.getElementById('slideshow-container'), imagePaths, slideshowOptions);
```

## Options
`interval`: the timeout between images, a number represent time in ms, default `5000`

`control`: if show the control buttons, `true` or `false`, default `true`

`transition`: transition effect, `null` or `'fadeIn'`, default `null`

## Requirements

JS Image Slideshow has zero dependences.

## License

Licensed under the [MIT](https://github.com/allc/JS-Image-Slideshow/blob/master/LICENSE) license.
