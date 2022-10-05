import { readline } from "../io";


export class DirectedEdge<VERTEX> {

  constructor(private v: VERTEX, private w: VERTEX, private weight: number) { }

  from(): VERTEX {
    return this.v;
  }

  to(): VERTEX {
    return this.w;
  }

  getWeight(): number {
    return this.weight;
  }

}

export class EdgeWeightedDigraph<VERTEX> {

  private adj: Map<VERTEX, DirectedEdge<VERTEX>[]> = new Map();
  private E: number = 0;

  constructor(private V: number) { }

  addEdge(e: DirectedEdge<VERTEX>) {

    if (!this.adj.has(e.from())) {
      this.adj.set(e.from(), [e])
    }
    else {
      this.adj.get(e.from())?.push(e)
    }

    this.E++;
  }

  getV() {
    return this.V;
  }

  getAdj() {
    return this.adj;
  }

  getEdges(k: any) {
    return this.adj.get(k);
  }

}
