
export class UF<T extends number>{

  private id: T[] = []

  find(v: T): T {
    if (this.id[v] == undefined) {
      this.id[v] = v;
    }

    if (v !== this.id[v]) {
      this.id[v] = this.find(this.id[v])
    }
    return this.id[v]
  }

  union(v: T, w: T) {

    let p_v = this.find(v)
    let p_w = this.find(w)


    if (p_v === v) {
      this.id[p_w] = p_v
    }
    else if (p_w === w) {
      this.id[p_v] = p_w
    }
    else if (v < w) {
      this.id[v] = w;
    }
    else {
      this.id[w] = v;
    }

  }

  connected(v: T, w: T): boolean {
    let p_v = this.find(v)
    let p_w = this.find(w)
    return p_v === p_w
  }

}