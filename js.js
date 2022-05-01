import CardinalDirection from "./functions.js"

const d = document
var temp,
    jsonW, url
var today = new Date()
const numDay = today.getDate()
const month = today.toLocaleString('default', { month: 'short' });
const day = today.toLocaleString('default', { weekday: 'short' });

const $imgWeather = d.querySelector('.main-img'),
    $temperature = d.querySelector('.temperature'),
    $weather = d.querySelector('.weather'),
    $date = d.querySelector('.date'),
    $location = d.querySelector('.location')

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crds = pos.coords,
        la = crds.latitude,
        lo = crds.longitude;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}6&appid=41e23dfbd4583cbf92399fea3863f058&lang=es`
    fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            DataSquares(json)
            jsonW = json
            d.querySelector('.loader').style.display = 'none'
            $imgWeather.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            temp = jsonW.main.temp - 273.15

            $temperature.textContent = ` ${temp.toFixed(0)}°`
            $weather.textContent = `${json.weather[0].description}`
            $date.textContent = `Hoy • ${day + ' ' + numDay + ' ' + month
                }`
            $location.innerHTML = ` <img style="width:17px;"src="./assets/marcador-de-posicion.png" alt=""> ${json.name}`
        })


}
function error(err) {
    console.log(err)
}
navigator.geolocation.getCurrentPosition(success, error, options)

const $imagesOther = d.querySelectorAll('.image'),
    $maxTemperatures = d.querySelectorAll('.max-temp'),
    $minTemperatures = d.querySelectorAll('.min-temp'),
    $datesWeather = d.querySelectorAll('.date-weather')

async function weatherDays() {
    try {
        const url = 'https://api.openweathermap.org/data/2.5/onecall/?q=toluca&exclude=minutely,hourly&appid=41e23dfbd4583cbf92399fea3863f058'
        var response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=19.2979&lon=-99.664&exclude=minutely,hourly&appid=41e23dfbd4583cbf92399fea3863f058'),
            jsonDays = await response.json()


        d.querySelector('.loader').style.display = 'none'


        for (let i = 0; i < 5; i++) {
            $imagesOther[i].src = `http://openweathermap.org/img/wn/${jsonDays.daily[i + 1].weather[0].icon}@2x.png`
            const liveDate = jsonDays.daily[i + 1].dt
            const miliseconds = liveDate * 1000
            const dateObject = new Date(miliseconds)
            const month = dateObject.toLocaleString('default', { month: 'short' });
            const numberDay = dateObject.toLocaleString("en-US", { day: "numeric" })
            const day = dateObject.toLocaleString('default', { weekday: 'short' })
            $datesWeather[i].textContent = day + "," + numberDay + " " + month
            const tempMax = (jsonDays.daily[i + 1].temp.max - 273.15).toFixed(0)
            const tempMin = (jsonDays.daily[i + 1].temp.min - 273.15).toFixed(0)
            $maxTemperatures[i].textContent = `${tempMax}°C`
            $minTemperatures[i].textContent = `${tempMin}°C`
        }

    } catch (err) {
        console.log(err)
    }
}

weatherDays()


function DataSquares(json) {

    d.querySelector('.loader').style.display = 'none'
    $imgWeather.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    temp = json.main.temp - 273.15

    $temperature.textContent = ` ${temp.toFixed(0)}°`
    $weather.textContent = `${json.weather[0].description}`
    $date.textContent = `Hoy • ${day + ' ' + numDay + ' ' + month}`

    $location.textContent = json.name
    const wind = ((json.wind.speed) * 3.6).toFixed(0)
    d.querySelector('.wind').innerHTML = `${wind} `
    const Grades = json.wind.deg

    d.querySelector('.direction').innerHTML = ` <img class='direcciones' src="./assets/direcciones.png" alt=""> ${CardinalDirection(Grades)}`
    d.querySelector('.percent-hum').textContent = `${json.main.humidity}%`
    const visi = ((json.visibility) / 1000).toFixed(1)
    d.querySelector('.vista').textContent = `${visi}`
    d.querySelector('.presion').textContent = `${json.main.pressure}`
}


d.getElementById('searching').addEventListener('change', e => {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${e.target.value}&appid=41e23dfbd4583cbf92399fea3863f058&lang=es`)
            .then(res => res.ok ? res.json() : alert('Hubo un error en tu busqueda intenta de nuevo'))
            .then(json => {
                d.querySelector('.loader').style.display = 'none'

                $imgWeather.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
                temp = json.main.temp - 273.15

                $temperature.textContent = `${temp.toFixed(0)}°`
                $weather.textContent = `${json.weather[0].description}`
                $date.textContent = `Hoy • ${day + ' ' + numDay + ' ' + month
                    }`
                $location.innerHTML = ` <img style="width:17px;"src="./assets/marcador-de-posicion.png" alt=""> ${json.name}`

            })
    } catch (err) {
        console.log(err)
    }

})


/*

*/