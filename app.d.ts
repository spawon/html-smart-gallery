interface Options {
    target?: Array<string> | string;
    clickEffect?: boolean;
}
export default class SmartGallery {
    private options;
    constructor(options?: Options | false | true);
    private findTarget;
    private definitionElement;
    private addListeners;
    setOptions(options: Options): this;
}
declare let SG: () => void;
export { SG };
