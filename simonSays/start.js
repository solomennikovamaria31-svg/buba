const doBtn = document.querySelector('#do')
const reBtn = document.querySelector('#re')
const miBtn = document.querySelector('#mi')
const faBtn = document.querySelector('#fa')
const solBtn = document.querySelector('#sol')
const laBtn = document.querySelector('#la')
const siBtn = document.querySelector('#si')
const startBtn = document.querySelector('#start')
const btnCont = document.querySelector('#btn')
const roundDisplay = document.querySelector('#round-display')
const bestDisplay = document.querySelector('#best-display')
const lose = document.querySelector('#lose')

let action = []
let actionPlayer = []
let buttons = [doBtn, reBtn, miBtn, faBtn, solBtn, laBtn, siBtn ]
let level = 0
let game = false
let bestScore = 0

function startGame()
{
 lose.textContent = ''
 action = []
 level = 0
 game = true
 timer() 
 updateDisplay()
}

function timer()
{
    startBtn.disabled = true
    const timerElement = document.createElement('div')
       timerElement.style.cssText = `  
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 8rem;
        font-weight: bold;
        text-shadow: 0 0 30px #03fe29;
        text-align: center;
        z-index: 1000;`
     document.body.appendChild(timerElement)
    let go = ['1', '1 2', '1 2 3...', 'Go!']
    let index = 0
    timerElement.textContent = go[index]
    index++
    const interval = setInterval(() => {
       if(index < go.length )
       {
        timerElement.textContent = go[index]
        index++
       }
       else
       {
        clearInterval(interval)
        timerElement.remove()
        startRound()
       }
    }, 500);
}