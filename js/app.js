'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.querySelector('.overlay');
  const rulesBtn = document.getElementById('rules');
  const restartBtn = document.querySelectorAll('#restart');
  const rulesPopupBox = document.querySelector('.rules-popup');
  const gameEndsPopupBox = document.querySelector('.game-status-popup');
  const closePopBtn = document.querySelector('.popup-close');
  const gameStatesMessage = document.querySelector('.game-start-message');

  const scoreDisplay = document.getElementById('score');
  const highScoreDisplay = document.getElementById('highscore');
  const gameStatusText = document.getElementById('game-status-text');
  const levelDisplay = document.getElementById('level');

  const grid = document.querySelector('.grid');
  const width = 28;
  const height = 28;

  let gameState = true;

  // Fetch latest highscore
  let highScore = +localStorage.getItem('highScore');

  // Render latest highscore
  highScoreDisplay.innerHTML = highScore;

  const init = function () {
    let score = 0;
    let level = 1;
    let ghostEaten = 0;

    let speedReducedAt100 = false;
    let speedReducedAt200 = false;

    scoreDisplay.innerHTML = score;
    levelDisplay.innerHTML = level;

    grid.innerHTML = '';

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
          return squares[i].classList.add('power-pallet', 'power-pallet-box');
        }

        if (el === 4) {
          return squares[i].classList.add('void');
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
        this.respawnIndex = 378;
        this.isScared = false;
        this.timerId = NaN;
      }
    }

    const ghosts = [
      new Ghost('blinky', 295, 290),
      new Ghost('pinky', 292, 400),
      new Ghost('inky', 351, 320),
      new Ghost('clyde', 348, 500),
    ];

    ////////////////////////////////////////////
    // Increase Ghost Speed
    const checkSpeed = function () {
      // Check if the score is 100 or above and the speed has not been reduced yet at 100
      if (score >= 100 && !speedReducedAt100) {
        ghosts.forEach(ghost => {
          ghost.speed *= 0.92;
          moveGhost(ghost);
        });
        level++;
        levelDisplay.innerHTML = level;
        speedReducedAt100 = true; // Set the flag to true to indicate speed reduction at 50
      }

      // Check if the score is 200 or above and the speed has not been reduced yet at 200
      if (score >= 200 && !speedReducedAt200) {
        ghosts.forEach(ghost => {
          ghost.speed *= 0.88;
          moveGhost(ghost);
        });
        level++;
        levelDisplay.innerHTML = level;
        speedReducedAt200 = true; // Set the flag to true to indicate speed reduction at 100
      }
    };

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

        // Increase speed of ghost if score >= 100
        if (score >= 10 || score >= 25) {
          checkSpeed();
        }

        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        squares[pacmanCurrentIndex].classList.add('void');
      }
    };

    ////////////////////////////////////////////
    // Eats a power pallet
    const powerPalletEaten = function () {
      if (squares[pacmanCurrentIndex].classList.contains('power-pallet')) {
        score += 10;

        // Increase speed of ghost if score >= 100
        if (score >= 10 || score >= 25) {
          checkSpeed();
        }

        scoreDisplay.innerHTML = score;
        ghosts.forEach(ghost => (ghost.isScared = true));
        setTimeout(unscaredGhost, 10000);
        squares[pacmanCurrentIndex].classList.remove('power-pallet');
        squares[pacmanCurrentIndex].classList.remove('power-pallet-box');
        squares[pacmanCurrentIndex].classList.add('void');
      }
    };

    ////////////////////////////////////////////
    // Store Highscore to local storage
    const storeHighscore = function () {
      if (score > highScore) {
        // save it in local storage
        localStorage.setItem('highScore', score);
        // render highscore to display
        highScoreDisplay.innerHTML = score;
      }
    };

    ////////////////////////////////////////////
    // Check for Game Over
    const checkGameOver = function () {
      if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
      ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));

        // If score is greater than highscore
        storeHighscore();
        document.removeEventListener('keyup', movePacman);
        overlay.classList.add('overlay--active');
        gameStatusText.innerHTML = 'Game Over';
        gameEndsPopupBox.classList.remove('hidden');
      }
    };

    ////////////////////////////////////////////
    // Check for Win
    const checkForWin = function () {
      if (score >= 274 + ghostEaten * 100) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));

        document.removeEventListener('keyup', movePacman);
        overlay.classList.add('overlay--active');
        gameStatusText.innerHTML = 'You Won the Game';
        gameEndsPopupBox.classList.remove('hidden');

        // If score is greater than highscore
        storeHighscore();
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
          !squares[ghost.currentIndex + direction].classList.contains(
            'ghost'
          ) &&
          !squares[ghost.currentIndex + direction].classList.contains('wall')
        ) {
          if (
            !squares[ghost.currentIndex].classList.contains('void') &&
            !squares[ghost.currentIndex].classList.contains('ghost-lair')
          ) {
            squares[ghost.currentIndex].classList.add('pac-dot');

            if (
              squares[ghost.currentIndex].classList.contains('power-pallet-box')
            ) {
              squares[ghost.currentIndex].classList.add('power-pallet');
            }
          }

          squares[ghost.currentIndex].classList.remove(
            ghost.className,
            'ghost',
            'scared-ghost'
          );

          ghost.currentIndex += direction;

          if (
            squares[ghost.currentIndex].classList.contains('pac-dot') ||
            squares[ghost.currentIndex].classList.contains('power-pallet')
          ) {
            squares[ghost.currentIndex].classList.remove('pac-dot');
            squares[ghost.currentIndex].classList.remove('power-pallet');
          }
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
        // and add +100 to the score board
        if (
          ghost.isScared &&
          squares[ghost.currentIndex].classList.contains('pac-man')
        ) {
          ghostEaten++;
          ghost.isScared = false;
          squares[ghost.currentIndex].classList.remove(
            ghost.className,
            'ghost',
            'scared-ghost'
          );
          ghost.currentIndex = ghost.respawnIndex;
          score += 100;
          scoreDisplay.innerHTML = score;
          squares[ghost.currentIndex].classList.remove(
            ghost.className,
            'ghost'
          );
        }

        // Check game over
        checkGameOver();
      }, ghost.speed);
    };

    // Draw Ghost on the board
    ghosts.forEach(ghost => {
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    });

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
      checkGameOver();

      // Check for Win
      checkForWin();
    };

    ////////////////////////////////////////////
    // Start the game when 'SPACEBAR' is pressed
    const startTheGame = function (e) {
      if (gameState && e.code === 'Space') {
        // Hide the game state message
        gameStatesMessage.classList.add('hidden');

        // Move Ghost randomly
        ghosts.forEach(ghost => {
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
          moveGhost(ghost);
        });

        // Move Pacman
        document.addEventListener('keyup', movePacman);
        gameState = false;
      }
    };

    document.addEventListener('keypress', startTheGame);
  };

  init();

  rulesBtn.addEventListener('click', function (e) {
    e.preventDefault();

    rulesPopupBox.classList.remove('hidden');
    overlay.classList.add('overlay--active');
  });

  overlay.addEventListener('click', function () {
    overlay.classList.remove('overlay--active');
    rulesPopupBox.classList.add('hidden');
    gameEndsPopupBox.classList.add('hidden');
  });

  closePopBtn.addEventListener('click', function () {
    overlay.classList.remove('overlay--active');
    rulesPopupBox.classList.add('hidden');
  });

  restartBtn.forEach(btn =>
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      // Reinitialize the game
      location.reload();

      // Hide game over popup
      gameEndsPopupBox.classList.add('hidden');
      overlay.classList.remove('overlay--active');
    })
  );
});
