export default class Effects {

    public static click(element:HTMLElement){
        let originalWidth = element.offsetWidth;


        element.addEventListener('mousedown', e => {
            element.style.width = `${originalWidth - 10}px`;
            element.style.paddingLeft = '5px';
            element.style.marginRight = '5px';
            element.style.paddingBottom = '5px';
            element.style.transition = '.1s';

            console.log(e.target);
        });

        element.addEventListener('mouseup', e => {
            element.style.width = '';
            element.style.paddingLeft = '';
            element.style.marginRight = '';
            element.style.paddingBottom = '';

        });
    }
}
