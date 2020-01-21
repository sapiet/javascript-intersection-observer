const inViewportObserver = new InViewportObserver(
    '#container',
    'section',
    0.8,
    observable => console.log(observable.target.getAttribute('id'))
);

inViewportObserver.observe();
