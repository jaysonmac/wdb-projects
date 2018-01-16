var resetButton = document.getElementById('reset'),
  modes = document.getElementsByClassName('mode');
  container = document.getElementById("container"),
  message = document.getElementById('message'),
  header = document.getElementById('header'),
  squares = document.querySelectorAll('.square'),
  pickedColor = '', difficulty = '';

init();

// Function Declarations

function newGame(difficulty) {

  // Main Game Logic 

  // Reset colors and values
  resetButton.textContent = 'New Colors';
  message.textContent = '';
  header.style.backgroundColor = 'steelblue';

  // Set number of squares depending on difficulty
  var squareNum = (difficulty=='Hard') ? 6 : 3;

  // If squares[squareNum] exists (meaning that current squareNum isn't the highest difficulty), hide the remaining squares (starting from squareNum, which is conveniently +1 of the last index needed for the required number of squares. Else (max difficulty) show all squares
  if (squares[squareNum]) hideSquares(squareNum);
  else showAllSquares();

  // Generates color array for each square
  generateRandomColorArray(squareNum, function(colors) {
    // Assigns colors from array to squares
    assignColorsToSquares(colors);

    // Picking the winning color
    pickedColor = colors[getRandomIntInclusive(0,squareNum-1)];

    // Change displayed rgb text to the winning color
    var rgbDisplay = document.getElementById('rgb');
    rgbDisplay.textContent = pickedColor;

  });

}

// Hides last three squares
function hideSquares(startIndex) {
  for(i=startIndex;i<squares.length;i++) {
    squares[i].style.display = 'none';
  }
}

// Shows all squares and restores opacity
function showAllSquares() {
  squares.forEach(function(square) {
    square.style.display = 'block';
    square.style.opacity = 1;
  });
}

// Generates a random integer between min and max both inclusive
function getRandomIntInclusive(min, max) {
  // The maximum is inclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a random rgb array where array.length = qty and returns a callback with array as argument
function generateRandomColorArray(qty, cb) {
  var colorArray = [];
  for(i=0; i<qty; i++) {
    var randomRGB = 'rgb(';
    for(j=1;j<=3;j++) {
      randomRGB += getRandomIntInclusive(1,255)
      + ((j==3) ? ')' : ', '); 
    }
    colorArray.push(randomRGB);
  }
  return cb(colorArray);
}

// Assigns rgb colors from color array to the squares in order
function assignColorsToSquares(colorArr) {
  for(i=0;i<colorArr.length;i++) {
    squares[i].style.opacity = 1;
    squares[i].style.backgroundColor = colorArr[i];
  }
}

// Changes all square colors to the argument provided
function changeColorsTo(color) {
  squares.forEach(function(square) {
    square.style.backgroundColor = color;
    square.style.opacity = 1;
  });
  header.style.backgroundColor = color;
}

// Add event handlers to reset button
function setupResetButton() {
  // Starts a new game
  resetButton.addEventListener('click', function() {
    newGame(difficulty);
  });
}

// Add event handlers to mode buttons
function setupModeButtons() {
  for(i=0;i<modes.length;i++) {
    modes[i].addEventListener('click', function() {
      difficulty = this.textContent;
      for(j=0;j<modes.length;j++) {
        modes[j].classList.remove('active');
      }
      this.classList.add('active');
      resetButton.click();
    });
  };
}

// Add event handlers to color squares
function setupSquares() {
  // Add click event for each square color
  squares.forEach(function(square) {
    square.addEventListener('click', function() {
      if(this.style.backgroundColor == pickedColor) {
        changeColorsTo(pickedColor);
        message.textContent = 'Correct!';
        reset.textContent = 'Play Again?'
      }
      else {
        this.style.opacity = 0;
        message.textContent = 'Try Again';
      }
    });
  });
}

// Initialize all handlers and start a game
function init() {
  difficulty = 'Hard'; // Default difficulty
  setupResetButton();
  setupModeButtons();
  setupSquares();
  newGame(difficulty);
}