const apiKey = '50baf0b882dcc93beee1ce4e66301f38';

document.getElementById("submitBtn").addEventListener("click", getW);

async function getCoordinates(cityName) {    
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = { lat: data[0].lat, lon: data[0].lon };
    return coordinates;
  } catch (error) {
    console.error(error);
  }
}

async function getW(event) {
  event.preventDefault();
  
  const cityName = document.getElementById('name').value;
  const { lat, lon } = await getCoordinates(cityName);

  const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const celsius = temperature - 273.15;

    document.getElementById("temperature").innerHTML = Math.round(celsius) +" °";
    document.getElementById("description").innerHTML = description;
    document.getElementById("humidity").innerHTML = `${humidity} %`;

  } catch (error) {
    console.error(error);
  }
}
