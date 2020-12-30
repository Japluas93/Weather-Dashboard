var apiKey = "48af17a7060c2205e40c1b9e5e56df19";

$.ajax(
  "http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&appid=48af17a7060c2205e40c1b9e5e56df19"
).then(function (data) {
  console.log(data);
  $("#city").text(data.name);
});
console.log("hello");
