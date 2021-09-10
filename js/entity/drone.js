class Drone {
  constructor(pos, size, speed) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;

    this.timeDead = 0;

    this.dead = false;
    this.toremove = false;
    this.shotThisFrame = false;
  }

  update(dt, game) {
    this.shotThisFrame = false;
    if (this.dead) {
      this.timeDead += dt;
      let deadVel = new Vec(Math.sin(this.timeDead * 10) * 7, 7).mul(50).mul(dt);
      this.pos = this.pos.add(deadVel)

      if(this.pos.y > game.draw.height){
        this.toremove = true;
      }

      return;
    }

    if (mouseDown) {
      if (
        mousePos.x >= this.pos.x &&
        mousePos.x <= this.pos.x + this.size.x &&
        mousePos.y >= this.pos.y &&
        mousePos.y <= this.pos.y + this.size.y
      ) {
        this.shotThisFrame = true;
        this.dead = true;
      }
    }

    this.pos = this.pos.add(this.speed.mul(dt));
    if (this.pos.x + this.size.x >= game.draw.width) {
      this.pos.x = game.draw.width - this.size.x;
      this.speed.x = -1 * this.speed.x;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.speed.x = -1 * this.speed.x;
    }
    if (this.pos.y + this.size.y >= game.draw.height) {
      this.pos.y = game.draw.height - this.size.y;
      this.speed.y = -1 * this.speed.y;
    } else if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.speed.y = -1 * this.speed.y;
    }
  }

  render(dt, draw) {
    draw.img(this.dead ? images["droneDead"] : images["drone"], this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}
