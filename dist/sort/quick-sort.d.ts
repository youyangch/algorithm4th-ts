declare type Comparator = <T>(a: T, b: T) => number;
export declare function quickSort<T>(array: T[], cmp?: Comparator): T[];
export {};
