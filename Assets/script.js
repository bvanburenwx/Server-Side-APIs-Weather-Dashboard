init()
const currentDate = moment();
var citySearch = $("#city");
var searchBtn = $("#search-btn");
var cityName = $("#chosen-city");
var cityInfo = [];


for (var i = 0; i<localStorage.length; i++) {
    var pastCity = localStorage.getItem(i);
    var pastCityName = $("#past-search-buttons").addClass("past-search-city");

    pastCityName.append("<li>" + pastCity + "</li>");
}
function init() {
    fetchGPS("Durham");
}

function fetchGPS(cityInput) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=1c98b5aa11143eaafd210d8e853c0df1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            fetchWeather(lat, lon);
        })
}
function fetchWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=1c98b5aa11143eaafd210d8e853c0df1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Get weather icon
            console.log(data);

            cityName.textcontent = '${city} (${moment().format("M/D/YYYY")})';

            getForecast(data);
            fiveday(data);
        })
}

searchBtn.click(fetchGPS);