import { Comparable } from "./types";



class Edge<T> implements Comparable<Edge<T>> {

  constructor(private v: T, private w: T, private weight: number) {

  }

  either() {
    return this.v;
  }

  other() {
    return this.w;
  }

  getWeight() {
    return this.weight;
  }

  compareTo(b: Edge<T>): number {
    throw new Error("Method not implemented.");
  }


}


export class EdgeWeightGraph {

  private adj: Map<any, any> = new Map();
  private E: number = 0;

  constructor(private V: number) { }


  addEdge<K>(e: Edge<K>) {
    let v = e.either(), w = e.other();
    this.adj.get(v).add(e)
    this.adj.get(w).add(e)
    this.E++;
  }

  getAdj(k: any) {
    return this.adj.get(k);
  }

}


(function () {

  




})()

