var doc = document,
	body = doc.body,
	a = TweenMax;

var shape = doc.getElementById('st0'),
	svg = shape.parentNode,
	wrap = doc.getElementsByClassName('wrap')[0];

var paths = [
	'M27.7,13.1v13.6c-0.7,0.5-1.4,1-2.3,1.4c-0.9,0.5-1.8,0.9-2.9,1.2s-2.2,0.6-3.4,0.9c-1.2,0.2-2.5,0.3-3.9,0.3c-2.5,0-4.6-0.3-6.5-1c-1.8-0.7-3.4-1.7-4.6-3c-1.2-1.3-2.1-2.9-2.7-4.7c-0.6-1.8-0.9-3.9-0.9-6.1c0-2.3,0.3-4.5,0.9-6.3S3,5.8,4.2,4.5c1.2-1.3,2.7-2.3,4.5-3c1.8-0.7,3.8-1,6.1-1c2,0,3.8,0.3,5.3,0.8c1.5,0.5,2.8,1.2,3.8,2.1c1,0.9,1.8,1.9,2.4,3.1c0.6,1.2,1,2.4,1.2,3.7l-9.1,0.8c-0.2-1-0.6-1.8-1.2-2.2c-0.6-0.4-1.4-0.6-2.4-0.6c-1.7,0-3,0.6-3.8,1.7c-0.8,1.1-1.2,3-1.2,5.6c0,2.7,0.4,4.6,1.3,5.8c0.9,1.2,2.4,1.8,4.5,1.8c1.4,0,2.6-0.2,3.6-0.6V20h-3.8v-6.9H27.7z',
	'M0.5,8.3V0.5h25v7.8h-8v20.8H8.5V8.3H0.5z',
	'M20.2,0v7.2H8.9v4.7h10.7V19H8.9v9.6H0V0H20.2z',
	'M8.1,29c-1.8-0.7-3.3-1.7-4.5-2.9c-1.2-1.3-2.1-2.8-2.7-4.7C0.3,19.5,0,17.4,0,15.1s0.3-4.4,0.9-6.3s1.5-3.4,2.8-4.8c1.2-1.3,2.7-2.3,4.6-3S12.1,0,14.5,0c2.3,0,4.4,0.3,6.1,1c1.8,0.7,3.3,1.7,4.5,2.9c1.2,1.3,2.1,2.8,2.7,4.7s0.9,3.9,0.9,6.2s-0.3,4.4-0.9,6.3s-1.5,3.5-2.8,4.8c-1.2,1.3-2.7,2.3-4.5,3S16.7,30,14.3,30C12,30,9.9,29.7,8.1,29z M19.4,15c0-4.8-1.7-7.2-5-7.2c-3.3,0-5,2.4-5,7.2c0,4.8,1.7,7.2,5,7.2C17.7,22.2,19.4,19.8,19.4,15z'
]

var colors = [
	0x3D8CD0,
	0xD32A7B,
	0x2AD37A,
	0xE8E321
]

var ease = Power4.easeInOut,
	speed = 1.6,
	ww = window.innerWidth,
	distance = ww/2-svg.getBoundingClientRect().width,
	current = 1;

function start(){
	
	a.to(shape, speed, {
		morphSVG: {shape:paths[current], shapeIndex: 3},
		stroke: colors[current],
		ease: ease
	});
	a.to(svg, speed, {
		x: '+='+distance,
		ease: ease,
		onUpdate: function(){
			createElement();
		},
		onComplete: function(){
			removeElements();
			current = current == 3 ? 0 : current+1;
		}
	})
	move();
}
start();

function move(){
	a.to(wrap, speed, {
		x: '-='+distance,
		ease: ease,
		onComplete: start
	})
}
// morph.to(shape, 1.2, {morphSVG: {shape:'M0.5,8.3V0.5h25v7.8h-8v20.8H8.5V8.3H0.5z', shapeIndex:3}, x: '+=50vw', ease:Power4.easeInOut});


function createElement(path) {
  var tmp = svg.cloneNode(true);
  tmp.getElementsByTagName('path')[0].removeAttribute('id');
  wrap.insertBefore(tmp, wrap.firstChild);
}

function removeElements(){
	[].slice.call(wrap.children).reverse().forEach(function(element, i){
		if (i !== wrap.children.length-1) {
			setTimeout(function(){
				wrap.removeChild(element);
			}, 8 * i)
		}
		
	});
   
}