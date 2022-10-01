"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickSort = void 0;
function quickSort(array, cmp) {
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
    const partition = (array, start, end) => {
        let i = start + 1;
        let j = end;
        while (i <= j) {
            if (less(i, start)) {
                i++;
            }
            else {
                exch(i, j--);
            }
        }
        exch(start, i - 1);
        return i - 1;
    };
    const _quick = (array, start, end) => {
        if (start >= end)
            return;
        let pos = partition(array, start, end);
        _quick(array, start, pos - 1);
        _quick(array, pos + 1, end);
    };
    _quick(array, 0, array.length - 1);
    return array;
}
exports.quickSort = quickSort;
