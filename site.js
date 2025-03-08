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



const addButton = document.querySelector('#todoButton')
const addInput= document.querySelector('#new-todo')
const todoList = document.querySelector('.todo-list')
const todos = JSON.parse(localStorage.getItem('todo-list')) || []

addButton.addEventListener('click', () => {

const inputText = addInput.value

if(inputText) 
{
    todos.push({ text: inputText, completed: false })
    renderTodos()
    localStorage.setItem('todo-list', JSON.stringify(todos))
}
    addInput.value = ''
    console.log('potato')
})
 
function renderTodos() {
    todoList.innerHTML = ''
    todos.map(todo => {
        const li = document.createElement('li')
        li.textContent = todo.text
        todoList.append(li)
    })   
}

const pokemonImage = document.querySelector('#pokemonImage');

(async () => {



/* So the way I understand this is this function is what fetches the data
Step one: create the arrow function
Step two: create the url variable
Step three: fetch the data from the url
Step four: parse the data
Step five: return the data as an object
*/

const getRandomPokemon = async() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 150)
    //is this the equivalent of response.on('data'...)?
    const response = await fetch(url)
    //is this the equivalent of response.on('end'...)?
    const pokemonImages = await response.json()
    //this is what returns the object after the JSONparse?
    return pokemonImages
}

/* The way I understand this function is that is takes the object returned in the getRandomPokemon function and tells it what to populate
Step one: Create the arrow function
Step two: clear the innerhtml for where the image will be placed
Step three: create the img element
Step four: *****grabbing the image source with the api fetch*****????? I'm not exactly sure how to word that
but the way I understand it is I'm taking the previously returned object data and taking a specific portion of it to be displayed i.e. the sprite of the pokemon
Step five: " but for the name
Step six: append the div with the image
*/

const renderPokemon = (pokemonImages /*return object taken as parameter?*/) => {

    pokemonImage.innerHTML = ''

    const img = document.createElement('img')
    img.src = pokemonImages.sprites.front_default // url of the image from the 'front_default' property ---- I don't understand the syntax for this, again i'm really struggling with the api stuff, url/sprite?
    //So it's my understanding that you take the object then list the properties until you get what information you want to display?
    img.alt = pokemonImages.name// name of the pokemon ---- same thing but name/description?
    pokemonImage.append(img)
    

}

/* I copy and pasted this from the exercise and just refilled it with the proper functions/variables etc. 

Added the renderpokemon call
*/

const imagesss = await getRandomPokemon()
renderPokemon(imagesss)
// console.log(imagesss)

/* */


})()