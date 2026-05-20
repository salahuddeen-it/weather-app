    const apiKey = "c3d8424862c98088d8e76a2f9d2e85fb";

async function getWeather() {

  const city = document.getElementById("cityInput").value;

  if(city === ""){
    alert("Please enter city name");
    return;
  }

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    displayWeather(data);

  } catch(error){

    console.log(error);

  }

}


function getCurrentLocationWeather() {

  navigator.geolocation.getCurrentPosition(

    async function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        displayWeather(data);

      }

      catch(error) {

        console.log(error);

      }

    }

  );

}



function displayWeather(data){

  const result =
  document.getElementById("weatherResult");

  if(data.cod != 200){

    result.innerHTML = "City not found ❌";

    return;
  }

  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const condition = data.weather[0].main;
  const description = data.weather[0].description.toUpperCase();
  console.log(data);
  console.log(condition);
  console.log(description);

  let icon = "";

    // background Change Code
    // Thunderstorm FIRST (priority)
if (description.includes("thunderstorm")) {
  icon = "⛈️🌩️";
      document.body.style.backgroundImage =
  "url('images/thunderstorm.gif')";
    }


else if(description.includes("Snow")){
  icon = "❄️";

  document.body.style.backgroundImage =
  "url('images/snow.gif')";

}

else if(condition === "Rain"){
  icon = "🌦️";

  document.body.style.backgroundImage =
  "url('images/raine.gif')";

}

else if(condition === "Clouds"){
  icon = "☁️";

  document.body.style.backgroundImage =
  "url('images/cloud.AVIF')";

}

else if(condition === "Clear"){
  icon = "☀️";

  document.body.style.backgroundImage =
  "url('images/sunny.jpg')";

}

else{

  document.body.style.backgroundImage =
  "url('images/background.jpg')";

}
  result.innerHTML = `
  
    <h2>${data.name}</h2>
    <h2>Weather: ${icon} ${description}</h2> <br> <p>Condition: ${condition}</p>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>

  `;

}