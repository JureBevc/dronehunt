class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  fillStyle(style) {
    this.ctx.fillStyle = style;
  }

  rect(x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
  }

  img(image, x, y, w, h) {
    this.ctx.drawImage(image, x, y, w, h);
  }

  img(image, x, y) {
    this.ctx.drawImage(image, x, y);
  }

  text(text, x, y, size, align) {
    this.ctx.font = size + "px myFont";
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}
