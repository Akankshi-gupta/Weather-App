var UNIT_FLAG = "celsius";
const apiKey = "YOUR WEATHERMAP API KEY GOES HERE";
var TEMP;
function hideButton() {
    var celsius = document.getElementById('celsius');
    var kelvin = document.getElementById('kelvin');
    var fahrenheit = document.getElementById('fahrenheit');
    if (UNIT_FLAG == "celsius") {
        celsius.style.display = 'none';
        kelvin.style.display = 'block';
        fahrenheit.style.display = 'block';

    }
    if (UNIT_FLAG == "kelvin") {
        kelvin.style.display = 'none';
        celsius.style.display = 'block';
        fahrenheit.style.display = 'block';

    }
    if (UNIT_FLAG == "fahrenheit") {
        fahrenheit.style.display = 'none';
        celsius.style.display = 'block';
        kelvin.style.display = 'block';
    }

}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, failure)
}
else {
    console.log("not allowed")
}
async function searchCity() {
    let search = document.getElementById('search_input').value;
    if (!search) {
        alert("Please enter your city!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`

    let data = await makeRequest(url);

    showData(data);


}
async function success(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

    let data = await makeRequest(url);
    showData(data);





}
function showData(data) {

    let name = data['name'];
    let temperature = data['main']['temp'];
    temperature = kelvinToCelsius(temperature);
    UNIT_FLAG = "celsius";
    TEMP = temperature;
    hideButton();
    let country = data['sys']['country'];
    let main = data['weather']['0']['main'];
    setBackground(main);
    let icon = data['weather']['0']['icon'];

    let sunrise = new Date(data['sys']['sunrise'] * 1000).toLocaleTimeString();
    let sunset = new Date(data['sys']['sunset'] * 1000).toLocaleTimeString();
    let wind = data['wind']['speed'];
    let humidity = data['main']['humidity'];
    let feels_like = data['main']['feels_like'];
    let visibility = data['visibility'];
    let pressure = data['main']['pressure'];
    let rain = "";
    if ("rain" in Object.keys(data)) {
        rain = data['rain']['1h'];

    }
    let clouds = data['clouds']['all'];

    let name_data = document.getElementById('name');
    let temperature_data = document.getElementById('temperature');
    let country_data = document.getElementById('country');
    let main_data = document.getElementById('main');
    let icon_data = document.getElementById('wicon');
    let sunrise_data = document.getElementById('sunrise');
    let sunset_data = document.getElementById('sunset');
    let wind_data = document.getElementById('wind');
    let humidity_data = document.getElementById('humidity');
    let feels_like_data = document.getElementById('feels_like');
    let visibility_data = document.getElementById('visibility');
    let pressure_data = document.getElementById('pressure');
    let rain_data = document.getElementById('rain');
    let clouds_data = document.getElementById('clouds');

    name_data.textContent = name;
    temperature_data.innerHTML = `${temperature} &deg;C`;
    country_data.textContent = country;
    main_data.textContent = main;
    icon_data.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
    sunrise_data.textContent = sunrise;
    sunset_data.textContent = sunset;
    wind_data.textContent = wind;
    humidity_data.textContent = humidity;
    feels_like_data.textContent = feels_like;
    visibility_data.textContent = visibility;
    pressure_data.textContent = pressure;
    rain_data.textContent = rain != undefined ? rain : "";
    clouds_data.textContent = clouds;





    document.getElementById('Weather').style.display = 'block';



}
function toKelvin() {
    if (UNIT_FLAG == "celsius") {
        let temp = celsiusToKelvin(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;K`;
        UNIT_FLAG = "kelvin";
        TEMP = temp;
        hideButton();
    }
    if (UNIT_FLAG == "fahrenheit") {
        let temp = fahrenheitToCelsius(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;K`;
        UNIT_FLAG = "kelvin";
        TEMP = temp;
        hideButton();
    }
}
function toFahrenheit() {
    if (UNIT_FLAG == "celsius") {
        let temp = celsiusToFahrenheit(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;F`;
        UNIT_FLAG = "fahrenheit";
        TEMP = temp;
        hideButton();
    }
    if (UNIT_FLAG == "kelvin") {
        let temp = kelvinToFahrenheit(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;F`;
        UNIT_FLAG = "fahrenheit";
        TEMP = temp;
        hideButton();
    }

}
function toCelsius() {
    if (UNIT_FLAG == "kelvin") {
        let temp = kelvinToCelsius(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;C`;
        UNIT_FLAG = "celsius";
        TEMP = temp;
        hideButton();
    }
    if (UNIT_FLAG == "fahrenheit") {
        let temp = fahrenheitToCelsius(TEMP);
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${temp} &deg;C`;
        UNIT_FLAG = "celsius";
        TEMP = temp;
        hideButton();
    }

}

function celsiusToKelvin(celsius) {
    return Math.floor(celsius + 273.15);
}
function celsiusToFahrenheit(celsius) {
    return Math.floor((celsius * 9 / 5) + 32);
}
function kelvinToCelsius(kelvin) {
    return Math.floor(kelvin - 273.15);
}
function kelvinToFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * 9 / 5 + 32);
}
function fahrenheitToCelsius(fahrenheit) {
    return Math.floor((fahrenheit - 32) * 5 / 9);
}
function fahrenheitToKelvin(fahrenheit) {
    return Math.floor((fahrenheit - 32) * 5 / 9 + 273.15);
}

function failure(error) {
    console.error(error);
}
function setBackground(weatherType) {
    let background = document.getElementById('back-images');
    const hazeArray = ['mist', 'smoke', 'haze', 'dust', 'fog', 'sand', 'ash', 'squall', 'tornado'];
    if (weatherType.toLowerCase().includes("rain")) {
        background.setAttribute('background', '/images/Rain.jpg');
    }
    if (weatherType.toLowerCase().includes('clear')) {
        background.setAttribute('background', '/images/Clear.jpg');
    }
    if (weatherType.toLowerCase().includes('drizzle')) {
        background.setAttribute('background', '/images/Drizzle.jpg');
    }
    if (weatherType.toLowerCase().includes('snow')) {
        background.setAttribute('background', '/images/Snow.jpg');
    }
    if (weatherType.toLowerCase().includes('thunderstorm')) {
        background.setAttribute('backgrpund', '/images/Thunderstorm.jpg');
    }
    if (hazeArray.includes(weatherType.toLowerCase())) {
        background.setAttribute('background', '/images/Haze.jpg');
    }
    if (weatherType.toLowerCase().includes('clouds')) {
        background.setAttribute('background', '/images/Clouds.jpg');
    }



}


async function makeRequest(url) {
    /* let response = await fetch(url);
    let json_format = await response.json();
    return json_format; */
}

