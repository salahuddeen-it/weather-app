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
  let music = document.getElementById("weatherMusic");

    // background Change Code
    // Thunderstorm FIRST (priority)
if (description.includes("thunderstorm")) {
  icon = "⛈️🌩️";
      document.body.style.backgroundImage =
  "url('images/thunderstorm.gif')";
  
  music.src = "music/thunderstorm.mp3";
  music.play();
  repeatCount = 20;
    }


else if(description.includes("Snow")){
  icon = "❄️";

  document.body.style.backgroundImage =
  "url('images/snow.gif')";

    music.src = "music/snow.mp3";
  music.play();

}

else if(condition === "Rain"){
  icon = "🌦️";

  document.body.style.backgroundImage =
  "url('images/rain.gif')";

    music.src = "music/rain.mpeg";
      music.play();

}

else if(condition === "Clouds"){
  icon = "☁️";

  document.body.style.backgroundImage =
  "url('images/cloud.jpg')";

    music.src = "music/clear.mp3";
      music.play();

}

else if(condition === "Clear"){
  icon = "☀️";

  document.body.style.backgroundImage =
  "url('images/sunny.jpg')";

    music.src = "music/clear-sky.mp3";
    music.play();
    repeatCount = 1;
    
}

else{

  document.body.style.backgroundImage =
  "url('images/background.jpg')";

  music.src = "music/birds.mp3";
  music.play();

}
  result.innerHTML = `
  
    <h2>${data.name}</h2>
    <h2>Weather: ${icon} ${description}</h2> <br> <p>Condition: ${condition}</p>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>

  `;

}

let music =
document.getElementById("weatherMusic");

let count = 0;

music.addEventListener("ended", function(){

  count++;

  if(count < 2){

    music.play();

  }

});

// For Background Audio //
window.addEventListener("load", () => {

  const music =
  document.getElementById("bgMusic");

  music.volume = 1;

  music.play();

});
document.body.addEventListener("click", () => {

  const music =
  document.getElementById("bgMusic");

  music.play();

});

// Current Date & Time
function updateDateTime(){

  const now = new Date();

  const date = now.toLocaleDateString();

  const time = now.toLocaleTimeString();

  document.getElementById("dateTime").innerHTML =
  `${date} | ${time}`;

}

updateDateTime();
setInterval(updateDateTime, 1000);
