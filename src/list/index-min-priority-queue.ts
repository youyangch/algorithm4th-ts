
export class IndexMinPriorityQueue {

  insert(key: number, weight: number) {

    let len = this.pq.length

    this.pq[len] = key;
    this.qp[key] = len;
    this.weight[key] = weight

    this.swim(len)

  }

  private swim(i: number) {

    let k = i;
    while (k > 1) {

      let upper = Math.floor(k / 2)
      if (this.less(k, upper)) {
        this.exch(k, upper)
      }

      k = upper;
    }
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

  private less(i: number, j: number) {
    if (this.pq[i] == undefined || this.pq[j] == undefined) return false;
    let v = this.pq[i]
    let w = this.pq[j]
    return this.weight[v] < this.weight[w]
  }

  private greater(i: number, j: number) {
    if (this.pq[i] == undefined || this.pq[j] == undefined) return false;
    let v = this.pq[i]
    let w = this.pq[j]
    return this.weight[v] > this.weight[w]
  }

  private exch(i: number, j: number) {

    let v = this.pq[i]
    let w = this.pq[j]

    this.pq[i] = w;
    this.pq[j] = v;

    this.qp[v] = j;
    this.qp[w] = i
  }


  change(key: number, weight: number) {

    let i = this.qp[key];
    this.weight[key] = weight;

    this.swim(i)
    this.sink(i)
  }

  deleteMin() {

    if (this.size() <= 1) return;

    let minKey = this.pq[1];
    let endKey = this.pq[this.pq.length - 1]

    this.pq[1] = endKey;
    this.qp[endKey] = 1;

    this.qp[minKey] = -1;
    this.weight[minKey] = -1;


    this.pq.pop()
    this.sink(1)

    return minKey;
  }

  delete(key: number) {
    if (!this.has(key)) return;

    let i = this.qp[key];
    let endKey = this.pq[this.pq.length - 1]

    this.pq[i] = endKey;
    this.qp[endKey] = i;

    this.qp[key] = -1;
    this.weight[key] = -1;

    this.pq.pop()
    this.swim(i)
    this.sink(i)

    return true;
  }

  has(key: number) {
    return this.qp[key] != undefined
  }

  size() {
    return this.pq.length
  }

  private pq: number[] = ["placeholder" as any]
  private qp: number[] = []
  private weight: number[] = []

}
