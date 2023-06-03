let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let friendBtn = document.getElementById('friendBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

let isAgainstFriend = false

const startGame = () => {
    if(isAgainstFriend){
        boxes.forEach(box => box.addEventListener('click', friendBoxClicked))
    } else {
        boxes.forEach(box => box.addEventListener('click', boxClicked))
    }
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){ 
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        playerText.innerHTML =isAgainstFriend ? `${currentPlayer}'s turn` : `Computer's turn`
    }
}

function friendBoxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        playerText.innerHTML = `${currentPlayer}'s turn`
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] =condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)
friendBtn.addEventListener('click', startAgainstFriend)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
    isAgainstFriend = false
    startGame()
}

function startAgainstFriend() {
    isAgainstFriend = true
    restart()
}

function computerTurn() {
    let emptySpaces = []
    spaces.forEach((space, index) => {
        if(!space) {
            emptySpaces.push(index)
        }
    })
    const randomIndex = Math.floor(Math.random() * emptySpaces.length)
    const boxIndex = emptySpaces[randomIndex]
    
    spaces[boxIndex] = currentPlayer
    boxes[boxIndex].innerText = currentPlayer

    if(playerHasWon() !== false) {
        playerText.innerHTML = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon()
        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
        return
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    playerText.innerHTML = `${currentPlayer}'s turn`
}
function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){ 
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        if(!isAgainstFriend) {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
            playerText.innerHTML = `Computer's turn`
            computerTurn()
        } else {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
            playerText.innerHTML = `${currentPlayer}'s turn`
        }
    }
}

function friendBoxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){ 
            playerText.innerHTML =`${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        playerText.innerHTML = `${currentPlayer}'s turn`
    }
}

function startAgainstFriend() {
    isAgainstFriend = true
    restart()
    boxes.forEach(box => box.removeEventListener('click', friendBoxClicked))
    boxes.forEach(box => box.addEventListener('click', friendBoxClicked))
}
function startAgainstFriend() {
    isAgainstFriend = true
    restart()

    boxes.forEach(box => box.removeEventListener('click', boxClicked))

    boxes.forEach(box => box.addEventListener('click', friendBoxClicked))
}

function startAgainstComputer(){
    isAgainstFriend = false
    restart()

    boxes.forEach(box => box.removeEventListener('click', friendBoxClicked))
    boxes.forEach(box => box.addEventListener('click', friendBoxClicked))

}
startGame()

//goodbay