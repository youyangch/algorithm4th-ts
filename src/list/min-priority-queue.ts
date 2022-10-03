
import { EdgeWeightGraph, Edge } from "../graph";
import { readline } from "../io";
import { Comparable } from "../types";

export class MinPriorityQueue<T extends Comparable<T>>  {


  insert(e: T) {

    let len = this.pq.length;
    this.pq[len] = e;
    this.swim(len)
  }

  private less(i: number, j: number) {

    if (this.pq[i] == undefined || this.pq[j] == undefined) return false;

    return this.pq[i].compareTo(this.pq[j]) < 0;
  }


  private greater(i: number, j: number) {

    if (this.pq[i] == undefined || this.pq[j] == undefined) return false;

    return this.pq[i].compareTo(this.pq[j]) > 0;
  }

  private exch(i: number, j: number) {
    let temp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = temp;
  }

  private swim(i: number) {
    let k = i;
    while (k > 1) {
      let upper = Math.floor(k / 2)

      if (this.less(k, upper)) {
        this.exch(k, upper)
      }

      k = upper
    }
  }

  deleteMin(): T | null {
    if (this.size() < 1) return null;

    let min = this.pq[1]
    let end = this.pq[this.pq.length - 1]

    this.pq[1] = end;

    this.pq.pop()
    this.sink(1)

    return min;
  }

  private sink(i: number) {

    let k = i;
    while (2 * k < this.pq.length) {
      let lower = 2 * k;

      if (this.greater(k, lower) || this.greater(k, lower + 1)) {

        if (this.greater(lower, lower + 1)) {
          this.exch(k, lower + 1)
          k = lower + 1;
          continue;
        }
        else {
          this.exch(k, lower)
          k = lower;
          continue;
        }
      }

      k = lower;
    }
  }

  size() {
    return this.pq.length;
  }

  private pq: T[] = ["placeholder" as any]
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

  let pq = new MinPriorityQueue()

  for (let [key, edges] of weight_graph.getAdj()) {
    edges.forEach(edge => { pq.insert(edge) })
  }

  let len = pq.size()
  for (let a = 1; a < len; a++) {
    let min = pq.deleteMin()
    console.log(min)
  }

})

