function startRound()
{
startBtn.disabled = true
 btnCont.style.pointerEvents = 'none'
 const randIndex = Math.floor(Math.random() * buttons.length)
 const currentBtn = buttons[randIndex]
 action.push(currentBtn)
actionsRound()
}

function actionsRound()
{
 let i = 0
const interval = setInterval(() => {
        if (i < action.length)
        {  
            const currentBtn = action[i]
            currentBtn.classList.add('active')
            setTimeout(() => {
            currentBtn.classList.remove('active')  
            }, 350)
            
            i++ 
        } 
        else
        {
            clearInterval(interval)
           btnCont.style.pointerEvents = 'auto'
        }
    },700)
}

function playerTurn(currentBtn)
{
    currentBtn.classList.add('active')
    setTimeout(() => {
        currentBtn.classList.remove('active')
    },500);
    actionPlayer.push(currentBtn)
    const indexBtn = actionPlayer.length - 1
    if(actionPlayer[indexBtn] != action[indexBtn])
    {
        gameOver()
        return
    }
    if(actionPlayer.length === action.length)
    {
        level++
        updateDisplay()
        if(level > bestScore)
        {
            bestScore = level
            saveBestSc()
        }
        actionPlayer = []
         setTimeout(() => {
            timer()
        }, 700)
    }
}

function gameOver()
{
    game = false
    btnCont.style.pointerEvents = 'none'
    startBtn.disabled = false
    lose.textContent = `Вы проиграли!`
    saveBestSc()
    updateDisplay()
}

loadBestSc()

function updateDisplay() 
{
    if (roundDisplay) 
    {
        roundDisplay.textContent = `Уровень: ${level}`
    }
    if (bestDisplay) 
    {
        bestDisplay.textContent = ` Рекорд: ${bestScore}`
    }
}
updateDisplay()

startBtn.addEventListener('click', startGame)
doBtn.addEventListener('click', () => playerTurn(doBtn))
reBtn.addEventListener('click', () => playerTurn(reBtn))
miBtn.addEventListener('click', () => playerTurn(miBtn))
faBtn.addEventListener('click', () => playerTurn(faBtn))
solBtn.addEventListener('click', () => playerTurn(solBtn))
laBtn.addEventListener('click', () => playerTurn(laBtn))
siBtn.addEventListener('click', () => playerTurn(siBtn))