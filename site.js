

const welcome = document.querySelector('#welcome')
const hours = new Date().getHours()
const isMorning = hours >= 4 && hours < 12 
const isAfternoon = hours >= 12 && hours < 17 
const isEvening = hours >= 17 || hours < 4 
if(isMorning){
    welcome.textContent = 'good morning!';
}
else if(isAfternoon){
    welcome.textContent = 'good afternoon!';
}
else if(isEvening){
    welcome.textContent = 'good evening!';
}




