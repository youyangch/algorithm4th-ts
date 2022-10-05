import { readline } from "../io";
import { IndexMinPriorityQueue } from "../list";
import { DirectedEdge, EdgeWeightedDigraph, } from './edge-weighted-digraph'



export class DijkstraSP {

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

  private relax(v: number) {

    let edges = this.digraph.getEdges(v) ?? []

    for (let edge of edges) {

      let w = edge.to() as number;

      if (this.distTo[w] > this.distTo[v] + edge.getWeight()) {
        this.distTo[w] = this.distTo[v] + edge.getWeight()
        this.edgeTo[w] = v;

        if (this.ipq.has(w)) {
          this.ipq.change(w, this.distTo[w])
        }
        else {
          this.ipq.insert(w, this.distTo[w])
        }
      }

    }


  }


  private algo() {

    // init
    for (let v = 0; v < this.digraph.getV(); v++) {
      this.distTo[v] = Number.MAX_SAFE_INTEGER
    }
    this.distTo[this.start] = 0;
    this.ipq.insert(this.start, 0)

    while (this.ipq.size() > 1) {
      let min = this.ipq.deleteMin()
      if (min !== undefined) {
        this.relax(min)
      }
    }
  }

  constructor(private digraph: EdgeWeightedDigraph<number>, private start: number) {

    this.algo()
  }

  private ipq = new IndexMinPriorityQueue
  private distTo: number[] = []
  private edgeTo: number[] = []

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


  let dijkstra = new DijkstraSP(weight_graph, 0)

  let has_path = dijkstra.hasPathTo(6)
  let path = dijkstra.pathTo(6) // [ 0, 2, 7, 3, 6 ]
  let dist = dijkstra.dist(6) // 1.51

  console.log(dist, has_path, path)
})()