
export class UF {

  private id: number[] = []

  find(v: number) {
    if (this.id[v] == undefined) {
      this.id[v] = v;
    }

    if (v !== this.id[v]) {
      this.id[v] = this.find(this.id[v])
    }
    return this.id[v]
  }

  union(v: number, w: number) {

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

  connected(v: number, w: number): boolean {
    let p_v = this.find(v)
    let p_w = this.find(w)
    return p_v === p_w
  }

}