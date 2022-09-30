"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickSort = void 0;
function quickSort(array, cmp) {
    const partition = (array, start, end) => {
        let pivot = array[start];
        let i = start + 1;
        let j = end;
        while (i <= j) {
            if (array[i] < pivot) {
                i++;
            }
            else {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                j--;
            }
        }
        let temp = array[i - 1];
        array[i - 1] = array[start];
        array[start] = temp;
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
let a = [1, 12, 8, 39, 34, 45, 459];
console.log(quickSort(a));
