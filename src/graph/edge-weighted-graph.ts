import { Comparable } from "../types";
import { readline } from "../io";



export class Edge<T> implements Comparable<Edge<T>> {

  constructor(private v: T, private w: T, private weight: number) {

  }

  either(): T {
    return this.v;
  }

  other(): T {
    return this.w;
  }

  getWeight(): number {
    return this.weight;
  }

  compareTo(b: Edge<T>): number {
    return this.weight - b.weight;
  }


}


export class EdgeWeightGraph {

  private adj: Map<any, any[]> = new Map();
  private E: number = 0;

  constructor(private V: number) { }


  addEdge<K>(e: Edge<K>) {
    let v = e.either(), w = e.other();

    if (!this.adj.has(v)) {
      this.adj.set(v, [e])
    }
    else {
      this.adj.get(v)?.push(e)
    }

    if (!this.adj.has(w)) {
      this.adj.set(w, [e])
    }
    else {
      this.adj.get(w)?.push(e)
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


; (async function () {



  let data: string[] = await readline('data/tinyEWG.txt')

  if (data.length == 0) throw new Error('can not read file')

  let V = parseInt(data.shift()!)
  let E = parseInt(data.shift()!)

  let weight_graph = new EdgeWeightGraph(V)

  for (let line of data) {

    let [v, w, weight] = line.split(" ").map(e => parseFloat(e))

    weight_graph.addEdge(new Edge(v, w, weight))


  }

  console.log(weight_graph)

})

