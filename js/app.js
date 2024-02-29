'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const scoreDisplay = document.getElementById('score');
  const width = 28;
  const height = 28;

  let score = 0;

  const grid = document.querySelector('.grid');

  // 0 - Pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const squares = [];

  // Create Board
  const createBoard = function () {
    return layout.map((el, i) => {
      const square = document.createElement('div');
      square.id = i;
      squares.push(square);
      grid.appendChild(square);

      // Add layout to the board
      if (el === 0) {
        return squares[i].classList.add('pac-dot');
      }

      if (el === 1) {
        return squares[i].classList.add('wall');
      }

      if (el === 2) {
        return squares[i].classList.add('ghost-lair');
      }

      if (el === 3) {
        return squares[i].classList.add('power-pallet');
      }

      if (el === 4) {
        return;
      }
    });
  };
  createBoard();

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  // GHOST CLASS
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
    }
  }

  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
  ];

  ////////////////////////////////////////////
  // Unscared ghost
  const unscaredGhost = function () {
    ghosts.forEach(ghost => (ghost.isScared = false));
  };

  ////////////////////////////////////////////
  // Create Charectors
  // Draw pac-man onto the board
  let pacmanCurrentIndex = 490;
  const drawPacman = function () {
    squares[pacmanCurrentIndex].classList.add('pac-man');
  };
  drawPacman();

  ////////////////////////////////////////////
  // Eat a pac dot
  const pacDotEaten = function () {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
  };

  ////////////////////////////////////////////
  // Eats a power pallet
  const powerPalletEaten = function () {
    if (squares[pacmanCurrentIndex].classList.contains('power-pallet')) {
      score += 10;
      scoreDisplay.innerHTML = score;
      ghosts.forEach(ghost => (ghost.isScared = true));
      setTimeout(unscaredGhost, 10000);
      squares[pacmanCurrentIndex].classList.remove('power-pallet');
    }
  };

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  // Move GHOSTS randomly
  const moveGhost = function (ghost) {
    const directionsArray = [-1, 1, width, -width];
    let direction =
      directionsArray[Math.floor(Math.random() * directionsArray.length)];

    ghost.timerId = setInterval(function () {
      // If next is NOT a wall OR ghost-lair
      if (
        !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall')
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          'ghost',
          'scared-ghost'
        );
        ghost.currentIndex += direction;
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      } else {
        direction =
          directionsArray[Math.floor(Math.random() * directionsArray.length)];
      }

      // If ghosts are scared since power-pallet is consumed
      // then change the color of the ghost
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }

      // If ghosts are scared since power-pallet is consumed
      // and pac-man is on a ghost
      // send the ghost back to ghost lair
      // and add +100 to the scorwe board
      if (
        ghost.isScared &&
        squares[ghost.currentIndex].classList.contains('pac-man')
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          'ghost',
          'scared-ghost'
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.innerHTML = score;
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost');
      }
    }, ghost.speed);
  };

  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
    moveGhost(ghost);
  });

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  // Move Pacman
  const movePacman = function (e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man');

    // MOVE LEFT
    if (e.key === 'ArrowLeft') {
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
      ) {
        pacmanCurrentIndex--;
      }

      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391;
      }
    }

    // MOVE RIGHT
    if (e.key === 'ArrowRight') {
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
      ) {
        pacmanCurrentIndex++;
      }

      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364;
      }
    }

    // MOVE UP
    if (e.key === 'ArrowUp') {
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
      ) {
        pacmanCurrentIndex -= width;
      }
    }

    // MOVE DOWN
    if (e.key === 'ArrowDown') {
      if (
        pacmanCurrentIndex + width <= width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
      )
        pacmanCurrentIndex += width;
    }

    squares[pacmanCurrentIndex].classList.add('pac-man');

    // Pac-Dot eaten
    pacDotEaten();

    // Power-pallet eaten
    powerPalletEaten();

    // Check for Game Over

    // Check for Win
  };

  document.addEventListener('keyup', movePacman);
});
