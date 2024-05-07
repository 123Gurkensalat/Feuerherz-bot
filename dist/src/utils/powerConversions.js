"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntToPower = exports.PowerToInt = void 0;
function PowerToInt(power) {
    const res = power.split(/k/gi);
    const num = parseInt(res[0].replace(',', ''));
    return num * Math.pow(1000, res.length - 1);
}
exports.PowerToInt = PowerToInt;
function IntToPower(num) {
    let suffix = '';
    if (num >= 100_000) {
        suffix = 'k';
        num /= 1_000;
    }
    else if (num >= 100_000_000) {
        suffix = 'kk';
        num /= 1_000_000;
    }
    num = parseInt(num.toString());
    return num.toString() + suffix;
}
exports.IntToPower = IntToPower;
