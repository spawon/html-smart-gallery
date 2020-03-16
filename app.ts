import Effects from "./lib/effects";

interface Options {
    target?: Array<string> | string,
    clickEffect?: boolean,
    fastInit?: boolean
}

interface HTMLElements {
    background: HTMLElement,
    galleryContainer: HTMLElement
}

export default class SmartGallery {

    private options: Options = {
        target: [
            '#html-smart-gallery'
        ],
        clickEffect: true,
        fastInit: true
    };

    private htmlElements: HTMLElements;

    private customEvents: Function = function () {
    };

    constructor(options?: Options | false) {
        if (options === false)
            return this;

        Object.assign(this.options, options);

        if (this.options.fastInit)
            this.findTarget();

        return this;
    }

    public setOptions(options: Options) {
        Object.assign(this.options, options);
        return this;
    }

    public setCustomEvents(events: Function) {
        this.customEvents = events;
        return this;
    }

    public init() {
        this.findTarget();
    }

    private findTarget() {
        let target;
        if (typeof this.options.target === 'string') {
            target = document.querySelectorAll(this.options.target);
            target.forEach(value => {
                this.definitionElement(<HTMLElement>value);
            });
        } else
            this.options.target.forEach(value => {
                target = document.querySelectorAll(value);
                target.forEach(el => {
                    this.definitionElement(<HTMLElement>el);
                });
            });

        this.renderElement();
    }

    private definitionElement(element: HTMLElement) {

        if (element.tagName === 'IMG')
            this.addListeners(element, 0);
        else {
            let child = element.querySelectorAll('img');
            child.forEach((element, index) => {
                this.addListeners(element, index, child);
            })

        }
    }

    private addListeners(element: HTMLElement, index: number, elementsCollection?: NodeList) {
        element.style.cursor = 'pointer';

        if (this.options.clickEffect)
            Effects.click(element);

        this.customEvents();
        window.addEventListener('DOMContentLoaded', e => {

            element.addEventListener('click', e => {
                this.open(element, index, elementsCollection);
            });
        });
    }

    renderElement() {
        let background = document.createElement('div');

        background.classList.add('html-smart-gallery-wrapper');
        background.style.position = 'fixed';
        background.style.top = '0';
        background.style.left = '0';
        background.style.alignItems = 'center';
        background.style.justifyContent = 'center';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.opacity = '0';
        background.style.display = 'none';
        background.style.background = 'rgba(0,0,0,0.5)';

        let galleryContainer = document.createElement('div');
        galleryContainer.style.display = 'flex';
        galleryContainer.style.maxWidth = '100%';


        document.querySelector('body').append(background);
        background.append(galleryContainer);


        this.htmlElements = {
            background,
            galleryContainer
        };
    }

    private galleryControl(element: HTMLElement, index: number, elementsCollection?: NodeList) {
        this.htmlElements.background.addEventListener('click', e => {
            if (e.target === this.htmlElements.background) this.close()
        });
        window.addEventListener('keydown', e => {
            switch (e.code ) {
                case 'Escape':
                    console.log(e.code);
                    this.close();
                    break;
            }
        });

    }

    private open(element: HTMLElement, index: number, elementsCollection?: NodeList) {
        this.fadeIn(this.htmlElements.background, 20);

        let curImg = document.createElement('img');

        curImg.setAttribute('src',
            element.getAttribute('data-src') ?
                element.getAttribute('data-src') :
                element.getAttribute('src'));
        curImg.style.width = '100%';
        curImg.style.boxShadow = '4px 7px 12px #313131';
        curImg.style.borderRadius = '16px';
        curImg.style.outline = 'none';


        this.htmlElements.galleryContainer.appendChild(curImg);

        this.galleryControl(element, index, elementsCollection);
    }

    private close() {

            this.htmlElements.galleryContainer.innerHTML = '';
            this.fadeOut(this.htmlElements.background, 50);



    }

    private next(element: HTMLElement, index: number, elementsCollection?: NodeList) {
    }

    private previous(element: HTMLElement, index: number, elementsCollection?: NodeList) {
    }


    private fadeIn(el: HTMLElement, speed: number) {
        let step = 1 / speed;
        let interval = setInterval(function () {
            if (+el.style.opacity >= 1)
                clearInterval(interval);

            el.style.opacity = `${+el.style.opacity + step}`;
        }, speed / 1000);
        el.style.display = 'flex'

    }

    private fadeOut(el: HTMLElement, speed: number) {
        let step = 1 / speed;
        let interval = setInterval(function () {
            if (+el.style.opacity <= 0) {
                clearInterval(interval);
                el.style.display = 'none';
            }

            el.style.opacity = `${+el.style.opacity - step}`;
        }, speed / 1000);
    }
}

let SG = () => {
    new SmartGallery();
};

export {SG}
