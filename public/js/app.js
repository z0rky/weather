
const locationForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_one')
const messageTwo = document.querySelector('#message_two')

locationForm.addEventListener('submit', event => {
    event.preventDefault()
    const location = search.value
    console.log(location)
    weather(location)
    
})

const weather = (location) => {
    if(location){
        messageOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
        if(data.error){
            messageOne.textContent = ' error fetching data'
        }else{
            messageOne.textContent = data.weather.location
            messageTwo.textContent = data.weather.foreCast
        }
        })
})
    }else{
        messageOne.textContent = 'no location given'
    }
}
