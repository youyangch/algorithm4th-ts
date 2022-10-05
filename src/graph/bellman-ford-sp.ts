

import { readline } from "../io";
import { DirectedEdge, EdgeWeightedDigraph, } from './edge-weighted-digraph'

/**
 * Bellman Ford
 * 无环就不能再次放松已放松过的点, 则按拓扑顺序放松所有可达的点即可
 */
export class BellmanFordSP <VERTEX extends number>{
  dist(v: VERTEX) {
    return this.distTo[v]
  }

  pathTo(v: VERTEX): VERTEX[] {

    let start = v;
    let path = [v]
    while (start != this.edgeTo[start]) {
      if (this.edgeTo[start] == undefined) return [];
      start = this.edgeTo[start]
      path.unshift(start)
    }

    return path;
  }

  hasPathTo(v: number): boolean {

    let start = v;
    while (start != this.edgeTo[start]) {
      if (this.edgeTo[start] == undefined) return false;
      start = this.edgeTo[start]
    }

    return true;
  }


  private algo() {

    for (let v = 0; v < this.digraph.getV(); v++) {
      this.distTo[v] = Number.MAX_SAFE_INTEGER as VERTEX
    }

    this.distTo[this.start] = 0 as VERTEX;
    this.queue.push(this.start)
    this.onQ.add(this.start)

    while (this.queue.length && !this.hasNegetiveCycle) {

      let min = this.queue.shift()
      if (min !== undefined) {
        this.relax(min)
        this.onQ.delete(min)
      }
    }

  }

  private relax(v: VERTEX) {

    let edges = this.digraph.getEdges(v) ?? []

    for (let edge of edges) {

      let w = edge.to()
      if (this.distTo[w] > this.distTo[v] + edge.getWeight()) {
        this.distTo[w]  = this.distTo[v] + edge.getWeight() as VERTEX
        this.edgeTo[w] = v;

        if (!this.onQ.has(w)) {
          this.queue.push(w)
          this.onQ.add(w)
        }
      }
    }

    if (++this.count % this.digraph.getV() == 0) {
      this.hasNegetiveCycle = true;
    }

  }

  constructor(private digraph: EdgeWeightedDigraph<VERTEX>, private start: VERTEX) {

    this.algo()
  }

  private distTo: VERTEX[] = []
  private edgeTo: VERTEX[] = []
  private queue: VERTEX[] = []
  private onQ: Set<VERTEX> = new Set()
  private count = 0;
  private hasNegetiveCycle: boolean = false;

}

; (async function () {

  let data: string[] = await readline('data/tinyEWD.txt')

  if (data.length == 0) throw new Error('can not read file')

  let V = parseInt(data.shift()!)
  let E = parseInt(data.shift()!)

  let weight_graph: EdgeWeightedDigraph<number> = new EdgeWeightedDigraph(V)

  for (let line of data) {

    let [v, w, weight] = line.split(" ").map(e => parseFloat(e))

    weight_graph.addEdge(new DirectedEdge(v, w, weight))
  }


  let dijkstra = new BellmanFordSP(weight_graph, 0)

  let has_path = dijkstra.hasPathTo(6)
  let path = dijkstra.pathTo(6) // [ 0, 2, 7, 3, 6 ]
  let dist = dijkstra.dist(6) // 1.51

  console.log(dist, has_path, path)
})()