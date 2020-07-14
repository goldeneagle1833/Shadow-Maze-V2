let maze = [];

class VisionTest {
  constructor(pos, direction) {
    this.pos = createVector(150, 100);
    this.dir = createVector(0, 1); //p5.Vector.fromAngle(direction);
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
    line(0, 0, this.dir.x * 100, this.dir.y * 100);
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

function setup() {
  createCanvas(1000, 1000);
  background(0);
  noStroke();
  fill(100);
  randomWall = new Boundary(300, 100, 300, 300);
  randomline = new VisionTest(100, 200);
  ///////
  // Timer works just commited to simplify
  ///////
  let counter = 0;
  let timerLife = 60;

  const stopTime = setInterval(timeIt, 1000);

  let timer = document.getElementById("timer");

  function timeIt() {
    counter++;

    timerLife - counter;

    timer.innerHTML = `${counter}`;

    if (counter == timerLife) {
      clearInterval(stopTime);
      //alert("Game Over");
      location.reload();
    }
  }
  /////////
  // Maze
  ////////
  //wall = new Boundary(x1, y1, x2, y2)
  wallOne = new Boundary(25, 25, 25, 975);
  wallTwo = new Boundary(25, 975, 25, 25);
  wallThree = new Boundary(975, 975, 25, 975);
  wallFour = new Boundary(25, 900, 975, 975);
  insideWallOne = new Boundary(100, 100, 25, 250);
  insideWallTwo = new Boundary(25, 250, 325, 325);
  insideWallThree = new Boundary(250, 250, 325, 575);
  insideWallFour = new Boundary(600, 100, 250, 250);
  insideWallFive = new Boundary(325, 325, 325, 500);
  insideWallSix = new Boundary(650, 250, 575, 575);
  insideWallSeven = new Boundary(650, 650, 575, 750);
  insideWallEight = new Boundary(725, 725, 575, 925);
  insideWallNine = new Boundary(500, 650, 750, 750);
  insideWallTen = new Boundary(650, 650, 975, 825);
  insideWallEleven = new Boundary(975, 725, 925, 925);
  wrongWayOne = new Boundary(325, 900, 325, 325);
  wrongWayTwo = new Boundary(975, 675, 250, 250);
  wrongWayThree = new Boundary(900, 900, 850, 325);
  wrongWayFour = new Boundary(825, 325, 500, 500);
  wrongWayFive = new Boundary(725, 825, 575, 575);
  wrongWaySix = new Boundary(825, 825, 850, 400);
  wrongWaySeven = new Boundary(650, 100, 825, 825);
  wrongWayEight = new Boundary(425, 100, 750, 750);
  wrongWayNine = new Boundary(400, 825, 400, 400);
  wrongWayTen = new Boundary();
  wrongWayUpOne = new Boundary(675, 675, 250, 100);
  wrongWayUpTwo = new Boundary(675, 900, 100, 100);
  wrongWayUpThree = new Boundary(600, 600, 250, 100);
  wrongWayUpFour = new Boundary(400, 600, 100, 100);
  wrongWayUpFive = new Boundary(100, 325, 100, 100);
  wrongWayUpSix = new Boundary(325, 325, 175, 100);
  wrongWayUpSeven = new Boundary(400, 400, 175, 100);
  wrongWayLeftOne = new Boundary(500, 500, 750, 650)
  wrongWayLeftTwo = new Boundary(425, 425, 750, 650)
  wrongWayLeftThree= new Boundary(100, 100, 750, 400)
  wrongWayLeftFour = new Boundary(425, 175, 650, 650)
  wrongWayLeftFive = new Boundary(175, 175, 650, 400)
  wrongWayLeftSix = new Boundary(500, 575, 650, 650)
  wrongWayLeftSeven = new Boundary(100, 100, 900, 825)
  wrongWayLeftEight = new Boundary(575, 100, 900, 900)



  winningWall = new Boundary(875, 995, 995, 995);
  maze.push(
    winningWall,
    wallOne,
    wallTwo,
    wallThree,
    wallFour,
    insideWallOne,
    insideWallTwo,
    insideWallEight,
    insideWallThree,
    insideWallFour,
    insideWallFive,
    insideWallSix,
    insideWallSeven,
    insideWallNine,
    insideWallTen,
    insideWallEleven,
    wrongWayOne,
    wrongWayTwo,
    wrongWayThree,
    wrongWayFour,
    wrongWayFive,
    wrongWaySix,
    wrongWaySeven,
    wrongWayEight,
    wrongWayNine,
    wrongWayTen,
    wrongWayUpOne,
    wrongWayUpThree,
    wrongWayUpTwo,
    wrongWayUpFive,
    wrongWayUpFour,
    wrongWayUpSix,
    wrongWayUpSeven,
    wrongWayLeftOne,
    wrongWayLeftTwo, 
    wrongWayLeftThree, 
    wrongWayLeftFour, 
    wrongWayLeftFive, 
    wrongWayLeftSeven,
    wrongWayLeftSix,
    wrongWayLeftEight,
    wrongWayLeftSeven
  );

  // trying to import the boundaries so it all wouldnt be so messy
  //   for (let index = 0; index < walls.length; index++) {
  //     const element = new Boundary(walls[index]);
  //     console.log(element)
  //     return element
  //   }

  player = new Redplayer();
  playerTwo = new Blueplayer();
}

function draw() {
  background(0);

  /////////////
  // Player one movement
  /////////////////
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-2, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.move(2, 0);
  } else if (keyIsDown(UP_ARROW)) {
    player.move(0, -2);
  } else if (keyIsDown(DOWN_ARROW)) {
    player.move(0, 2);
  }

  ///////////
  // Player two movement
  //////////
  if (keyIsDown(65)) {
    playerTwo.move(-2, 0);
  } else if (keyIsDown(68)) {
    playerTwo.move(2, 0);
  } else if (keyIsDown(87)) {
    playerTwo.move(0, -2);
  } else if (keyIsDown(83)) {
    playerTwo.move(0, 2);
  }
  //////////
  // Draws all the walls
  ///////////
  for (let wall of maze) {
    wall.show();
  }
  ////////////
  // Draws the players and their vision
  ////////////
  player.show(50, 40, 255, 0, 0);
  playerTwo.show(50, 40, 0, 0, 255);

  //let pts = player.cast(randomWall)
  //////////
  // check rays aganst the walls
  /////////
  player.lookAtWalls(maze);
  playerTwo.lookAtWalls(maze);
  //////////
  // testing
  /////////
  //randomline.show();
  //randomWall.show();

  //player.lookAtSimple(randomWall)
  //player.lookAtSimple(maze)

  //randomline.lookAt(mouseX, mouseY);

  //let pt = randomline.cast(randomWall);
  //if (pt) {
  // ellipse(pt.x, pt.y, 8, 8);
  //}
}

////////
// Rules
////////
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

////////
// Controls
////////
const con = document.getElementById("control");
// Get the button that opens the modal
const bttn = document.getElementById("cont");
// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("closes")[0];
// When the user clicks on the button, open the modal
bttn.onclick = function () {
  con.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
spans.onclick = function () {
  con.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == con) {
    con.style.display = "none";
  }
};
