import Effects from "./lib/effects";

interface Options {
    target?: Array<string> | string,
    clickEffect?: boolean
}

export default class SmartGallery {

    private options: Options = {
        target: [
            '#html-smart-gallery'
        ],
        clickEffect: true
    };

    constructor(options?: Options | false | true) {
        if (options === false)
            return this;
        
        Object.assign(this.options, options);
        this.findTarget();
        return this;
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
                    this.addListeners(<HTMLElement>el);
                });
            });
    }

    private definitionElement(element: HTMLElement){

        if (element.tagName === 'IMG')
            this.addListeners(element);
        else{
            let child = element.querySelectorAll('img');
            child.forEach(element=>{
                this.addListeners(element);
            })
        }
    }

    private addListeners(element: HTMLElement) {
        element.style.cursor = 'pointer';

        if (this.options.clickEffect)
            Effects.click(element);

        element.addEventListener('click', e => {

        })
    }

    public setOptions(options: Options) {
        Object.assign(this.options, options);
        this.findTarget();
        return this;
    }


}

let SG = () => {
    new SmartGallery();
};

export {SG}
