const API_KEY = "d0fc8c598c1427ba975115b0ab653892";
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d0fc8c598c1427ba975115b0ab653892

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => console.log(data));
    });
  }
});
