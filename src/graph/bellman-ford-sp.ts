

import { readline } from "../io";
import { DirectedEdge, EdgeWeightedDigraph, } from './edge-weighted-digraph'

/**
 * Bellman Ford
 * 无环就不能再次放松已放松过的点, 则按拓扑顺序放松所有可达的点即可
 */
export class BellmanFordSP {
  dist(v: number) {
    return this.distTo[v]
  }

  pathTo(v: number): number[] {

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
      this.distTo[v] = Number.MAX_SAFE_INTEGER
    }

    this.distTo[this.start] = 0;
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

  private relax(v: number) {

    let edges = this.digraph.getEdges(v) ?? []

    for (let edge of edges) {

      let w = edge.to()
      if (this.distTo[w] > this.distTo[v] + edge.getWeight()) {
        this.distTo[w] = this.distTo[v] + edge.getWeight()
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

  constructor(private digraph: EdgeWeightedDigraph, private start: number) {

    this.algo()
  }

  private distTo: number[] = []
  private edgeTo: number[] = []
  private queue: number[] = []
  private onQ: Set<number> = new Set()
  private count = 0;
  private hasNegetiveCycle: boolean = false;

}

; (async function () {

  let data: string[] = await readline('data/tinyEWD.txt')

  if (data.length == 0) throw new Error('can not read file')

  let V = parseInt(data.shift()!)
  let E = parseInt(data.shift()!)

  let weight_graph = new EdgeWeightedDigraph(V)

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