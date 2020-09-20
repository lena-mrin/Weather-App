let currentDate = document.querySelector("#date");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augist",
    "September",
    "October",
    "November",
    "December"
];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();
let sentence = `${day} ${month} ${date} ${year}`;

document.getElementById("date").innerHTML = sentence;

document.getElementById("time").innerHTML = `${hour}:${minute}`;

function changeCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");

    document.getElementById("city").innerHTML = `${inputCity.value}`;
    searchCity(inputCity.value);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

function changeTempCelsius(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
    searchCity(inputCity.value);
}
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", changeTempCelsius);

function changeTempFarenheit(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
    searchCityF(inputCity.value);
}
let farenheitTemp = document.querySelector("#farenheit-temp");
farenheitTemp.addEventListener("click", changeTempFarenheit);

function searchCity(city) {
    let apiKey = "862f866e1d57a0b13aa1f2ed2f86af99";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
}
function searchCityF(city) {
    let apiKey = "862f866e1d57a0b13aa1f2ed2f86af99";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
    let newTemp = Math.round(response.data.main.temp);
    let firstTemp = document.querySelector("#number");
    firstTemp.innerHTML = newTemp;
    let city = document.querySelector("#city");
    let currentCity = response.data.name;
    city.innerHTML = currentCity;
}
function givePosition(position) {
    let apiKey = "862f866e1d57a0b13aa1f2ed2f86af99";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(showTemperature);
}

function setPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(givePosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", setPosition);