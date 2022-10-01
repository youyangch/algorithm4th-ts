"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = void 0;
function mergeSort(array, cmp) {
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
    const _merge = (array, start, end) => {
        if (start >= end)
            return;
        let mid = Math.floor((end + start) / 2);
        // [start,end]
        _merge(array, start, mid);
        _merge(array, mid + 1, end);
        let aux = [];
        for (let i = start; i <= end; i++) {
            aux[i] = array[i];
        }
        let i = start;
        let j = mid + 1;
        for (let k = start; k <= end; k++) {
            if (i > mid) {
                array[k] = aux[j++];
            }
            else if (j > end) {
                array[k] = aux[i++];
            }
            else if (less(i, j)) {
                array[k] = aux[i++];
            }
            else {
                array[k] = aux[j++];
            }
        }
    };
    _merge(array, 0, array.length - 1);
    return array;
}
exports.mergeSort = mergeSort;
