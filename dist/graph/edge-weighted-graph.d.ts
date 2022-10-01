import { Comparable } from "./types";
declare class Edge<T> implements Comparable<Edge<T>> {
    private v;
    private w;
    private weight;
    constructor(v: T, w: T, weight: number);
    either(): T;
    other(): T;
    getWeight(): number;
    compareTo(b: Edge<T>): number;
}
export declare class EdgeWeightGraph {
    private V;
    private adj;
    private E;
    constructor(V: number);
    addEdge<K>(e: Edge<K>): void;
    getAdj(k: any): any[] | undefined;
}
export {};
