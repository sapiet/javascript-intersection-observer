const inViewportObserver = new InViewportObserver(
    '#container',
    'section',
    0.8,
    observables => console.log(observables[0].target.getAttribute('id'))
);

inViewportObserver.observe();
