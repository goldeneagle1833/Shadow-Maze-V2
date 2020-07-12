let maze = [];
let player;


let counter = 0;
let timerLife = 60;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  noStroke();
  fill(100);
  ///////
  // Timer works just commit to simplify
  ///////


//   const stopTime = setInterval(timeIt, 1000);

//   const timer = select("#timer");
//   timer.html(counter);
//   function timeIt() {
//     counter++;
//     timer.html(timerLife - counter);
//     if (counter == timerLife) {
//       clearInterval(stopTime);
//       alert("Game Over");
//       location.reload();
//       //counter = 0;
//     }
//   }

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
}

function draw() {
  background(0);
  for (let wall of maze) {
    wall.show();
  }



  // trying to loop through the array made in the setup function
  //   for (let w of walls) {
  //     w.show();
  //   }
  player.show(
    50,
    40,
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  );
  player.drawLines(maze)
  

  //   playerTwo.show(
  //     75,
  //     50,
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255)
  //   );
  //playerVision.rayCheck(mouseX, mouseY);
  playerVision.cast();
  //noloop();
  //   let pt = playerVision.rayCheck(maze);
  //   if (pt) {
  //     fill(255);
  //     ellipse(pt.x, pt.y, 8, 8);
  //     strokeWeight(2);
  //   }
}
