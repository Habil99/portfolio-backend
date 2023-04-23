"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSocialType = void 0;
const class_validator_1 = require("class-validator");
function IsSocialType() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isSocialType",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: "Invalid social type",
            },
            validator: {
                validate(value) {
                    return typeof value === "object" && value.link && typeof value.link === "string" && value.icon && typeof value.icon === "string";
                },
            },
        });
    };
}
exports.IsSocialType = IsSocialType;
