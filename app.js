"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("./lib/effects");
var SmartGallery = /** @class */ (function () {
    function SmartGallery(options) {
        this.options = {
            target: [
                '#html-smart-gallery'
            ],
            clickEffect: true
        };
        if (options === false)
            return this;
        Object.assign(this.options, options);
        this.findTarget();
        return this;
    }
    SmartGallery.prototype.findTarget = function () {
        var _this = this;
        var target;
        if (typeof this.options.target === 'string') {
            target = document.querySelectorAll(this.options.target);
            target.forEach(function (value) {
                _this.definitionElement(value);
            });
        }
        else
            this.options.target.forEach(function (value) {
                target = document.querySelectorAll(value);
                target.forEach(function (el) {
                    _this.addListeners(el);
                });
            });
    };
    SmartGallery.prototype.definitionElement = function (element) {
        var _this = this;
        if (element.tagName === 'IMG')
            this.addListeners(element);
        else {
            var child = element.querySelectorAll('img');
            child.forEach(function (element) {
                _this.addListeners(element);
            });
        }
    };
    SmartGallery.prototype.addListeners = function (element) {
        element.style.cursor = 'pointer';
        if (this.options.clickEffect)
            effects_1.default.click(element);
        element.addEventListener('click', function (e) {
        });
    };
    SmartGallery.prototype.setOptions = function (options) {
        Object.assign(this.options, options);
        this.findTarget();
        return this;
    };
    return SmartGallery;
}());
exports.default = SmartGallery;
var SG = function () {
    new SmartGallery();
};
exports.SG = SG;
