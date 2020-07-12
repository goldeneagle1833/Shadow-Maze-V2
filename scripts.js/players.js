class Player {
  constructor() {
    this.position = createVector(500, 100);
    this.rays = [];
    for (let angle = 0; angle < 360; angle += 20) {
      this.rays.push(new Vision(this.position, radians(angle)));
    }
  }

  drawLines(wall) {
    for (let line of this.rays) {
      const pt = line.cast(wall);
      if (pt) {
        line(this.position.x, this.pos.y, pt.x, pt.y);
      }
    }
  }
  move(x, y) {}

  show(x, y, c1, c2, c3) {
    if (keyIsDown(LEFT_ARROW)) {
      x -= 100;
    } else if (keyIsDown(RIGHT_ARROW)) {
      x += 100;
    } else if (keyIsDown(UP_ARROW)) {
      y -= 100;
    } else if (keyIsDown(DOWN_ARROW)) {
      y += 100;
    }
    fill(c1, c2, c3);
    this.move();

    ellipse(this.position.x, this.position.y, 10);

    for (let ray of this.rays) {
      ray.show();
    }
  }
  playerPostion(x, y) {
    this.pos.set(x, y);
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;
    // walls defining points

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;
    // the players vision is define in rays and is defined by the line segmint pulse the angle of the ray

    const denOfFormula = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    //this if statment is need to show if the ray and the wall is perfectly parrell
    if (denOfFormula == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denOfFormula;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denOfFormula;

    //The intersection point falls within the first line segment if 0.0 ≤ t ≤ 1.0, and it falls within the second line segment if 0.0 ≤ u ≤ 1.0.

    // this if statment is checking the above comment statement
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}
