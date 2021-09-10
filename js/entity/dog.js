class Dog {
  constructor(pos) {
    this.pos = pos;
    this.laughAnimationFrame = 0;
    this.timeSinceLaughFrame = 0;

    this.animationTime = 0;
    this.laughTime = 2;
    this.catchTime = 3;
    this.isLaughing = false;
    this.isCatching = false;

    this.moveAmount = 170;
  }

  update(dt, game) {}

  render(dt, draw) {
    if (this.isLaughing) {
      this.timeSinceLaughFrame += dt;
      this.animationTime += dt;
      if (this.timeSinceLaughFrame > 0.20) {
        this.timeSinceLaughFrame = 0;
        this.laughAnimationFrame = 1 - this.laughAnimationFrame;
      }

      let heightAngle = (Math.PI * this.animationTime) / this.laughTime;
      draw.img(
        this.laughAnimationFrame == 0
          ? images["dogLaugh1"]
          : images["dogLaugh2"],
        this.pos.x,
        this.pos.y - this.moveAmount * Math.sin(heightAngle) 
      );
      if (this.animationTime > this.laughTime) {
        this.isLaughing = false;
      }
    } else if (this.isCatching) {
      this.animationTime += dt;
      let heightAngle = (Math.PI * this.animationTime) / this.catchTime;
      draw.img(
        images["dogCatch"],
        this.pos.x,
        this.pos.y - this.moveAmount * Math.sin(heightAngle)
      );
      if (this.animationTime > this.catchTime) {
        this.isCatching = false;
      }
    }
  }

  doLaugh() {
    if (this.isLaughing || this.isCatching) {
      return;
    }
    this.animationTime = 0;
    this.isLaughing = true;
  }

  doCatch() {
    if (this.isLaughing || this.isCatching) {
      return;
    }
    this.animationTime = 0;
    this.isCatching = true;
  }
}
