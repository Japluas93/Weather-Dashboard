// function to display weather for current day
function todayWeather(currentWeather) {
  var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentWeather +
    "&appid=" +
    apiKey;
  // Ajax call to access weather data for today
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#weatherIcon").empty();

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    fiveDayForecast(currentWeather, lat, lon);
    var currentDate = moment().format("dddd, MM-DD-YYYY");
    var fahrDegrees =
      Math.round(Math.floor(response.main.temp - 273.15)) * 1.8 + 32 + " ℉";
    var weatherImage = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
    );
    // Dynamically rendering data to the front-end using jQuery
    $("#city").text(response.name);
    $("#currentday").text(currentDate);
    $("#weatherIcon").append(weatherImage);
    $("#currenttemp").text("Temperature: " + fahrDegrees);
    $("#currentwind").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#currenthumidity").text("Humidity: " + response.main.humidity + "%");
  });
}
// User weather button
$("#forecastbutton").on("click", function (event) {
  event.preventDefault();
  var currentCity = $("#userinput").val();
  console.log(currentCity);
  todayWeather(currentCity);
  fiveDayForecast(currentCity);
});

function fiveDayForecast(cityName) {
  var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
  var queryURLFiveDays =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  // Ajax call for the 5 day forecast
  $.ajax({
    url: queryURLFiveDays,
    method: "GET",
  }).then(function (forecastData) {
    console.log(forecastData);
    // console.log(forecastData.daily[0].dt);
    $("#currentuv").text("UV: " + forecastData.current.uvi);

    $("#dayone").html(`<div class="card">
    <div class="card-body">
      <p id="date" class="card-text">${new Date(
        forecastData.list[0].clouds.dt
      ).toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.list[0].main.temp
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.list[0].main.humidity
      }% </p>
    </div>
  </div>`);
    $("#daytwo").html(`<div class="card">
    <div class="card-body">
    <p id="date" class="card-text">${new Date(
      forecastData.daily[1].dt
    ).toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[2].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[2].humidity
      }% </p>
    </div>
  </div>`);
    $("#daythree").html(`<div class="card">
    <div class="card-body">
    <p id="date" class="card-text">${new Date(
      forecastData.daily[2].dt
    ).toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[3].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[3].humidity
      }% </p>
    </div>
  </div>`);
    $("#dayfour").html(`<div class="card">
    <div class="card-body">
    <p id="date" class="card-text">${new Date(
      forecastData.daily[4].dt
    ).toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[4].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[4].humidity
      }% </p>
    </div>
  </div>`);
    $("#dayfive").html(`<div class="card">
    <div class="card-body">
    <p id="date" class="card-text">${new Date(
      forecastData.daily[5].dt
    ).toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[5].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[5].humidity
      }% </p>
    </div>
  </div>`);
  });
}
