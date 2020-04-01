const API_KEY = "d0fc8c598c1427ba975115b0ab653892";
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d0fc8c598c1427ba975115b0ab653892

window.addEventListener("load", () => {
  setIcons = () => {
    const skycons = new Skycons({ color: "white" });
    skycons.play();
    const iconId = document.querySelector(".icon");
    return skycons.set(iconId, Skycons.PARTLY_CLOUDY_DAY);
  };

  setIcons();
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".degree-section span");

  let temperature, summary, location;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=tr`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          temperature = data.main.temp;
          summary = data.weather[0].description;
          location = data.name;

          //Set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = location;

          toggleTemperatureUnit(temperature);
        });
    });
  }

  toggleTemperatureUnit = temperature => {
    temperatureSection.addEventListener("click", () => {
      if (temperatureSpan.textContent === "K") {
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = (temperature - 273.15).toFixed(2);
      } else {
        temperatureSpan.textContent = "K";
        temperatureDegree.textContent = temperature;
      }
    });
  };
});
