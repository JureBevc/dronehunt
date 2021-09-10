class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  mul(m) {
    return new Vec(this.x * m, this.y * m);
  }
}
