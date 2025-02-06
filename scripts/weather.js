const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weatherDesc');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=-20.57266509249185&lon=-48.567067915293904&units=metric&appid=bf4bfee1ad11f82006a74a4d5990e597";
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } 
    catch (error) {
        console.error(error);
    }
}

function displayResults (data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt',`${desc} icon`);
    weatherDesc.textContent = `- ${desc}`;
}

apiFetch();