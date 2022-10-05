
import { readline } from "../io";
import { MinPriorityQueue, UF } from "../list";
import { Edge, EdgeWeightGraph } from "./edge-weighted-graph";

/**
 * Kruskal
 * 基于并查集, 连结最小的有效横切边
 */
export class KruskalMST<VERTEX extends number> {

  private uf: UF<VERTEX>= new UF();
  private pq: MinPriorityQueue<Edge<VERTEX>> = new MinPriorityQueue();
  private mst: Edge<VERTEX>[] = []


  constructor(private graph: EdgeWeightGraph<VERTEX>) {
    this.algo()
  }

  private algo() {

    for (let [_, edges] of this.graph.getAdj()) {
      edges.forEach(e => this.pq.insert(e))
    }


    while (this.pq.size() > 1) {

      let min: Edge<VERTEX> = this.pq.deleteMin()!

      let v = min.either()
      let w = min.other()

      if (!this.uf.connected(v, w)) {
        this.mst.push(min)
        this.uf.union(v, w)
      }
    }

  }

  weight() {
    return this.mst.reduce((pre, cur) => (pre + cur.getWeight()), 0)
  }

}
