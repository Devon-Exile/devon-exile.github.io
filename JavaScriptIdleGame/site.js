

//QuerySelectors
const playButton = document.querySelector(".ClickButton")
const addAmountButton = document.querySelector(".amountUpgrade")
const currency = document.querySelector('#currency')
const resetButton = document.querySelector('#ResetButton')
const autoTickButt = document.querySelector('#autoTick')

//click sound
const clickSound = document.getElementById('clickSound');

// document.addEventListener('click', () => {
//     clickSound.currentTime = 0;
//     clickSound.play()
// })
function playClickSound() {
    clickSound.currentTime = 0
    clickSound.play()
}


//Storage and Variables (will refine eventually, just lazy)
    var Currency = JSON.parse(localStorage.getItem('Money')) || 0
    var addAmountPrice = JSON.parse(localStorage.getItem('AddAmount')) || 5
    var increaseAmount = JSON.parse(localStorage.getItem('IncreaseAmount')) || 1
    var increaseAutoAmount = JSON.parse(localStorage.getItem('IncreaseAutoAmount')) || 1
    var addAutoPrice = JSON.parse(localStorage.getItem('AutoPrice')) || 100
    let autoTickRunning = JSON.parse(localStorage.getItem('TickerTrue')) || false
    var shitTimer = JSON.parse(localStorage.getItem('TickTimer')) || 2000

    const maxClicksPerSecond = 100
    let clickCount = 0
    let isLockedOut = false;
    const lockoutTime = 300000;

//Button Clicks
addAmountButton.addEventListener('click', () => {
    playClickSound() 
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
    playClickSound() 
    if (isLockedOut) {
        console.log("You are locked out lol shouldn't have cheated. Please wait or refresh the page bc I really don't care if you cheated.")
        return
    }
    clickCount++
    console.log("Click count is: ", clickCount)
    if (clickCount <= maxClicksPerSecond) {
        Currency += increaseAmount
        updateMoney()
        localStorage.setItem("Money", JSON.stringify(Currency))
    } else {
        isLockedOut = true
        console.log("You are clicking too fast you prick, stop cheating! Please wait 5 minutes lol")
        setTimeout(() => {
            isLockedOut = false
            console.log("You can click again!")
        }, lockoutTime)
    }
})

setInterval(() => {
    clickCount = 0
    console.log("Click count has been reset.")
}, 3000)


autoTickButt.addEventListener('click', async () => {
    playClickSound() 
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
    playClickSound() 
    localStorage.clear()  
    Currency = 0
    addAmountPrice = 5
    increaseAmount = 1
    increaseAutoAmount = 1
    addAutoPrice = 100
    shitTimer = 2000
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
    autoTickButt.innerHTML = "Increase Auto-Tick Speed " + "<br> <br>" + "Cost: " + addAutoPrice.toString()
}


//Updates for when user opens page
if (autoTickRunning == true) {
    autoTicker()
}

updateTickButton()
updateMoney()
updateAddButton()