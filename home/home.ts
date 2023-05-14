// Slider function

const getClass = (function () {
    const cache = {} as { [key: string]: HTMLCollectionOf<Element> };

    return function (className: string): HTMLCollectionOf<Element> {
        if (cache[className])
            return cache[className];

        cache[className] = document.getElementsByClassName(className);
        return cache[className];
    };
})();

const getQuerySelector = (function () {
    const cache = {} as { [key: string]: NodeListOf<Element> };

    return function (querySelector: string): NodeListOf<Element> {
        if (cache[querySelector])
            return cache[querySelector];

        cache[querySelector] = document.querySelectorAll(querySelector);
        return cache[querySelector];
    };
})();

(function () {
    let canStartNewAnimation = true;

    const DURATION = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--slide-duration'));
    const LAST_SLIDE = 4;
    let active_slide = 1;

    const chapter_container = getClass("chapter-container")[0] as HTMLElement;
    const forwards_button = getClass("forwards-button")[0];
    const backwards_button = getClass("backwards-button")[0];

    forwards_button.addEventListener("click", function () {
        if (!canStartNewAnimation)
            return;

        canStartNewAnimation = false;

        if (active_slide == LAST_SLIDE)
            active_slide = 1;
        else
            active_slide++;
        
        chapter_container.style.transform = `translateX(-${(active_slide - 1) * 100}%)`;

        setTimeout(() => {
            canStartNewAnimation = true;
        }, DURATION);
    });

    backwards_button.addEventListener("click", function () {
        if (!canStartNewAnimation)
            return;

        canStartNewAnimation = false;

        if (active_slide == 1)
            active_slide = LAST_SLIDE;
        else
            active_slide--;
        
        chapter_container.style.transform = `translateX(-${(active_slide - 1) * 100}%)`;

        setTimeout(() => {
            canStartNewAnimation = true;
        }, DURATION);
    });
})()