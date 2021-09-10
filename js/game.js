class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw = new Draw(this.canvas, this.ctx);

    //
    this.dog = new Dog(new Vec(this.draw.width / 2, this.draw.height - 200));
    this.drones = [];
    this.timePassed = 0;
    this.score = 0;
    this.shotsLeft = 3;
    this.gameOver = false;
  }

  startGame() {
    let gameObject = this;
    window.loadImages(function () {
      gameObject.oldTime = Date.now();
      window.requestAnimationFrame(gameObject.loop.bind(gameObject));
    });
  }

  loop() {
    var currentTime = Date.now();
    let deltaTime = (currentTime - this.oldTime) / 1000;
    this.oldTime = currentTime;

    this.update(deltaTime);
    this.render(deltaTime);
    window.requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    this.timePassed += dt;

    if (this.gameOver) {
      if(pressedKeyCodes.includes(82)){
        this.reset();
      }
    } else {
      this.gameplayLogic(dt);
    }

    this.dog.update(dt);

    pressedKeyCodes = []
    mouseDown = false;
    mouseUp = false;
  }

  render(dt) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw.fillStyle("#00bfff");
    this.draw.rect(0, 0, this.draw.width, this.draw.height);

    // Entities
    for (let i = 0; i < this.drones.length; i++) {
      this.drones[i].render(dt, this.draw);
    }

    this.dog.render(dt, this.draw)

    // Front grass
    this.draw.img(images["back"], 0, 0, this.draw.width, this.draw.height);

    // UI
    this.draw.img(
      images["UIscore"],
      this.draw.width - 400,
      this.draw.height - 150
    );
    this.draw.fillStyle("#ffffff");
    this.draw.text(
      "" + this.score,
      this.draw.width - 90,
      this.draw.height - 88,
      50,
      "right"
    );

    this.draw.img(images["UIshoot"], 100, this.draw.height - 150);
    for (let i = 0; i < this.shotsLeft; i++) {
      this.draw.img(images["UIbullet"], 128 + i * 40, this.draw.height - 135);
    }

    if(this.gameOver){
      this.draw.fillStyle("#ffffff");
      this.draw.text(
        "Game Over!",
        this.draw.width/2,
        this.draw.height/2,
        40,
        "center"
      );
      this.draw.text(
        "Press 'R' to restart.",
        this.draw.width/2,
        this.draw.height/2 + 50,
        40,
        "center"
      );
    }

    // Cursor
    this.draw.img(images["cursor"], mousePos.x - 25, mousePos.y - 25)
  }

  spawnDrone() {
    let sizeMul = Math.max(0.7, 1 - this.timePassed * 0.01);

    let speed = Math.min(300 + this.timePassed * 10, 1200);
    console.log(speed);
    let randomRot =
      (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4 + Math.random() - 0.5);
    let vel = new Vec(Math.sin(randomRot), Math.cos(randomRot)).mul(speed);
    vel.y = -Math.abs(vel.y);

    this.drones.push(
      new Drone(
        new Vec(Math.floor(Math.random() * (this.draw.width - 200)), 600),
        new Vec(200, 86).mul(sizeMul),
        vel
      )
    );
  }

  gameplayLogic(dt) {
    if (this.drones.length <= 0) {
      this.spawnDrone();
    }

    let droneWasShot = false;
    for (let i = 0; i < this.drones.length; i++) {
      this.drones[i].update(dt, this);

      if (this.drones[i].shotThisFrame) {
        droneWasShot = true;
      }

      if (this.drones[i].toremove) {
        this.drones.splice(i, 1);
        i--;
      }
    }

    if (mouseDown) {
      if (droneWasShot) {
        this.score += 5;
        playHit();
      } else {
        this.shotsLeft -= 1;
        this.dog.doLaugh();
        playMiss();
      }
    }

    if (this.shotsLeft <= 0) {
      this.gameOver = true;
    }
  }

  reset(){

    this.drones = []
    this.timePassed = 0;
    this.score = 0;
    this.shotsLeft = 3;
    this.gameOver = false;
  }
}
