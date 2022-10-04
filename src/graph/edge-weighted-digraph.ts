import { readline } from "../io";


export class DirectedEdge<T> {

  constructor(private v: T, private w: T, private weight: number) { }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }

  getWeight() {
    return this.weight;
  }

}

export class EdgeWeightDigraph {

  private adj: Map<any, any[]> = new Map();
  private E: number = 0;

  constructor(private V: number) { }

  addEdge<T>(e: DirectedEdge<T>) {

    if (!this.adj.has(e.from())) {
      this.adj.set(e.from(), [e])
    }
    else {
      this.adj.get(e.from())?.push(e)
    }

    this.E++;
  }

  getAdj() {
    return this.adj;
  }

  getEdges(k: any) {
    return this.adj.get(k);
  }

}
