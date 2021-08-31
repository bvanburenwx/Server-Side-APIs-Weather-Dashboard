$(document).ready(function () {
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

  searchBtn.click(function () {
    var cityInput = $(".form-input").val();
    console.log("button click ", cityInput);
    cityHistory.push(cityInput);
    localStorage.setItem("searchHistory", JSON.stringify(cityHistory));
    fetchGPS(cityInput);
  });

  var cityClick;
  $(document).on("click", ".cityButton",function(e) { 
    e.preventDefault();

    console.log("CLicked city button!!!!")
    cityClick = $(this).attr("data-name")
    console.log("CITY CLICK IN CITY BUTTON", cityClick)
    fetchGPS(cityClick);
  });

  function fetchGPS(cityInput, cityClick) {
    console.log("city input inside fetchgps", cityInput);
    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        cityInput +
        "&limit=1&appid=1c98b5aa11143eaafd210d8e853c0df1"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;

        var userCity = data[0].name;
        console.log(data[0].name);

        fetchWeather(lat, lon, userCity);
        console.log(data);
      });
  }

  function fetchWeather(lat, lon, userCity) {
    console.log("USER CITY IN FETCH WEATHER", userCity);
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=minutely,hourly,alerts&units=imperial&appid=1c98b5aa11143eaafd210d8e853c0df1"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Get weather icon
        console.log(data);

        var currentWeather = {
          weatherIcon:
            "http://openweathermap.org/img/wn/" +
            data.current.weather[0].icon +
            "@2x.png",
          temp: data.current.temp + "F",
          windSpeed: data.current.wind_speed + " MPH",
          humidity: data.current.humidity + "%",
          UVI: data.current.uvi,
        };

        var fiveDayForecast = [];

        for (var i = 0; i < 5; i++) {
          fiveDayForecast.push({
            weatherIcon:
              "https://openweathermap.org/img/wn/" +
              data.daily[i].weather[0].icon +
              ".png",
            temp: data.daily[i].temp.max + " F",
            windSpeed: data.daily[i].wind_speed + " MPH",
            humidity: data.daily[i].humidity + "%",
          });
          console.log(currentWeather);
          console.log(fiveDayForecast);
        }

        showCurrent(currentWeather);
        showForecast(fiveDayForecast);

        function showCurrent(currentWeather) {
          currentWeatherTitle.text(
            userCity + " (" + currentDate.format("M/D/YYYY") + ")"
          );
          currentWeatherIcon.attr("src", currentWeather.weatherIcon);
          currentTemperatureEl.text(currentWeather.temp);
          currentHumidityEl.text(currentWeather.humidity);
          currentWindSpeedEl.text(currentWeather.windSpeed);
          currentUvIndexEl.text(currentWeather.UVI);

          if (currentWeather.UVI < 4) {
            currentUvIndexEl.attr("class", "favorable");
          } else if (currentWeather.UVI > 4 || UVI < 9) {
            currentUvIndexEl.attr("class", "moderate");
          } else {
            currentUvIndexEl.attr("class", "severe");
          }
        }

        function showForecast(fiveDayForecast) {
          console.log("FIVE DAY FORECAST", fiveDayForecast);
          for (let i = 0; i < 5; i++) {
            var forecastCol = $('<div class="col-sm">');
            var forecastCard = $('<div class="card">');
            var forecastHeader = $('<div class="card-header">');
            var forecastBody = $('<div class="card-body">');
            var forecastDates = moment().add(i, "days").format("L");
            var forecastIcon = $("<img>").attr(
              "src",
              fiveDayForecast[i].weatherIcon
            );
            var forecastTemp = $("<p>").text(
              "Temperature: " + fiveDayForecast[i].temp
            );
            var forecastHumidity = $("<p>").text(
              "Humidity: " + fiveDayForecast[i].humidity
            );
            var forecastWindSpeed = $("<p>").text(
              "Wind Speed " + fiveDayForecast[i].windSpeed
            );

            forecastHeader.append(forecastDates);
            forecastCol.append(forecastCard);
            forecastCard.append(forecastHeader, forecastBody);
            forecastBody.append(
              forecastIcon,
              forecastTemp,
              forecastHumidity,
              forecastWindSpeed
            );

            $(".five-day").append(forecastCol);
          }
          console.log("in show forecast function", fiveDayForecast);
        }
      });
  }

  console.log(fetchGPS);
  console.log(fetchWeather);
  var cityHistory = ["New York", "Miami", "Chicago", "Houston"];
  function storageCheck() {
    var storageCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storageCities !== null) {
      cityHistory = storageCities;
    }
    renderButtons();
  }

  var newButton;
  function renderButtons() {
    for (let i = 0; i < cityHistory.length; i++) {
      var cityName = cityHistory[i];

      newButton = $("<button class='btn cityButton'>");
      newButton.attr("data-name", cityName);
      newButton.text(cityName);

      $("#past-search-buttons").append(newButton);
    }
  }
  storageCheck();
});
