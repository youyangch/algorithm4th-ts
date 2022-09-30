"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSort = void 0;
function selectSort(array, cmp) {
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
        for (let j = i + 1; j < len; j++) {
            if (less(i, j)) {
                exch(j, j);
            }
        }
    }
    return array;
}
exports.selectSort = selectSort;
