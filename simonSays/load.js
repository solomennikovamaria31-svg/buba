function loadBestSc()
{
 const saved = localStorage.getItem('simonBestSc')
  if (saved !== null)
 {
    bestScore = parseInt(saved)
 }
 updateDisplay()
}

function saveBestSc()
{
 localStorage.setItem('simonBestSc', bestScore)
 updateDisplay()
}