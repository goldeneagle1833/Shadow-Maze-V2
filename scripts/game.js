let maze = [];
let movementSpeed = 2;
let ifHit = 5;
let hit = false; // winner wall
let vertMaze = [];
let horizontalMaze = [];

let vertVar = false;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  noStroke();
  fill(100);
  randomWall = new Boundary(300, 100, 300, 300);
  //randomline = new VisionTest(100, 200);
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
  wallTwo = new Boundary(75, 975, 25, 25);
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
  wrongWayUpFour = new Boundary(400, 600, 100, 100);
  wrongWayUpFive = new Boundary(100, 325, 100, 100);
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
  vertMaze.push(
    wallOne,
    wallFour,
    insideWallOne,
    insideWallEight,
    insideWallThree,
    insideWallFive,
    insideWallSeven,
    insideWallEight,
    insideWallTen,
    wrongWayTwo,
    wrongWayFive,
    wrongWaySix,
    wrongWayUpOne,
    wrongWayUpThree,
    wrongWayUpSix,
    wrongWayUpSeven,
    wrongWayLeftOne,
    wrongWayLeftTwo,
    wrongWayLeftThree,
    wrongWayLeftSix,
    wrongWayLeftSeven
  );
  horizontalMaze.push(
    winningWall,
    wallTwo,
    wallThree,
    insideWallTwo,
    insideWallFour,
    insideWallSix,
    insideWallNine,
    insideWallEleven,
    wrongWayOne,
    wrongWayThree,
    wrongWayFour,
    wrongWaySeven,
    wrongWayEight,
    wrongWayNine,
    wrongWayUpTwo,
    wrongWayUpFour,
    wrongWayUpFive,
    wrongWayLeftFour,
    wrongWayLeftEight
  );
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

  player = new Redplayer();
  playerTwo = new Blueplayer();
}

function draw() {
  background(0);
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

  for (let wall of vertMaze) {
    wall.show();
  }
  for (let wall of horizontalMaze) {
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
  //hit dectection for player one winning wall
  //////////
  hit = collideLineCircle(
    horizontalMaze[0].a.x,
    horizontalMaze[0].a.y,
    horizontalMaze[0].b.x,
    horizontalMaze[0].b.y,
    player.getPositionX(),
    player.getPositionY(),
    10
  );
  if (hit) {
    alert("Player One WINS! They did it in " + timer.innerHTML + " seconds!");
    location.reload();
  }

  //////////////////////////////////////////////////////////
  //hit dectection for player one
  /////////////////////////////////////////////////////////

  //player.hitVert(maze[1].a.x, maze[1].a.y, maze[1].b.x, maze[1].b.y)
  //playerTwo.hitVert(maze[0].a.x, maze[0].a.y, maze[0].b.x, maze[0].b.y)

  for (let i = 0; i < vertMaze.length; i++) {
    player.wallDectVertRight(
      vertMaze[i].a.x,
      vertMaze[i].a.y,
      vertMaze[i].b.x,
      vertMaze[i].b.y,
      vertMaze[i].a.x
    );
  }
  for (let i = 0; i < vertMaze.length; i++) {
    player.wallDectVertLeft(
      vertMaze[i].a.x,
      vertMaze[i].a.y,
      vertMaze[i].b.x,
      vertMaze[i].b.y,
      vertMaze[i].a.x
    );
  }
  for (let i = 0; i < horizontalMaze.length; i++) {
    player.wallDectHorizUp(
      horizontalMaze[i].a.x,
      horizontalMaze[i].a.y,
      horizontalMaze[i].b.x,
      horizontalMaze[i].b.y,
      horizontalMaze[i].a.y
    );
  }
  for (let i = 0; i < horizontalMaze.length; i++) {
    player.wallDectHorizDown(
      horizontalMaze[i].a.x,
      horizontalMaze[i].a.y,
      horizontalMaze[i].b.x,
      horizontalMaze[i].b.y,
      horizontalMaze[i].a.y
    );
  }

  //////////////////////////////////////////////////////////
  //hit dectection for player two
  /////////////////////////////////////////////////////////

  for (let i = 0; i < vertMaze.length; i++) {
    playerTwo.wallDectVertRight(
      vertMaze[i].a.x,
      vertMaze[i].a.y,
      vertMaze[i].b.x,
      vertMaze[i].b.y,
      vertMaze[i].a.x
    );
  }
  for (let i = 0; i < vertMaze.length; i++) {
    playerTwo.wallDectVertLeft(
      vertMaze[i].a.x,
      vertMaze[i].a.y,
      vertMaze[i].b.x,
      vertMaze[i].b.y,
      vertMaze[i].a.x
    );
  }
  for (let i = 0; i < horizontalMaze.length; i++) {
    playerTwo.wallDectHorizUp(
      horizontalMaze[i].a.x,
      horizontalMaze[i].a.y,
      horizontalMaze[i].b.x,
      horizontalMaze[i].b.y,
      horizontalMaze[i].a.y
    );
  }
  for (let i = 0; i < horizontalMaze.length; i++) {
    playerTwo.wallDectHorizDown(
      horizontalMaze[i].a.x,
      horizontalMaze[i].a.y,
      horizontalMaze[i].b.x,
      horizontalMaze[i].b.y,
      horizontalMaze[i].a.y
    );
  }


  //////////
  //hit dectection for player two winning wall
  //////////
  hit = collideLineCircle(
    horizontalMaze[0].a.x,
    horizontalMaze[0].a.y,
    horizontalMaze[0].b.x,
    horizontalMaze[0].b.y,
    playerTwo.getPositionX(),
    playerTwo.getPositionY(),
    10
  );
  if (hit) {
    alert("Player Two WINS! They did it in " + timer.innerHTML + " seconds!");
    location.reload();
  }
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
