import { MinPriorityQueue } from '../list'
import { EdgeWeightGraph, Edge } from './edge-weighted-graph'

/**
 * Prim 
 * 基于已经连通的点的边, 不断加入有效的横切边(pq中包含失效的横切边)
 * 加权图的任意切分, 权重最小的横切边一定属于最小生成树
 */
export class LazyPrimMST<VERTEX> {

  private pq: MinPriorityQueue<Edge<VERTEX>> = new MinPriorityQueue()
  private mst: Edge<VERTEX>[] = [];
  private marked = new Set();

  constructor(private graph: EdgeWeightGraph<VERTEX>, private start: any) {

    this.algo()
  }

  private algo() {

    this.marked.add(this.start)
    this.graph.getEdges(this.start)?.forEach(e => {
      this.pq.insert(e)
    })

    while (this.pq.size() > 1) {

      let min = this.pq.deleteMin()

      let v = min?.either()
      let w = min?.other()

      if (this.marked.has(v) && this.marked.has(w)) continue;

      if (!this.marked.has(v)) {
        this.marked.add(v)
        this.graph.getEdges(v)?.forEach(e => {
          this.pq.insert(e)
        })
      }

      if (!this.marked.has(w)) {
        this.marked.add(w)
        this.graph.getEdges(w)?.forEach(e => {
          this.pq.insert(e)
        })
      }

      this.mst.push(min!)
    }
  }


  weight() {
    return this.mst.reduce((a, b) => (a + b.getWeight()), 0)
  }

}

