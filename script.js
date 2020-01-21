let observer = new IntersectionObserver(observables => {
	for (const observable of observables) {
		console.log(observable);
		if (observable.isIntersecting) {
			log(observable.target.getAttribute('id'), true);
			return;
		}
	}
}, {
	root: document.querySelector('#container'),
	threshold: [0]
});

let items = document.querySelectorAll('section');

items.forEach(item => observer.observe(item));

var log = function(text, clear) {
	const element = document.createElement('div');

	element.innerHTML = text;

	if (clear) {
		document.querySelector('#log').innerHTML = '';
	}

	document.querySelector('#log').appendChild(element);
}
