
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
let moveBingoInterval
let moveObst2Interval
let moveObst3Interval 
let moveObst4Interval
let moveObst5Interval
let moveObst6Interval
let moveBingo2Interval

const width = 11
const cellCount = width * width
const startingTime = 31
let timeRemaining = 31
let interval = null
const cells = []
let livesRemaining = 3
let currentPoints = 0 
const resetPoints = 0
const blueyStartPosition = 115
const bingo = [99, 102, 104, 108]
const bingo2 = [88, 91, 93, 97]
const winningCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const safetyCells = [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
const obst2 = [72, 75, 76]
const obst3 = [55, 56]
const obst4 = [33, 36, 39]
const obst5 = [23, 28, 32]
const obst6 = [12, 14, 17, 19, 20]
const messageCell = [60]
let currentBlueyPosition = 115


function generateGrid(){
  grid.innerHTML = ''
  for (let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`
    cell.style.minHeight = '1rem'
    cell.style.minWidth = '1rem'
    // cell.innerHTML = [i]
    cell.dataset.index = i
    grid.append(cell)
    cells.push(cell)
  }
} 
generateGrid()


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

function addBingo2(positions){
  bingo2.forEach(function(position){
    cells[position].classList.add('bingo2') 
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

function addObbst4Cells(positions) {
  obst4.forEach(function(position){
    cells[position].classList.add('obst4') 
  })
}

function addObbst5Cells(positions) {
  obst5.forEach(function(position){
    cells[position].classList.add('obst5') 
  })
}

function addObbst6Cells(positions) {
  obst6.forEach(function(position){
    cells[position].classList.add('obst6') 
  })
}

function startGame() {
  playsound.src = 'sounds/bluey.mpeg'
  playsound.play()
  addBluey(blueyStartPosition)
  addBingo(bingo)
  addBingo2(bingo2)
  addWinningCells(winningCells)
  addSafetyCells(safetyCells)
  addObst2Cells(obst2)
  addObbst3Cells(obst3)
  addObbst4Cells(obst4)
  addObbst4Cells(obst5)
  addObbst4Cells(obst6)
  startTimer(interval)
  moveObst()
}
play.addEventListener('click', startGame)


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


function timesup() {
  if (timeRemaining === 0 && livesRemaining >= 2){
    console.log('time is up')
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
  if ((bingo.includes(currentBlueyPosition) || bingo2.includes(currentBlueyPosition) || 
      obst2.includes(currentBlueyPosition) || obst3.includes(currentBlueyPosition) || 
      obst4.includes(currentBlueyPosition) || obst5.includes(currentBlueyPosition) || obst6.includes(currentBlueyPosition)) && livesRemaining >= 2) {
    console.log('collision')
    removeBluey(currentBlueyPosition) 
    cells[currentBlueyPosition].classList.add('crash')
    playsound.src = 'sounds/biscuits.mpeg'
    playsound.play()
    removeLife()
    resetGame()
  } else if ((bingo.includes(currentBlueyPosition) || bingo2.includes(currentBlueyPosition) || 
    obst2.includes(currentBlueyPosition) || obst3.includes(currentBlueyPosition) || 
    obst4.includes(currentBlueyPosition) || obst5.includes(currentBlueyPosition) || 
    obst6.includes(currentBlueyPosition)) && livesRemaining === 1) {
    lose() 
  }
}



function resetGame() {
  clearInterval(interval)
  console.log(interval)
  clearObst()
  timeRemaining = startingTime
  startTimer()
  currentPoints = 0
  points.innerHTML = currentPoints
  lock()

  setTimeout(function() {
    cells[currentBlueyPosition].classList.remove('time-out')
    cells[currentBlueyPosition].classList.remove('crash') 
    currentBlueyPosition = blueyStartPosition
    addBluey(blueyStartPosition)
    console.log(playsound)
    playsound.src = 'sounds/bluey.mpeg'
    playsound.play()
    moveObst()
    startTimer()
    unlock()
  }, 3000)
}


let isLocked = false

function lock() {
  isLocked = true
}

function unlock() {
  isLocked = false
}

function moveBluey(event) {
  if (isLocked) {
    return
  }
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
  } else if (key === down && cellCount - 1 >= currentBlueyPosition + width){
    currentBlueyPosition += width
    currentPoints -= 10
    points.innerHTML = currentPoints
  } else if (key === left && currentBlueyPosition % width !== 0){
    currentBlueyPosition = currentBlueyPosition - 1 
  } else if (key === right && currentBlueyPosition % width !== width - 1){
    currentBlueyPosition = currentBlueyPosition + 1
  }
  if (bingo.includes(currentBlueyPosition) || bingo2.includes(currentBlueyPosition) || 
      obst2.includes(currentBlueyPosition) || obst3.includes(currentBlueyPosition) || 
      obst4.includes(currentBlueyPosition) || obst5.includes(currentBlueyPosition) || 
      obst6.includes(currentBlueyPosition)) {
    return collision()
  }
  addBluey(currentBlueyPosition)
}

document.addEventListener('keydown', moveBluey)



function moveBingo() {
  bingo.forEach(function(position) {
    cells[position].classList.remove('bingo')
    const nextPosition = position - 1
    if (nextPosition < position - (position % width)) {
      cells[position + width - 1].classList.add('bingo')
      bingo[bingo.indexOf(position)] = position + width - 1
    } else {
      cells[nextPosition].classList.add('bingo')
      bingo[bingo.indexOf(position)] = nextPosition
    } if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveBingo2() {
  bingo2.forEach(function(position) {
    cells[position].classList.remove('bingo2')
    const nextPosition = position - 1
    if (nextPosition < position - (position % width)) {
      cells[position + width - 1].classList.add('bingo2')
      bingo2[bingo2.indexOf(position)] = position + width - 1
    } else {
      cells[nextPosition].classList.add('bingo2')
      bingo2[bingo2.indexOf(position)] = nextPosition
    } if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveObst2() {
  obst2.forEach(function(position) {
    cells[position].classList.remove('obst2')
    const nextPosition = position - 1
    if (nextPosition < position - (position % width)) {
      cells[position + width - 1].classList.add('obst2')
      obst2[obst2.indexOf(position)] = position + width - 1
    } else {
      cells[nextPosition].classList.add('obst2')
      obst2[obst2.indexOf(position)] = nextPosition
    } if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveObst3() {
  obst3.forEach(function(position) {
    cells[position].classList.remove('obst3')
    const nextPosition = position + 1
    if (nextPosition % width !== 0) {
      cells[nextPosition].classList.add('obst3')
      obst3[obst3.indexOf(position)] = nextPosition
    } else {
      const newRowPosition = position - width + 1
      cells[newRowPosition].classList.add('obst3')
      obst3[obst3.indexOf(position)] = newRowPosition
    }
    if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveObst4() {
  obst4.forEach(function(position) {
    cells[position].classList.remove('obst4')
    const nextPosition = position + 1
    if (nextPosition % width !== 0) {
      cells[nextPosition].classList.add('obst4')
      obst4[obst4.indexOf(position)] = nextPosition
    } else {
      const newRowPosition = position - width + 1
      cells[newRowPosition].classList.add('obst4')
      obst4[obst4.indexOf(position)] = newRowPosition
    }
    if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveObst5() {
  obst5.forEach(function(position) {
    cells[position].classList.remove('obst5')
    const nextPosition = position - 1
    if (nextPosition < position - (position % width)) {
      cells[position + width - 1].classList.add('obst5')
      obst5[obst5.indexOf(position)] = position + width - 1
    } else {
      cells[nextPosition].classList.add('obst5')
      obst5[obst5.indexOf(position)] = nextPosition
    } if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}

function moveObst6() {
  obst6.forEach(function(position) {
    cells[position].classList.remove('obst6')
    const nextPosition = position + 1
    if (nextPosition % width !== 0) {
      cells[nextPosition].classList.add('obst6')
      obst6[obst6.indexOf(position)] = nextPosition
    } else {
      const newRowPosition = position - width + 1
      cells[newRowPosition].classList.add('obst6')
      obst6[obst6.indexOf(position)] = newRowPosition
    }
    if (nextPosition === currentBlueyPosition) {
      collision()
    }
  })
}



function moveObst(){
  moveBingo()
  moveBingo2()
  moveObst2()
  moveObst3()
  moveObst4()
  moveObst5()
  moveObst6()
  moveBingoInterval = setInterval(moveBingo, 900)
  moveBingo2Interval = setInterval(moveBingo2, 350)
  moveObst2Interval = setInterval(moveObst2, 80)
  moveObst3Interval = setInterval(moveObst3, 80)
  moveObst4Interval = setInterval(moveObst4, 500)
  moveObst5Interval = setInterval(moveObst5, 900)
  moveObst6Interval = setInterval(moveObst6, 900)
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







function lose() {
  removeLife()
  clearInterval(interval)
  clearObst()
  clearTimeout
  timer.innerHTML = 0
  points.innerHTML = 0
  playsound.src = 'sounds/cheat.mp3'
  playsound.play()
  cells[messageCell].classList.add('game-over') 
  endGame()
}


function playerWins() {
  if (winningCells.includes(currentBlueyPosition)) { 
    console.log('player wins')
    playsound.src = 'sounds/Hurray.mpeg'
    playsound.play()
    clearInterval(interval)
    clearObst()
    currentPoints *= 2
    points.innerHTML = currentPoints
    cells[messageCell].classList.add('player-wins')
    endGame()
  }
}

function clearObst() {
  clearInterval(moveBingoInterval)
  clearInterval(moveObst2Interval)
  clearInterval(moveObst3Interval)
  clearInterval(moveBingo2Interval)
  clearInterval(moveObst4Interval)
  clearInterval(moveObst5Interval)
  clearInterval(moveObst6Interval)
}



function endGame() {
  lock()
  cells[currentBlueyPosition].classList.remove('bluey') 
  
  bingo.forEach(function(position) {
    cells[position].classList.remove('bingo')
  })
  
  bingo2.forEach(function(position) {
    cells[position].classList.remove('bingo2')
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

  obst4.forEach(function(position) {
    cells[position].classList.remove('obst4')
  })


  obst5.forEach(function(position) {
    cells[position].classList.remove('obst5')
  })


  obst6.forEach(function(position) {
    cells[position].classList.remove('obst6')
  })
}


// add a win cell background- bluey dance
//add safe cell backgrounds
//game over sound- cheat
//game over image- flossing 
//background CSS
// make sure 'lives remaining text doesnt disapear
//make it so that the timer is the same background as the div its in
//remove cell numbers
//make it so that the JS doesnt number the obstacle 

