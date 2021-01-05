const currentWeather = document.querySelector('.current-conditions')

let currentWeatherData = {}
const apiKey = 'cf433f1a53ae59ff9177bd8028acc436';
let xhr = new XMLHttpRequest ()
xhr.open('GET', `api.openweathermap.org/data/2.5/weather?q=winnipeg&appid=${apiKey}&units=metric`)
xhr.responseType = 'text';

xhr.addEventListener('load', function() {
  if(xhr.status === 200) {
    currentWeather.textContent = "success";
    currentWeatherData = JSON.parse(xhr.responseText)
    showWeatherinfo()
  } else {
    currentWeather.textContent =`error: ${xhr.status}`

  }

}, false);
xhr.send()

function showWeatherinfo() {

  const location = currentWeatherData.name
  const temp = currentWeatherData.main.temp
  const main = currentWeatherData.weather.main
  const icon = currentWeatherData.weather.icon


  const string = `${temp} ${icon} ${main}`
  currentWeather.textContent = string

}