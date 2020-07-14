let maze = [];
let player;

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
  wallTwo = new Boundary(100, 975, 25, 25);
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
  wrongWaySix = new Boundary(825, 825, 850, 575);
  wrongWaySeven = new Boundary(650, 100, 825, 825);
  wrongWayEight = new Boundary(425, 100, 750, 750);
  wrongWayNine = new Boundary();
  wrongWayTen = new Boundary();

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
    wrongWayTen
  );

  // trying to import the boundaries so it all wouldnt be so messy
  //   for (let index = 0; index < walls.length; index++) {
  //     const element = new Boundary(walls[index]);
  //     console.log(element)
  //     return element
  //   }

  player = new Player();
  playerTwo = new Player();
}

function draw() {
  background(0);

  /////////////
  // Player one movement
  /////////////////
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-10, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.move(10, 0);
  } else if (keyIsDown(UP_ARROW)) {
    player.move(0, -10);
  } else if (keyIsDown(DOWN_ARROW)) {
    player.move(0, 10);
  }

  ///////////
  // Player two movement
  //////////
  if (keyIsDown(65)) {
    playerTwo.move(-10, 0);
  } else if (keyIsDown(68)) {
    playerTwo.move(10, 0);
  } else if (keyIsDown(87)) {
    playerTwo.move(0, -10);
  } else if (keyIsDown(83)) {
    playerTwo.move(0, 10);
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


  //let pts = player.cast(randomWall);
  randomline.show();
  randomWall.show();
  randomline.lookAt(mouseX,mouseY)


  let pt = randomline.cast(randomWall);
  if (pt) {
    ellipse(pt.x, pt.y, 8, 8);
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
