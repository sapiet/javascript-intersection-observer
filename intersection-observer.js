class InViewportObserver {
    visibleItems = [];
    items = [];
    current;

    constructor(containerIdentifier, elementsIdentifier, threshold, callback) {
        this.containerIdentifier = containerIdentifier;
        this.elementsIdentifier = elementsIdentifier;
        this.threshold = threshold;
        this.callback = callback;
    }

    observe() {
        this.observer = new IntersectionObserver(observables => {
            for (const observable of observables) {
                if (observable.intersectionRatio > this.threshold) {
                    if (this.getVisibleItemIndex(observable) === -1) {
                        this.visibleItems.push(observable);
                    }
                } else {
                    const index = this.getVisibleItemIndex(observable);

                    if (index > -1) {
                        this.visibleItems.splice(index, 1);
                    }
                }
            }

            this.visibleItems.sort(
                (a, b) => Array.from(this.items).indexOf(a.target) > Array.from(this.items).indexOf(b.target) ? 1 : -1
            );

            if (this.visibleItems.length > 0) {
                if (this.visibleItems[0].target.getAttribute('id') !== this.current) {
                    this.current = this.visibleItems[0].target.getAttribute('id');

                    this.callback(this.visibleItems[0]);
                }
            }
        }, {
            root: document.querySelector(this.containerIdentifier),
            threshold: [this.threshold]
        });

        this.items = document.querySelectorAll(this.containerIdentifier + ' ' + this.elementsIdentifier);

        this.items.forEach(item => this.observer.observe(item));
    }

    unobserve() {
        this.items.forEach(item => this.observer.unobserve(item));
    }

    getVisibleItemIndex = function(observable) {
        for (const i in this.visibleItems) {
            if (observable.target.getAttribute('id') === this.visibleItems[i].target.getAttribute('id')) {
                return i;
            }
        }

        return -1;
    }
}
