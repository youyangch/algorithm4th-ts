"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellSort = void 0;
function shellSort(array, cmp) {
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
    let gap = (len / 4) + 1;
    for (; gap >= 1; gap--) {
        for (let i = gap; i < len; i++) {
            for (let j = i; j >= gap; j -= gap) {
                if (less(j, j - gap)) {
                    exch(j, j - gap);
                }
            }
        }
    }
    return array;
}
exports.shellSort = shellSort;
