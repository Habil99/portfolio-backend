"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeValidatorErrors = void 0;
const normalizeValidatorErrors = (errors) => {
    return errors.map(error => {
        return {
            property: error.property,
            messages: Object.values(error.constraints).join(', ')
        };
    });
};
exports.normalizeValidatorErrors = normalizeValidatorErrors;
