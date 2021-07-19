const currentDate = moment();

function init() {
    fetchLatLon("Durham");
}


function fetchLatLon(cityInput) {
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
        })
}

init();
