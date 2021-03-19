(function() {
    
    const actions = {
        Flies(key) {
            if(key){
                document.querySelector('[data-index="3"] .fly').style.transform = 'translate('+(window.innerWidth * 0.05)+'px, '+(-window.innerHeight * 0.05)+'px)';
            } else {
                document.querySelector('[data-index="3"] .fly').style.transform = 'translate(0px, 0px)';
            }
        },
        Flies2(key) {
            if(key){
                document.querySelector('[data-index="6"] .fly').style.transform = 'translate('+(window.innerWidth * 0.05)+'px, '+(-window.innerHeight * 0.05)+'px)';
            } else {
                document.querySelector('[data-index="6"] .fly').style.transform = 'translate(0px, 0px)';
            }
        }
    };

    const stepElems = document.querySelectorAll(".step");
    const graphicElems = document.querySelectorAll(".graphic-item");
    let currentItem = graphicElems[0];
    let ioIndex;

    const io = new IntersectionObserver(function(entries, observer) {
        ioIndex = entries[0].target.dataset.index * 1;
    });

    for(let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);
        }
    }

    window.addEventListener("scroll", function() {
        let step;
        let boundingRect;

        // for(let i = 0; i < stepElems.length; i++){
        for(let i = ioIndex - 1; i < ioIndex + 2; i++){
            step = stepElems[i];
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();

            if((boundingRect.top > window.innerHeight * 0.1) &&
                (boundingRect.top < window.innerHeight * 0.8)){

                    inactivate(currentItem.dataset.action);
                    currentItem = graphicElems[step.dataset.index];
                    activate(currentItem.dataset.action);
                }

        }

    });

    window.addEventListener('load', function() {
        setTimeout(function() {
            scrollTo(0, 0);
        }, 10);
    });

    activate();

})();