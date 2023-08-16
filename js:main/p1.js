
const grid = document.querySelector('.game-grid')
const playsound = document.getElementById('playsound')
const outOfTime = document.querySelector('time-out')
const gameOver = document.querySelector('game-over')
const timer = document.querySelector('.timer')
const lives = document.querySelector('.lives')
const points = document.querySelector('.points')
const play = document.querySelector('button')
const win = document.querySelector('player-wins')
const crash = document.querySelector('.crash')


const width = 11
const cellCount = width * width
const startingTime = 6
let timeRemaining = 6
let interval = null
const cells = []
let livesRemaining = 3
let currentPoints = 0 
const resetPoints = 0
const blueyStartPosition = 115
const bingo = [99, 102, 104, 108]
const winningCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const safetyCells = [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
const obst2 = [75, 76]
const obst3 = [55, 56]
const messageCell = [60]
let currentBlueyPosition = 115


function generateGrid(){
  grid.innerHTML = ''
  for (let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`
    cell.innerHTML = i
    cell.dataset.index = i
    grid.append(cell)
    cells.push(cell)
  }
} 
generateGrid()


function startGame() {
  playsound.src = 'sounds/do_it copy.wav'
  playsound.play()
  addBluey(blueyStartPosition)
  addBingo(bingo)
  addWinningCells(winningCells)
  addSafetyCells(safetyCells)
  addObst2Cells(obst2)
  addObbst3Cells(obst3)
  startTimer(interval)
  // moveBingo()
}

play.addEventListener('click', startGame)



function addBluey(position){
  cells[currentBlueyPosition].classList.add('bluey')
}

function removeBluey() {
  cells[currentBlueyPosition].classList.remove('bluey')
}



function addWinningCells(positions){
  winningCells.forEach(function(position){
    cells[position].classList.add('winning-cells') 
  })
}



function addSafetyCells(positions){
  safetyCells.forEach(function(position){
    cells[position].classList.add('safety-cells') 
  })
}


function addBingo(positions){
  bingo.forEach(function(position){
    cells[position].classList.add('bingo') 
  })
}


function addObst2Cells(positions) {
  obst2.forEach(function(position){
    cells[position].classList.add('obst2') 
  })
}



function addObbst3Cells(positions) {
  obst3.forEach(function(position){
    cells[position].classList.add('obst3') 
  })
}


// let bingoMoved

// function moveBingo() {
//   bingo.forEach(function(position){
//     cells[position].classList.remove('bingo') 
//     bingoMoved = position - 1
//     if (bingoMoved <= 99) {
//       bingoMoved = 109
//     }
//     cells[bingoMoved].classList.add('bingo') 
//     bingo[position] = bingoMoved
//   })
//   const moveBingoInterval = setInterval(moveBingo, 1000)
// }
      


function moveBluey(event){
  const key = event.key
  const up = 'ArrowUp'
  const down = 'ArrowDown'
  const left = 'ArrowLeft'
  const right = 'ArrowRight'
  removeBluey()
  if (key === up && currentBlueyPosition >= width){
    currentBlueyPosition -= width
    updatePoints()
    if (winningCells.includes(currentBlueyPosition)) {
      return playerWins()
    }
    if (bingo.includes(currentBlueyPosition)) {
      return collision()
    }
  } else if (key === down && cellCount - 1 >= currentBlueyPosition + width){
    currentBlueyPosition += width
  } else if (key === left && currentBlueyPosition % width !== 0){
    currentBlueyPosition = currentBlueyPosition - 1 
  } else if (key === right && currentBlueyPosition % width !== width - 1){
    currentBlueyPosition = currentBlueyPosition + 1
  }
  addBluey(currentBlueyPosition)
}

document.addEventListener('keydown', moveBluey)


function startTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  } else {
    interval = setInterval(function(){
      timeRemaining--
      timer.innerHTML = timeRemaining
      if (timeRemaining === 0){
        clearInterval(interval)
        timesup()
      }
    }, 1000)
  }
}


function removeLife() {
  livesRemaining--
  lives.innerHTML = livesRemaining
}



function updatePoints() {
  if (currentBlueyPosition >= width) {
    currentPoints += 10
    points.innerHTML = currentPoints
  }
  console.log(currentPoints)
}



function timesup() {
  if (timeRemaining === 0 && livesRemaining >= 2){
    removeBluey(currentBlueyPosition)
    cells[currentBlueyPosition].classList.add('time-out')
    playsound.src = 'sounds/biscuits.mpeg'
    playsound.play()
    removeLife()
    resetGame()
  } else if (timeRemaining === 0 && livesRemaining === 1)
    lose() 
}

function collision() {
  if (bingo.includes(currentBlueyPosition) && livesRemaining >= 2) {
    console.log('bingo collision')
    removeBluey(currentBlueyPosition) 
    cells[currentBlueyPosition].classList.add('crash')
    playsound.src = 'sounds/biscuits.mpeg'
    playsound.play()
    removeLife()
    resetGame()
  } else if (bingo.includes(currentBlueyPosition) && livesRemaining === 1) {
    lose() 
  }
}


function resetGame() {
  clearInterval(interval)
  timeRemaining = startingTime
  startTimer()
  setTimeout(function() {
    cells[currentBlueyPosition].classList.remove('time-out') 
    cells[currentBlueyPosition].classList.remove('crash')
    currentBlueyPosition = blueyStartPosition
    addBluey(blueyStartPosition)
    playsound.src = 'sounds/do_it copy.wav' 
    playsound.play()
    currentPoints = 0
    points.innerHTML = currentPoints
    startTimer()
  }, 3000)
}


function lose() {
  removeLife()
  clearInterval(interval)
  clearTimeout
  timer.innerHTML = 0
  points.innerHTML = 0
  playsound.src = 'sounds/biscuits.mpeg'
  playsound.play()
  cells[messageCell].classList.add('game-over') 
  endGame()
}


function playerWins() {
  if (winningCells.includes(currentBlueyPosition)) { 
    console.log('player wins')
    playsound.src = 'sounds/bingo.mpeg'
    playsound.play()
    clearInterval(interval)
    currentPoints *= 2
    points.innerHTML = currentPoints
    cells[messageCell].classList.add('player-wins')
    endGame()
  }
}

  


function endGame() {
  cells[currentBlueyPosition].classList.remove('bluey') 
  
  bingo.forEach(function(position) {
    cells[position].classList.remove('bingo')
  })
  
  winningCells.forEach(function(position) {
    cells[position].classList.remove('winning-cells')
  })
  
  safetyCells.forEach(function(position) {
    cells[position].classList.remove('safety-cells')
  })
  
  obst2.forEach(function(position) {
    cells[position].classList.remove('obst2')
  })
  
  obst3.forEach(function(position) {
    cells[position].classList.remove('obst3')
  })
}


//when you win the game continues
// MAKE OBST MOVE
//add new game starts in 4, 3, 2, 1
//update sounds and images
//stop the timer restarting at 0 --> add a second on to timer
//stop getting points if you go down and back up
// make sure 'lives remaining text doesnt disapear
// make play button so it resets the game if pressed
//disable keys until game restarts
//make it so that the timer is the same background as the div its in
//remove cell numbers
//make it so that the JS doesnt number the obstacle 