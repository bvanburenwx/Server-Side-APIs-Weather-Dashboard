init()
const currentDate = moment();
var citySearch = $("#city");
var searchBtn = $("#search-btn");
var city = $("#chosen-city");
var cityInfo = [];

var cityInput = $(".form-input").val();


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
            console.log(data)
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

            getForecast(data);

            function getForecast() {
                var currentForecast = $("#currentForecast").append("<div>").addClass("forecast-body")
                currentForecast.empty();
                var cityName = currentForecast.append("<p>");
            
                currentForecast.append(cityName);
            
                var currentTemp = cityName.append("<p>")

                cityName.append(currentTemp);
            
                currentTemp.append("<p>" + "Temperature: "  + data.current.temp + "</p>");

                currentTemp.append("<p>" + "Humidity: "  + data.current.humidity + "</p>");

                currentTemp.append("<p>" + "Wind-Speed: "  + data.current.wind_speed + "</p>");

                currentTemp.append("<p>" + "UV Index: "  + data.current.uvi + "</p>");

            };
        });
    };

    console.log(fetchGPS);