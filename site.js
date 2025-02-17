console.log('eqwoigbqeiuogbqeoigbqegoiqebgqeoiugbweroigbwargiujwsrabgliwarujgb')

const urls = [
    'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
].map(url => { (new Image()).src = url; return url })

const images = document.querySelectorAll('#carousel img')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

const key = "It's a secret to everybody."

const welcome = document.querySelector('.welcome')
const hours = new Date().getHours() // get the current hour
const isMorning = hours >= 4 && hours < 12 // is it morning?
const isAfternoon = hours >= 12 && hours < 17 // is it afternoon?
const isEvening = hours >= 17 || hours < 4 // is it evening?
if(isMorning){
    welcome.textContent = 'Good Morning!';
}
else if(isAfternoon){
    welcome.textContent = 'Good Afternoon!!!!!';
}
else if(isEvening){
    welcome.textContent = 'Good EVENING!!!';
}

secretMessage = "it's a reference to the 2nd best zelda game"
localStorage.setItem(key, secretMessage)

//figured it was good practice to reset timer per click
let currentImage = 0
function startInterval() {
    practice = setInterval(() => {
    currentImage++
    console.log('potato')
    showImages()
}, 5000)
}
function resetInterval() {
clearInterval(practice)
startInterval()
}
startInterval()
prev.addEventListener('click', () => {
    currentImage--
    showImages()
    resetInterval()
})
next.addEventListener('click', () => {
    currentImage++
    showImages()
    resetInterval()
})

const showImages = () => {
    const offset = currentImage % urls.length
    images.forEach((image, index) => {
        const imageIndex = (index + offset + urls.length) % urls.length
        image.src = urls[imageIndex]
    })
}

showImages()
