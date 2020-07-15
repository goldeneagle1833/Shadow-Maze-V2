let maze = [];
let movementSpeed = 2;
let ifHit = 5;
let hit = false; // winner wall

let hitWallOne = false;
let hitwallTwo = false;
let hitwallThree = false;
let hitwallFour = false;
let hitinsideWallOne = false;
let hitinsideWallTwo = false;
let hitinsideWallEight = false;
let hitinsideWallThree = false;
let hitinsideWallFour = false;
let hitinsideWallFive = false;
let hitinsideWallSix = false;
let hitinsideWallSeven = false;
let hitinsideWallNine = false;
let hitinsideWallTen = false;
let hitinsideWallEleven = false;
let hitwrongWayOne = false;
let hitwrongWayTwo = false;
let hitwrongWayThree = false;
let hitwrongWayFour = false;
let hitwrongWayFive = false;
let hitwrongWaySix = false;
let hitwrongWaySeven = false;
let hitwrongWayEight = false;
let hitwrongWayNine = false;
let hitwrongWayTen = false;
let hitwrongWayUpOne = false;
let hitwrongWayUpThree = false;
let hitwrongWayUpTwo = false;
let hitwrongWayUpFive = false;
let hitwrongWayUpFour = false;
let hitwrongWayUpSix = false;
let hitwrongWayUpSeven = false;
let hitwrongWayLeftOne = false;
let hitwrongWayLeftTwo = false;
let hitwrongWayLeftThree = false;
let hitwrongWayLeftFour = false;
let hitwrongWayLeftFive = false;
let hitwrongWayLeftSeven = false;
let hitwrongWayLeftSix = false;
let hitwrongWayLeftEight = false;

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
  //////
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
      alert("Game Over");
      if (alert) {
        location.reload();
      }
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
  wrongWayTen = new Boundary(); //////
  wrongWayUpOne = new Boundary(675, 675, 250, 100);
  wrongWayUpTwo = new Boundary(675, 900, 100, 100);
  wrongWayUpThree = new Boundary(600, 600, 250, 100);
  wrongWayUpFour = new Boundary(400, 600, 100, 100); ///
  wrongWayUpFive = new Boundary(100, 325, 100, 100); ///
  wrongWayUpSix = new Boundary(325, 325, 175, 100);
  wrongWayUpSeven = new Boundary(400, 400, 175, 100);
  wrongWayLeftOne = new Boundary(500, 500, 750, 650);
  wrongWayLeftTwo = new Boundary(425, 425, 750, 650);
  wrongWayLeftThree = new Boundary(100, 100, 750, 400);
  wrongWayLeftFour = new Boundary(425, 175, 650, 650);
  wrongWayLeftFive = new Boundary(175, 175, 650, 400);
  wrongWayLeftSix = new Boundary(500, 575, 650, 650);
  wrongWayLeftSeven = new Boundary(100, 100, 900, 825);
  wrongWayLeftEight = new Boundary(575, 100, 900, 900);

  winningWall = new Boundary(875, 995, 995, 995);
  maze.push(
    winningWall, //0
    wallOne, //1
    wallTwo, //2
    wallThree, //3
    wallFour, //4
    insideWallOne, //5
    insideWallTwo, //6
    insideWallEight, //7
    insideWallThree, //8
    insideWallFour, //9
    insideWallFive, //10
    insideWallSix, //11
    insideWallSeven, //12
    insideWallNine, //13
    insideWallTen, //14
    insideWallEleven, //15
    wrongWayOne, //16
    wrongWayTwo, //17
    wrongWayThree, //18
    wrongWayFour, //19
    wrongWayFive, //20
    wrongWaySix, //21
    wrongWaySeven, //22
    wrongWayEight, //23
    wrongWayNine, //24
    wrongWayTen, //25
    wrongWayUpOne, //26
    wrongWayUpThree, //27
    wrongWayUpTwo, //28
    wrongWayUpFive, //29
    wrongWayUpFour, //30
    wrongWayUpSix, //31
    wrongWayUpSeven, //32
    wrongWayLeftOne, //33
    wrongWayLeftTwo, //34
    wrongWayLeftThree, //35
    wrongWayLeftFour, //36
    wrongWayLeftFive, //37
    wrongWayLeftSeven, //38
    wrongWayLeftSix, //39
    wrongWayLeftEight //40
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
  // playerTwo.getPositionX()
  // playerTwo.getPositionY()
  /////////////
  // Player one movement
  /////////////////
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-movementSpeed, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.move(movementSpeed, 0);
  }
  if (keyIsDown(UP_ARROW)) {
    player.move(0, -movementSpeed);
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.move(0, movementSpeed);
  }

  ///////////
  // Player two movement
  //////////
  if (keyIsDown(65)) {
    playerTwo.move(-movementSpeed, 0);
  }
  if (keyIsDown(68)) {
    playerTwo.move(movementSpeed, 0);
  }
  if (keyIsDown(87)) {
    playerTwo.move(0, -movementSpeed);
  }
  if (keyIsDown(83)) {
    playerTwo.move(0, movementSpeed);
  }
  //////////
  // Draws all the walls
  ///////////
  for (let wall of maze) {
    wall.show();
  }
  ////////////
  // Draws the players
  ////////////
  player.show(50, 40, 255, 0, 0);
  playerTwo.show(50, 40, 0, 0, 255);

  //////////
  // check rays aganst the walls
  /////////
  player.lookAtWalls(maze);
  playerTwo.lookAtWalls(maze);
  //////////
  //hit dectection for player one
  //////////
  hit = collideLineCircle(
    maze[0].a.x,
    maze[0].a.y,
    maze[0].b.x,
    maze[0].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hit) {
    alert("Player One WINS! They did it in " + timer.innerHTML + ' seconds!');
    location.reload()
  }

  hitWallOne = collideLineCircle(
    maze[1].a.x,
    maze[1].a.y,
    maze[1].b.x,
    maze[1].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );

  if (hitWallOne) {
    player.move(ifHit, 0);
  }

  hitwallTwo = collideLineCircle(
    maze[2].a.x,
    maze[2].a.y,
    maze[2].b.x,
    maze[2].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwallTwo) {
    player.move(0, ifHit);
  }
  hitwallThree = collideLineCircle(
    maze[3].a.x,
    maze[3].a.y,
    maze[3].b.x,
    maze[3].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwallThree) {
    player.move(-ifHit, 0);
  }
  hitwallFour = collideLineCircle(
    maze[4].a.x,
    maze[4].a.y,
    maze[4].b.x,
    maze[4].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwallFour) {
    player.move(0, -ifHit);
  }

  hitinsideWallOne = collideLineCircle(
    maze[5].a.x,
    maze[5].a.y,
    maze[5].b.x,
    maze[5].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallOne) {
    player.move(ifHit, 0);
  }

  hitinsideWallTwo = collideLineCircle(
    maze[6].a.x,
    maze[6].a.y,
    maze[6].b.x,
    maze[6].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallTwo) {
    player.move(0, -ifHit);
  }
  hitinsideWallEight = collideLineCircle(
    maze[7].a.x,
    maze[7].a.y,
    maze[7].b.x,
    maze[7].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallEight) {
    player.move(ifHit);
  }
  hitinsideWallThree = collideLineCircle(
    maze[8].a.x,
    maze[8].a.y,
    maze[8].b.x,
    maze[8].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallThree) {
    player.move(ifHit, 0);
  }
  hitinsideWallFour = collideLineCircle(
    maze[9].a.x,
    maze[9].a.y,
    maze[9].b.x,
    maze[9].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallFour) {
    player.move(0, -ifHit);
  }
  hitinsideWallFive = collideLineCircle(
    maze[10].a.x,
    maze[10].a.y,
    maze[10].b.x,
    maze[10].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallFive) {
    player.move(ifHit, 0);
  }
  hitinsideWallSix = collideLineCircle(
    maze[11].a.x,
    maze[11].a.y,
    maze[11].b.x,
    maze[11].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallSix) {
    player.move(0, -ifHit);
  }
  hitinsideWallSeven = collideLineCircle(
    maze[12].a.x,
    maze[12].a.y,
    maze[12].b.x,
    maze[12].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallSeven) {
    player.move(-ifHit, 0);
  }
  hitinsideWallNine = collideLineCircle(
    maze[13].a.x,
    maze[13].a.y,
    maze[13].b.x,
    maze[13].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallNine) {
    player.move(0, -ifHit);
  }
  hitinsideWallTen = collideLineCircle(
    maze[14].a.x,
    maze[14].a.y,
    maze[14].b.x,
    maze[14].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallTen) {
    player.move(-ifHit, 0);
  }

  hitinsideWallEleven = collideLineCircle(
    maze[15].a.x,
    maze[15].a.y,
    maze[15].b.x,
    maze[15].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitinsideWallEleven) {
    player.move(0, -ifHit);
  }
  hitwrongWayOne = collideLineCircle(
    maze[16].a.x,
    maze[16].a.y,
    maze[16].b.x,
    maze[16].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayOne) {
    player.move(0, ifHit);
  }
  hitwrongWayTwo = collideLineCircle(
    maze[17].a.x,
    maze[17].a.y,
    maze[17].b.x,
    maze[17].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayTwo) {
    player.move(0, -ifHit);
  }
  hitwrongWayThree = collideLineCircle(
    maze[18].a.x,
    maze[18].a.y,
    maze[18].b.x,
    maze[18].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayThree) {
    player.move(-ifHit, 0);
  }
  hitwrongWayFour = collideLineCircle(
    maze[19].a.x,
    maze[19].a.y,
    maze[19].b.x,
    maze[19].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayFour) {
    player.move(0, -ifHit);
  }

  hitwrongWayFive = collideLineCircle(
    maze[20].a.x,
    maze[20].a.y,
    maze[20].b.x,
    maze[20].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayFive) {
    player.move(0, ifHit);
  }
  hitwrongWaySix = collideLineCircle(
    maze[21].a.x,
    maze[21].a.y,
    maze[21].b.x,
    maze[21].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWaySix) {
    player.move(ifHit, 0);
  }
  hitwrongWaySeven = collideLineCircle(
    maze[22].a.x,
    maze[22].a.y,
    maze[22].b.x,
    maze[22].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWaySeven) {
    player.move(0, ifHit);
  }
  hitwrongWayEight = collideLineCircle(
    maze[23].a.x,
    maze[23].a.y,
    maze[23].b.x,
    maze[23].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayEight) {
    player.move(0, -ifHit);
  }
  hitwrongWayNine = collideLineCircle(
    maze[24].a.x,
    maze[24].a.y,
    maze[24].b.x,
    maze[24].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayNine) {
    player.move(0, ifHit);
  }
  hitwrongWayTen = collideLineCircle(
    maze[25].a.x,
    maze[25].a.y,
    maze[25].b.x,
    maze[25].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayTen) {
    console.log("wrong way Wall ten");
  }
  hitwrongWayUpOne = collideLineCircle(
    maze[26].a.x,
    maze[26].a.y,
    maze[26].b.x,
    maze[26].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpOne) {
    player.move(ifHit, 0);
  }
  hitwrongWayUpTwo = collideLineCircle(
    maze[28].a.x,
    maze[28].a.y,
    maze[28].b.x,
    maze[28].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpTwo) {
    player.move(0, ifHit);
  }
  hitwrongWayUpThree = collideLineCircle(
    maze[27].a.x,
    maze[27].a.y,
    maze[27].b.x,
    maze[27].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpThree) {
    player.move(-ifHit, 0);
  }
  hitwrongWayUpFour = collideLineCircle(
    maze[30].a.x,
    maze[30].a.y,
    maze[30].b.x,
    maze[30].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpFour) {
    player.move(0, ifHit);
  }
  hitwrongWayUpFive = collideLineCircle(
    maze[29].a.x,
    maze[29].a.y,
    maze[29].b.x,
    maze[29].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpFive) {
    player.move(0, ifHit);
  }
  hitwrongWayUpSix = collideLineCircle(
    maze[31].a.x,
    maze[31].a.y,
    maze[31].b.x,
    maze[31].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpSix) {
    player.move(-ifHit, 0);
  }
  hitwrongWayUpSeven = collideLineCircle(
    maze[32].a.x,
    maze[32].a.y,
    maze[32].b.x,
    maze[32].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayUpSeven) {
    player.move(ifHit, 0);
  }
  hitwrongWayLeftOne = collideLineCircle(
    maze[33].a.x,
    maze[33].a.y,
    maze[33].b.x,
    maze[33].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftOne) {
    player.move(ifHit, 0);
  }
  hitwrongWayLeftTwo = collideLineCircle(
    maze[34].a.x,
    maze[34].a.y,
    maze[34].b.x,
    maze[34].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftTwo) {
    player.move(-ifHit, 0);
  }
  hitwrongWayLeftThree = collideLineCircle(
    maze[35].a.x,
    maze[35].a.y,
    maze[35].b.x,
    maze[35].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftThree) {
    player.move(ifHit, 0);
  }
  hitwrongWayLeftFour = collideLineCircle(
    maze[36].a.x,
    maze[36].a.y,
    maze[36].b.x,
    maze[36].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftFour) {
    player.move(0, ifHit);
  }
  hitwrongWayLeftFive = collideLineCircle(
    maze[37].a.x,
    maze[37].a.y,
    maze[37].b.x,
    maze[37].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftFive) {
    player.move(-ifHit, 0);
  }

  hitwrongWayLeftSix = collideLineCircle(
    maze[39].a.x,
    maze[39].a.y,
    maze[39].b.x,
    maze[39].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftSix) {
    player.move(0, ifHit);
  }
  hitwrongWayLeftSeven = collideLineCircle(
    maze[38].a.x,
    maze[38].a.y,
    maze[38].b.x,
    maze[38].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftSeven) {
    player.move(ifHit);
  }
  hitwrongWayLeftEight = collideLineCircle(
    maze[40].a.x,
    maze[40].a.y,
    maze[40].b.x,
    maze[40].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hitwrongWayLeftEight) {
    player.move(0, -ifHit);
  }
  //////////////////////////////////////////////////////////
  //hit dectection for player two
  /////////////////////////////////////////////////////////

  line(875, 995, 995, 995);//shows winning wall
  //let mouse = ellipse(mouseX, mouseY, 50, 50);

  let ax = [];
  let ay = [];
  let bx = [];
  let by = [];

  for (let index = 0; index < maze.length; index++) {
    ax.push(maze[index].a.x);
  }
  for (let index = 0; index < maze.length; index++) {
    ay.push(maze[index].a.y);
  }
  for (let index = 0; index < maze.length; index++) {
    bx.push(maze[index].b.x);
  }
  for (let index = 0; index < maze.length; index++) {
    by.push(maze[index].b.y);
  }

  //console.log(ax);
  //console.log(ay);
  //console.log(bx);
  //console.log(by);
  hit = collideLineCircle(
    maze[0].a.x,
    maze[0].a.y,
    maze[0].b.x,
    maze[0].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hit) {
    alert("Player Two WINS! They did it in " + timer.innerHTML + ' seconds!');
    location.reload()
  }

  hitWallOne = collideLineCircle(
    maze[1].a.x,
    maze[1].a.y,
    maze[1].b.x,
    maze[1].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );

  if (hitWallOne) {
    playerTwo.move(ifHit, 0);
  }

  hitwallTwo = collideLineCircle(
    maze[2].a.x,
    maze[2].a.y,
    maze[2].b.x,
    maze[2].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwallTwo) {
    playerTwo.move(0, ifHit);
  }
  hitwallThree = collideLineCircle(
    maze[3].a.x,
    maze[3].a.y,
    maze[3].b.x,
    maze[3].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwallThree) {
    playerTwo.move(-ifHit, 0);
  }
  hitwallFour = collideLineCircle(
    maze[4].a.x,
    maze[4].a.y,
    maze[4].b.x,
    maze[4].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwallFour) {
    playerTwo.move(0, -ifHit);
  }

  hitinsideWallOne = collideLineCircle(
    maze[5].a.x,
    maze[5].a.y,
    maze[5].b.x,
    maze[5].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallOne) {
    playerTwo.move(ifHit, 0);
  }

  hitinsideWallTwo = collideLineCircle(
    maze[6].a.x,
    maze[6].a.y,
    maze[6].b.x,
    maze[6].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallTwo) {
    playerTwo.move(0, -ifHit);
  }
  hitinsideWallEight = collideLineCircle(
    maze[7].a.x,
    maze[7].a.y,
    maze[7].b.x,
    maze[7].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallEight) {
    playerTwo.move(ifHit);
  }
  hitinsideWallThree = collideLineCircle(
    maze[8].a.x,
    maze[8].a.y,
    maze[8].b.x,
    maze[8].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallThree) {
    playerTwo.move(ifHit, 0);
  }
  hitinsideWallFour = collideLineCircle(
    maze[9].a.x,
    maze[9].a.y,
    maze[9].b.x,
    maze[9].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallFour) {
    playerTwo.move(0, -ifHit);
  }
  hitinsideWallFive = collideLineCircle(
    maze[10].a.x,
    maze[10].a.y,
    maze[10].b.x,
    maze[10].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallFive) {
    playerTwo.move(ifHit, 0);
  }
  hitinsideWallSix = collideLineCircle(
    maze[11].a.x,
    maze[11].a.y,
    maze[11].b.x,
    maze[11].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallSix) {
    playerTwo.move(0, -ifHit);
  }
  hitinsideWallSeven = collideLineCircle(
    maze[12].a.x,
    maze[12].a.y,
    maze[12].b.x,
    maze[12].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallSeven) {
    playerTwo.move(-ifHit, 0);
  }
  hitinsideWallNine = collideLineCircle(
    maze[13].a.x,
    maze[13].a.y,
    maze[13].b.x,
    maze[13].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallNine) {
    playerTwo.move(0, -ifHit);
  }
  hitinsideWallTen = collideLineCircle(
    maze[14].a.x,
    maze[14].a.y,
    maze[14].b.x,
    maze[14].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallTen) {
    playerTwo.move(-ifHit, 0);
  }

  hitinsideWallEleven = collideLineCircle(
    maze[15].a.x,
    maze[15].a.y,
    maze[15].b.x,
    maze[15].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitinsideWallEleven) {
    playerTwo.move(0, -ifHit);
  }
  hitwrongWayOne = collideLineCircle(
    maze[16].a.x,
    maze[16].a.y,
    maze[16].b.x,
    maze[16].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayOne) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayTwo = collideLineCircle(
    maze[17].a.x,
    maze[17].a.y,
    maze[17].b.x,
    maze[17].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayTwo) {
    playerTwo.move(0, -ifHit);
  }
  hitwrongWayThree = collideLineCircle(
    maze[18].a.x,
    maze[18].a.y,
    maze[18].b.x,
    maze[18].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayThree) {
    playerTwo.move(-ifHit, 0);
  }
  hitwrongWayFour = collideLineCircle(
    maze[19].a.x,
    maze[19].a.y,
    maze[19].b.x,
    maze[19].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayFour) {
    playerTwo.move(0, -ifHit);
  }

  hitwrongWayFive = collideLineCircle(
    maze[20].a.x,
    maze[20].a.y,
    maze[20].b.x,
    maze[20].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayFive) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWaySix = collideLineCircle(
    maze[21].a.x,
    maze[21].a.y,
    maze[21].b.x,
    maze[21].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWaySix) {
    playerTwo.move(ifHit, 0);
  }
  hitwrongWaySeven = collideLineCircle(
    maze[22].a.x,
    maze[22].a.y,
    maze[22].b.x,
    maze[22].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWaySeven) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayEight = collideLineCircle(
    maze[23].a.x,
    maze[23].a.y,
    maze[23].b.x,
    maze[23].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayEight) {
    playerTwo.move(0, -ifHit);
  }
  hitwrongWayNine = collideLineCircle(
    maze[24].a.x,
    maze[24].a.y,
    maze[24].b.x,
    maze[24].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayNine) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayTen = collideLineCircle(
    maze[25].a.x,
    maze[25].a.y,
    maze[25].b.x,
    maze[25].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayTen) {
    console.log("wrong way Wall ten");
  }
  hitwrongWayUpOne = collideLineCircle(
    maze[26].a.x,
    maze[26].a.y,
    maze[26].b.x,
    maze[26].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpOne) {
    playerTwo.move(ifHit, 0);
  }
  hitwrongWayUpTwo = collideLineCircle(
    maze[28].a.x,
    maze[28].a.y,
    maze[28].b.x,
    maze[28].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpTwo) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayUpThree = collideLineCircle(
    maze[27].a.x,
    maze[27].a.y,
    maze[27].b.x,
    maze[27].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpThree) {
    playerTwo.move(-ifHit, 0);
  }
  hitwrongWayUpFour = collideLineCircle(
    maze[30].a.x,
    maze[30].a.y,
    maze[30].b.x,
    maze[30].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpFour) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayUpFive = collideLineCircle(
    maze[29].a.x,
    maze[29].a.y,
    maze[29].b.x,
    maze[29].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpFive) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayUpSix = collideLineCircle(
    maze[31].a.x,
    maze[31].a.y,
    maze[31].b.x,
    maze[31].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpSix) {
    playerTwo.move(-ifHit, 0);
  }
  hitwrongWayUpSeven = collideLineCircle(
    maze[32].a.x,
    maze[32].a.y,
    maze[32].b.x,
    maze[32].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayUpSeven) {
    playerTwo.move(ifHit, 0);
  }
  hitwrongWayLeftOne = collideLineCircle(
    maze[33].a.x,
    maze[33].a.y,
    maze[33].b.x,
    maze[33].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftOne) {
    playerTwo.move(ifHit, 0);
  }
  hitwrongWayLeftTwo = collideLineCircle(
    maze[34].a.x,
    maze[34].a.y,
    maze[34].b.x,
    maze[34].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftTwo) {
    playerTwo.move(-ifHit, 0);
  }
  hitwrongWayLeftThree = collideLineCircle(
    maze[35].a.x,
    maze[35].a.y,
    maze[35].b.x,
    maze[35].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftThree) {
    playerTwo.move(ifHit, 0);
  }
  hitwrongWayLeftFour = collideLineCircle(
    maze[36].a.x,
    maze[36].a.y,
    maze[36].b.x,
    maze[36].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftFour) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayLeftFive = collideLineCircle(
    maze[37].a.x,
    maze[37].a.y,
    maze[37].b.x,
    maze[37].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftFive) {
    playerTwo.move(-ifHit, 0);
  }

  hitwrongWayLeftSix = collideLineCircle(
    maze[39].a.x,
    maze[39].a.y,
    maze[39].b.x,
    maze[39].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftSix) {
    playerTwo.move(0, ifHit);
  }
  hitwrongWayLeftSeven = collideLineCircle(
    maze[38].a.x,
    maze[38].a.y,
    maze[38].b.x,
    maze[38].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftSeven) {
    playerTwo.move(ifHit);
  }
  hitwrongWayLeftEight = collideLineCircle(
    maze[40].a.x,
    maze[40].a.y,
    maze[40].b.x,
    maze[40].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hitwrongWayLeftEight) {
    playerTwo.move(0, -ifHit);
  }

  //////////
  // testing
  /////////
  //randomline.show();
  //   //randomWall.show();
  //   console.log(player.getPositionX);
  //   console.log(player.positionY);
  //   console.log(playerTwo.positionX);
  //   console.log(playerTwo.positionY);
  //   player.getPositonX,s
  //   player.getPositonY,
  //playerTwo.getPositonX()
  //playerTwo.getPositonY()
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

/////////
// reload/start game
/////////
function reload() {
  location.reload();
}
