"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleSort = void 0;
function bubbleSort(array, cmp) {
    const less = (i, j) => {
        if (cmp) {
            if (cmp(array[i], array[j]) < 0)
                return true;
            else
                return false;
        }
        return array[i] < array[j];
    };
    const exch = (i, j) => {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    };
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (less(j, j + 1)) {
                exch(j, j + 1);
            }
        }
    }
    return array;
}
exports.bubbleSort = bubbleSort;
