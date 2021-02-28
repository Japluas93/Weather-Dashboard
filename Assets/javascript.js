var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
var dayOne = new Date(1611680400000);
var dayTwo = new Date(1611766800000);
var dayThree = new Date(1611853200000);
var dayFour = new Date(1611939600000);
var dayFive = new Date(1612026000000);
console.log(dayOne.toDateString());
// Ajax call for today's weather
$.ajax(
  "http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&appid=" +
    apiKey
).then(function (data) {
  console.log(data);
  $("#city").text("City: " + data.name);
  $("#currenttemp").text("Temperature: " + data.main.temp);
  $("#currentwind").text("Wind Speed: " + data.wind.speed + " MPH");
  $("#currenthumidity").text("Humidity: " + data.main.humidity + "%");
  // Ajax call for the 5 day forecast
  $.ajax(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      "&units=imperial&appid=" +
      apiKey
  ).then(function (forecastData) {
    console.log(forecastData);
    $("#currentuv").text("UV: " + forecastData.current.uvi);

    $("#dayone").html(`<div class="card">
    <div class="card-body">
      <p id="date" class="card-text">${dayOne.toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[1].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[1].humidity
      }% </p>
    </div>
  </div>`);
    $("#daytwo").html(`<div class="card">
    <div class="card-body">
    <p id="date" class="card-text">${dayTwo.toDateString()} </p>
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
    <p id="date" class="card-text">${dayThree.toDateString()} </p>
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
    <p id="date" class="card-text">${dayFour.toDateString()} </p>
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
    <p id="date" class="card-text">${dayFive.toDateString()} </p>
      <p id="currenttemp" class="card-text">Temp: ${
        forecastData.daily[5].temp.day
      } F</p>
      <p id="currenthumidity" class="card-text">Humidity: ${
        forecastData.daily[5].humidity
      }% </p>
    </div>
  </div>`);
  });
});

// User weather button
$("#forecastbutton").on("click", function (event) {
  event.preventDefault();
  var currentCity = $("#userinput").val();
  console.log(currentCity);
  $("#userinput").val("");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&appid=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Log the queryURL
    console.log("queryURL: ", queryURL);

    // Log the resulting object
    console.log("response.coord: ", response.coord);
    lat = response.coord.lat;
    lon = response.coord.lon;
  });
});
