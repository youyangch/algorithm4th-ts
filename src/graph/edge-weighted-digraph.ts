import { readline } from "../io";


export class DirectedEdge<T> {

  constructor(private v: T, private w: T, private weight: number) { }

  from(): T {
    return this.v;
  }

  to(): T {
    return this.w;
  }

  getWeight(): number {
    return this.weight;
  }

}

export class EdgeWeightedDigraph {

  private adj: Map<any, DirectedEdge<number>[]> = new Map();
  private E: number = 0;

  constructor(private V: number) { }

  addEdge<T extends number>(e: DirectedEdge<T>) {

    if (!this.adj.has(e.from())) {
      this.adj.set(e.from(), [e])
    }
    else {
      this.adj.get(e.from())?.push(e)
    }

    this.E++;
  }

  getV(){
    return this.V;
  }

  getAdj() {
    return this.adj;
  }

  getEdges(k: any) {
    return this.adj.get(k);
  }

}
