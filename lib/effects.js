"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Effects = /** @class */ (function () {
    function Effects() {
    }
    Effects.click = function (element) {
        var originalWidth = element.offsetWidth;
        element.addEventListener('mousedown', function (e) {
            element.style.width = originalWidth - 10 + "px";
            element.style.paddingLeft = '5px';
            element.style.marginRight = '5px';
            element.style.paddingBottom = '5px';
            element.style.transition = '.1s';
            console.log(e.target);
        });
        element.addEventListener('mouseup', function (e) {
            element.style.width = '';
            element.style.paddingLeft = '';
            element.style.marginRight = '';
            element.style.paddingBottom = '';
        });
    };
    return Effects;
}());
exports.default = Effects;
