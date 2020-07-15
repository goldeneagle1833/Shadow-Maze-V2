class Vision {
  constructor(pos, direction) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(direction);
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 1, this.dir.y * 1);
    pop();
  }
  //   rayCheck(x,y) {
  //       this.pos.set(x,y)
  //   }

  //cast is need because the when drawing the players visions needs to be shown from players postion to the wall of the maze and that is done by checking the vector created against all of the walls in the maze

  //cast is using line line intersection formula found https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

  //this section is directly from this time stamp
  //https://youtu.be/TOEi6T2mtHo?t=609

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

class Redplayer {
  constructor() {
    this.position = createVector(50, 50);
    this.positionX = this.position.x;
    this.positionY = this.position.y;
    this.rays = [];
    for (let angle = 0; angle < 360; angle += 8) {
      this.rays.push(new Vision(this.position, radians(angle)));
    }
  }

  lookAtSimple(maze) {
    for (let ray of this.rays) {
      const pt = ray.cast(maze);
      if (pt) {
        line(this.position.x, this.position.y, pt.x, pt.y);
      }
    }
  }

  lookAtWalls(maze) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of maze) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.position, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        fill(255, 0, 0);
        ellipse(closest.x, closest.y, 5);
      }
    }
  }

  move(x, y) {
    this.position.add(x, y);
  }

  show(x, y, c1, c2, c3) {
    fill(c1, c2, c3);
    ellipse(this.position.x, this.position.y, 10);

    for (let ray of this.rays) {
      ray.show();
    }
  }

  getPositionX() {
    let xpos = this.position.x;
    return xpos;
  }
  getPositionY() {
    let ypos = this.position.y;
    return ypos;
  }

  /*
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
      }*/
}
class Blueplayer {
  constructor() {
    this.position = createVector(75, 50);
    this.rays = [];
    this.positionX = this.position.x;
    this.positionY = this.position.y;
    for (let angle = 0; angle < 360; angle += 8) {
      this.rays.push(new Vision(this.position, radians(angle)));
    }
  }

  lookAtSimple(maze) {
    for (let ray of this.rays) {
      const pt = ray.cast(maze);
      if (pt) {
        line(this.position.x, this.position.y, pt.x, pt.y);
      }
    }
  }

  lookAtWalls(maze) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of maze) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.position, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        fill(0, 0, 255);
        ellipse(closest.x, closest.y, 5);
      }
    }
  }

  move(x, y) {
    this.position.add(x, y);
  }

  show(x, y, c1, c2, c3) {
    fill(c1, c2, c3);
    ellipse(this.position.x, this.position.y, 10);

    for (let ray of this.rays) {
      ray.show();
    }
  }
  getPositionX() {
    let newX = this.position.x
   // console.log(newX)
    return newX
  }
  getPositionY() {
    let newY = this.position.y
    //console.log(newY)
    return newY
  }

  
  /*
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
        }*/
}
