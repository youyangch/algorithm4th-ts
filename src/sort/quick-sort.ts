
type Comparator = (a: any, b: any) => number;


export function quickSort<T>(array: T[], cmp?: Comparator): T[] {

  const less = (i: number, j: number): boolean => {

    if (cmp) {
      if (cmp(array[i], array[j]) < 0) return true;
      else return false;
    }

    return array[i] < array[j]
  }

  const exch = (i: number, j: number): boolean => {

    let temp = array[i]
    array[i] = array[j]
    array[j] = temp

    return true;
  }

  const partition = (array: T[], start: number, end: number): number => {
    let i = start + 1;
    let j = end;

    while (i <= j) {
      if (less(i, start)) {
        i++
      }
      else {
        exch(i, j--)
      }
    }

    exch(start, i - 1)

    return i - 1;
  }

  const _quick = (array: T[], start: number, end: number) => {
    if (start >= end) return;

    let pos = partition(array, start, end)

    _quick(array, start, pos - 1)
    _quick(array, pos + 1, end)

  }

  _quick(array, 0, array.length - 1)

  return array
}


