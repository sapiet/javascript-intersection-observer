const threshold = 0.8;

let visibleItems = [];
var current;

let getVisibleItemIndex = function(observable) {
	for (const i in visibleItems) {
		if (observable.target.getAttribute('id') === visibleItems[i].target.getAttribute('id')) {
			return i;
		}
	}

	return -1;
}

const visibleItemsSort = function(a, b) {
	const sections = document.querySelectorAll('section');

	return Array.from(sections).indexOf(a.target) > Array.from(sections).indexOf(b.target) ? 1 : -1;
}

let observer = new IntersectionObserver(observables => {
	for (const observable of observables) {
		if (observable.intersectionRatio > threshold) {
			if (getVisibleItemIndex(observable) === -1) {
				visibleItems.push(observable);
			}
		} else {
			const index = getVisibleItemIndex(observable);

			if (index > -1) {
				visibleItems.splice(index, 1);
			}
		}
	}

	visibleItems.sort(visibleItemsSort);

	if (visibleItems.length > 0) {
		if (visibleItems[0].target.getAttribute('id') !== current) {
			current = visibleItems[0].target.getAttribute('id');

			log(visibleItems[0].target.getAttribute('id'));
		}
	}

	/*log('', true);
	for (item of visibleItems) {
		log(item.target.getAttribute('id'));
	}*/
}, {
	root: document.querySelector('#container'),
	threshold: [threshold]
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
