import { Comparator } from "./types";

export function selectSort<T>(array: T[], cmp?: Comparator): T[] {

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


  let len = array.length
  for (let i = 0; i < len; i++) {

    for (let j = i + 1; j < len; j++) {
      if (less(i, j)) {
        exch(j, j)
      }
    }
  }


  return array
}