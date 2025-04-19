

//QuerySelectors
const playButton = document.querySelector(".ClickButton")
const addAmountButton = document.querySelector(".amountUpgrade")
const currency = document.querySelector('#currency')
const resetButton = document.querySelector('#ResetButton')
const autoTickButt = document.querySelector('#autoTick')


const clickSound = document.getElementById('clickSound');


document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play()
})



//Storage and Variables
    var Currency = JSON.parse(localStorage.getItem('Money')) || 0
    var addAmountPrice = JSON.parse(localStorage.getItem('AddAmount')) || 5
    var increaseAmount = JSON.parse(localStorage.getItem('IncreaseAmount')) || 1
    var increaseAutoAmount = JSON.parse(localStorage.getItem('IncreaseAutoAmount')) || 1
    var addAutoPrice = JSON.parse(localStorage.getItem('AutoPrice')) || 100
    let autoTickRunning = JSON.parse(localStorage.getItem('TickerTrue')) || false
    var shitTimer = JSON.parse(localStorage.getItem('TickTimer')) || 2000

    const maxClicksPerSecond = 20
    let clickCount = 0
    let clickInterval

//Button Clicks
addAmountButton.addEventListener('click', () => {
    if (Currency >= addAmountPrice) 
       { Currency -= addAmountPrice
        increaseAmount += 1
        addAmountPrice += 10
        updateMoney()
        updateAddButton()
        localStorage.setItem("IncreaseAmount", JSON.stringify(increaseAmount))    
        localStorage.setItem("AddAmount", JSON.stringify(addAmountPrice))
        localStorage.setItem("Money", JSON.stringify(Currency)) }
    else {
        console.log("You don't have enough money")
    }
})

playButton.addEventListener('click', () => {
    
    if (clickCount < maxClicksPerSecond) {
        Currency += increaseAmount
        console.log(Currency)
        updateMoney()
        localStorage.setItem("Money", JSON.stringify(Currency))
        clickCount++
        if (!clickInterval) {
            clickInterval = setInterval(() => {
                clickCount = 0
                clearInterval(clickInterval)
                clickInterval = null
            }, 1000)
        }
    } else {
        console.log("You are clicking too fast! Please slow down.");
    }
})

autoTickButt.addEventListener('click', async () => {
    if (Currency >= addAutoPrice) {
        Currency -= addAutoPrice
        addAutoPrice *= 10
        shitTimer = shitTimer / 2
        updateTickButton()
        updateMoney()
        localStorage.setItem("AutoPrice", JSON.stringify(addAutoPrice))
        localStorage.setItem("Money", JSON.stringify(Currency))
        localStorage.setItem("TickTimer", JSON.stringify(shitTimer))

        
        if (autoTickRunning) {
            clearInterval(autoTickInterval)
        }
        autoTicker()
        autoTickRunning = true
        localStorage.setItem('TickerTrue', JSON.stringify(autoTickRunning))
    } else {
        console.log("You don't have enough money")
    }
})

const autoTicker = () => {
    autoTickInterval = setInterval(() => {
        Currency += increaseAutoAmount
        updateMoney()
        localStorage.setItem("Money", JSON.stringify(Currency))
        console.log("Auto-tick is running with timer:", shitTimer)
    }, shitTimer)
}

resetButton.addEventListener('click', () => {
    localStorage.clear()  
    Currency = 0
    addAmountPrice = 5
    increaseAmount = 1
    increaseAutoAmount = 1
    addAutoPrice = 100
    shitTimer = 1000
    autoTickRunning = false 
    clearInterval(autoTickInterval)
    updateMoney()
    updateAddButton()
    updateTickButton()
})





//Update Buttons
const updateMoney = () =>{
    currency.textContent = Currency.toString();
}
const updateAddButton = () =>{
    addAmountButton.innerHTML = "Increase Click Amount " + "<br> <br>" + "Cost: " + addAmountPrice.toString()
}
const updateTickButton = () =>{
    autoTickButt.innerHTML = "Increase Auto-Tick Amount " + "<br> <br>" + "Cost: " + addAutoPrice.toString()
}


//Updates for when user opens page

if (autoTickRunning == true) {
    autoTicker()
}

updateTickButton()
updateMoney()
updateAddButton()