init()
const currentDate = moment();
var citySearch = $("#city");
var searchBtn = $(".search-btn");
var city = $("#chosen-city");
var currentWeatherTitle = $("#current-weather");
var currentWeatherIcon = $("#current-weather-icon");
var currentTemperatureEl = $("#currentTemp");
var currentHumidityEl = $("#currentHumidity");
var currentWindSpeedEl = $("#currentWindSpeed");
var currentUvIndexEl = $("#currentUvIndex");
var cityInfo = [];





for (var i = 0; i<localStorage.length; i++) {
    var pastCity = localStorage.getItem(i);
    var pastCityName = $("#past-search-buttons").addClass("past-search-city");

    pastCityName.append("<li>" + pastCity + "</li>");
}
function init() {
    // fetchGPS("Durham");
    
}

searchBtn.on("click", function(){
    var cityInput = $(".form-input").val();
    console.log("button click ", cityInput)
    fetchGPS(cityInput);
   

});

function fetchGPS(cityInput) {
    console.log("city input inside fetchgps", cityInput);
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=1c98b5aa11143eaafd210d8e853c0df1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            var userCity = data[0].name;
            console.log(data[0].name);
            
            fetchWeather(lat, lon, userCity);
            console.log(data)
        })
}

function fetchWeather(lat, lon, userCity) {
    console.log("USER CITY IN FETCH WEATHER", userCity)
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=1c98b5aa11143eaafd210d8e853c0df1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Get weather icon
            console.log(data);

            var currentWeather = {
                weatherIcon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png",
                temp: data.current.temp + "F",
                windSpeed: data.current.wind_speed + " MPH",
                humidity: data.current.humidity + "%",
                UVI: data.current.uvi,
            };

            var fiveDayForecast = [];

            for(var i = 0; i < 5; i++) {
                fiveDayForecast.push(
                    {
                        weatherIcon: "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png",
                        temp: data.daily[i].temp.max + " F",
                        windSpeed: data.daily[i].wind_speed + " MPH",
                        humidity: data.daily[i]. humidity + "%",
                    }
                );
                console.log(currentWeather);
            }

            showForecast(currentWeather);

            function showForecast(currentWeather) {
                currentWeatherTitle.text(userCity + " (" + currentDate.format("M/D/YYYY") + ")");
                currentWeatherIcon.attr("src", currentWeather.weatherIcon);
                currentTemperatureEl.text(currentWeather.temp);
                currentHumidityEl.text(currentWeather.humidity);
                currentWindSpeedEl.text(currentWeather.windSpeed);
                currentUvIndexEl.text(currentWeather.UVI);

                if (currentWeather.UVI < 4) {
                    currentUvIndexEl.attr("class", "favorable")
                } else if (currentWeather.UVI > 4 || UVI < 9) {
                    currentUvIndexEl.attr("class", "moderate")
                } else {
                    currentUvIndexEl.attr("class", "severe")
                }

            };
        });
    };

    console.log(fetchGPS);
    console.log(fetchWeather);
    