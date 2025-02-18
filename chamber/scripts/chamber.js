// Get current year
const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.innerHTML = `<span class="currentyear">&copy;${today.getFullYear()} Barretos Chamber</span>`;

// Get last modification date
const lastModified = document.querySelector("#lastModified");
const latestDate = new Date(document.lastModified);
lastModified.innerHTML = `<p class="lastModified">Last Modification: ${latestDate.getMonth() + 1}/${latestDate.getDate()}/${latestDate.getFullYear()} ${latestDate.getHours()}:${latestDate.getMinutes()}:${latestDate.getSeconds()}</p>`;

// Hamburger Menu

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Home Page
if(window.location.pathname.indexOf('index.html') != -1){

	// Banner 
	const bannerContainer = document.querySelector('.banner-container');
	const closeButton = document.querySelector('.close');

	function setBannerVisibility() {
		const today = new Date().getDay();
		if (today >= 1 && today <= 3) { 
			bannerContainer.classList.remove('hide');
			closeButton.classList.remove('hide');
		} else {
			bannerContainer.classList.add('hide');
			closeButton.classList.add('hide');
		}
	}
	setBannerVisibility();

	closeButton.addEventListener('click', () => {
		bannerContainer.classList.add('hide');
		closeButton.classList.add('hide');
	});

	const weatherContent = document.querySelector('.weather-content');
	const weatherForecast = document.querySelector('.weather-forecast');

	const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=-20.57266509249185&lon=-48.567067915293904&units=metric&appid=bf4bfee1ad11f82006a74a4d5990e597";
	const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-20.57266509249185&lon=-48.567067915293904&units=metric&appid=bf4bfee1ad11f82006a74a4d5990e597";

	async function apiFetch() {
		try {
			const weatherResponse = await fetch(weatherUrl);
			const forecastResponse = await fetch(forecastUrl);

			if (weatherResponse.ok && forecastResponse.ok) {
				const weatherData = await weatherResponse.json();
				const forecastData = await forecastResponse.json();
				displayResults(weatherData, forecastData);
			} else {
				throw Error(await weatherResponse.text() && forecastResponse.text());
			}
		} catch (error) {
			console.error(error);
		}
	}

	function formatTimestamp(timestamp) {
		const date = new Date(timestamp * 1000);
		const options = { weekday: 'long', month: 'short', day: 'numeric' };
		let formattedDate = date.toLocaleDateString('en-US', options);

		formattedDate = formattedDate.replace(/\d+/, match => {
			const day = parseInt(match);
			const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
						(day % 10 === 2 && day !== 12) ? 'nd' :
						(day % 10 === 3 && day !== 13) ? 'rd' : 'th';
			return day + suffix;
		});

		return formattedDate;
	}

	function displayResults(weatherData, forecastData) {

		// Display Current Weather Info
		let weatherIcon = document.createElement('img');
		let weatherDate = document.createElement('p');
		let weatherTemp = document.createElement('p');
		let weatherCond = document.createElement('p');

		const weatherUrlIcon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
		weatherIcon.setAttribute('src', weatherUrlIcon);
		weatherIcon.setAttribute('alt', `Weather Icon`);
		weatherIcon.setAttribute('id', 'weather-icon') 
		weatherIcon.setAttribute('width', 50);
		weatherIcon.setAttribute('height', 50);

		weatherDate.setAttribute('id', 'current-date') 
		weatherDate.innerHTML = formatTimestamp(weatherData.dt);

		weatherTemp.setAttribute('id', 'temperature') 
		weatherTemp.innerHTML = `<strong>${Math.trunc(weatherData.main.temp)}&deg;C</strong>`;

		weatherCond.setAttribute('id', 'condition') 
		weatherCond.innerHTML = weatherData.weather[0].description;;

		weatherContent.appendChild(weatherIcon);
		weatherContent.appendChild(weatherDate);
		weatherContent.appendChild(weatherTemp);
		weatherContent.appendChild(weatherCond);

		// Display 3 Day Forecast Info
		const dailyTemperatures = {};
		
		forecastData.list.forEach(entry => {
			const date = entry.dt_txt.split(' ')[0];
			const tempMin = entry.main.temp_min;
			const tempMax = entry.main.temp_max;
			const icon = entry.weather[0].icon;
			
			if (!dailyTemperatures[date]) {
				dailyTemperatures[date] = { min: tempMin, max: tempMax, icon: icon };
			} else {
				dailyTemperatures[date].min = Math.min(dailyTemperatures[date].min, tempMin);
				dailyTemperatures[date].max = Math.max(dailyTemperatures[date].max, tempMax);
			}
		});
		
		const today = new Date().toISOString().split('T')[0]; 
		const nextThreeDays = Object.keys(dailyTemperatures)
			.filter(date => date > today)
			.sort()
			.slice(0, 3)
			.reduce((acc, date) => {
				acc[date] = dailyTemperatures[date];
				return acc;
			}, {});
		
		for (const date in nextThreeDays) {
			const { min, max, icon } = nextThreeDays[date];
			const weekday = new Date(date  + "T00:00").toLocaleDateString("en-US", { weekday: "short" });
			
			let forecastCard = document.createElement('div');
			let forecastDate = document.createElement('p');
			let forecastIcon = document.createElement('img');
			let forecastTemp = document.createElement('p');

			forecastCard.setAttribute('class', 'weather-box') 
			forecastDate.setAttribute('id', 'weekday-paragraph') 
			forecastDate.innerHTML = `<strong>${weekday}</strong>`;
			const forecastUrlIcon = `https://openweathermap.org/img/w/${icon}.png`;
			forecastIcon.setAttribute('src', forecastUrlIcon);
			forecastIcon.setAttribute('alt', `Weather Icon`);
			forecastIcon.setAttribute('width', 50);
			forecastIcon.setAttribute('height', 50);
			forecastTemp.setAttribute('id', 'minmax-paragraph') 
			forecastTemp.innerHTML = `${Math.trunc(min)}&deg;C/${Math.trunc(max)}&deg;C`;

			forecastCard.appendChild(forecastDate);
			forecastCard.appendChild(forecastIcon);
			forecastCard.appendChild(forecastTemp);

			weatherForecast.appendChild(forecastCard);
			}
	}

	// Display Spotlight Info
	const url = 'https://viniciuserocca.github.io/wdd230/chamber/data/members.json';
	const advertisementsContainer = document.querySelector('.advertisements-container');

	async function getMemberData() {
		const response = await fetch(url);
		const data = await response.json();
		displayMembers(data.companies);
	}

	const displayMembers = (members) => {
		const filteredMembers = members.filter(member => 
			member.membership === "Gold Member" || member.membership === "Silver Member"
		);
		const shuffledMembers = shuffleArray(filteredMembers);
		const randomMembers = shuffledMembers.slice(0, 3);

		randomMembers.forEach((member) => {
			let advertise = document.createElement('div');
			let name = document.createElement('h3');
			let message = document.createElement('div');
			let contact = document.createElement('div');
			let email = document.createElement('p');
			let phone = document.createElement('p');
			let website = document.createElement('a');

			advertise.setAttribute('id', 'advertise');
			message.setAttribute('id', 'message');
			contact.setAttribute('id', 'contact');

			name.textContent = `${member.name}`;
			message.textContent = `"${member.message}"`;
			email.textContent = `${member.email}`;
			phone.textContent = `${member.phone}`;
			website.textContent = `${member.url}`;
			website.setAttribute('href', member.url);
			website.setAttribute('id', 'company-link');
			website.setAttribute('target', '_blank');

			contact.appendChild(email);
			contact.appendChild(phone);
			contact.appendChild(website);

			advertise.appendChild(name);
			advertise.appendChild(message);
			advertise.appendChild(contact);

			advertisementsContainer.appendChild(advertise);
		});
	}

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	apiFetch();
	getMemberData();
}

// Discover Page
if(window.location.pathname.indexOf('discover.html') != -1){

	//====================== Calendar ======================//

	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth();

	function createCalendar(year, month) {
	const calendarDiv = document.querySelector(".calendar");
	calendarDiv.innerHTML = "";

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const date = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayIndex = date.getDay();

	document.getElementById("currentMonthYear").textContent = 
		`${date.toLocaleString("default", { month: "long" })} ${year}`;

	daysOfWeek.forEach(day => {
		const dayHeader = document.createElement("div");
		dayHeader.textContent = day;
		dayHeader.classList.add("day");
		calendarDiv.appendChild(dayHeader);
	});

	for (let i = 0; i < firstDayIndex; i++) {
		const emptyDiv = document.createElement("div");
		emptyDiv.classList.add("day");
		calendarDiv.appendChild(emptyDiv);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const dayDiv = document.createElement("div");
		dayDiv.textContent = day;
		dayDiv.classList.add("day");
		calendarDiv.appendChild(dayDiv);
	}
	}

	document.getElementById("prevMonth").addEventListener("click", () => {
	currentMonth--;
	if (currentMonth < 0) {
		currentMonth = 11;
		currentYear--;
	}
	createCalendar(currentYear, currentMonth);
	});

	document.getElementById("nextMonth").addEventListener("click", () => {
	currentMonth++;
	if (currentMonth > 11) {
		currentMonth = 0;
		currentYear++;
	}
	createCalendar(currentYear, currentMonth);
	});

	createCalendar(currentYear, currentMonth);

	const message = document.querySelector(".display-message");

	const now = new Date();
	const lastVisit = localStorage.getItem("lastVisit");

	if (!lastVisit) {
		message.textContent = "Welcome! Let us know if you have any questions.";
	} 
		
	else {
		const lastVisitDate = new Date(lastVisit);
		const diffTime = now - lastVisitDate;
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
		message.textContent = "Back so soon! Awesome!";
		} else if (diffDays === 1) {
			message.textContent = "You last visited 1 day ago.";
		} else {
		message.textContent = `You last visited ${diffDays} days ago.`;
		}
	}

	localStorage.setItem("lastVisit", now.toISOString());
}


//====================== Join Page ======================//

//Timestamp
if(window.location.pathname.indexOf('join.html') != -1){

	document.getElementById("timestamp").value = new Date().toISOString();
}

//Countdown
if(window.location.pathname.indexOf('thankyou.html') != -1){

	const counter = document.querySelector('#counter');

	function countdown() {
		let countdownElement = document.getElementById('countdown');
		let countdownValue = 10; 

		const countdownInterval = setInterval(() => {
		countdownValue--;
		countdownElement.textContent = countdownValue;

		if (countdownValue <= 0) {
				clearInterval(countdownInterval);
				window.location.href = 'index.html';
			}
		}, 1000);
	}
	countdown();
}

//====================== Directory Page ======================//

if(window.location.pathname.indexOf('directory.html') != -1){

	// JSON
	const url = 'https://viniciuserocca.github.io/wdd230/chamber/data/members.json';
	const container = document.querySelector('.container-directory');
	let count = 0;

	async function getMemberData() {
		const response = await fetch(url);
		const data = await response.json();
		displayMembers(data.companies);
	}

	const displayMembers = (members) => {
		members.forEach((member) => {
		let card = document.createElement('section');
		let name = document.createElement('h3');
		let address = document.createElement('p');
		let phone = document.createElement('p');
		let link = document.createElement('a');
		let logo = document.createElement('img');
		let membership = document.createElement('p');
	
		name.textContent = `${member.name}`;
		address.textContent = `${member.address}`;
		phone.textContent = `${member.phone}`;
		membership.textContent = `${member.membership}`;

		link.setAttribute('href', member.url);
		link.setAttribute('id', 'link');
		link.setAttribute('target', '_blank');
		link.textContent = `${member.url}`;

		logo.setAttribute('src', member.logo);
		logo.setAttribute('alt', `${member.name} Company Logo`);
		
		if (count == 0){ //the first image won't have lazy loading, to fix a performance issue
			count++;
		}
		else {
			logo.setAttribute('loading', 'lazy');
		}
		logo.setAttribute('width', '200');
		logo.setAttribute('height', '200');
		
		card.appendChild(logo);
		card.appendChild(name); 
		card.appendChild(address);
		card.appendChild(phone);
		card.appendChild(link);
		card.appendChild(membership);
		
		container.appendChild(card);
		});
	}
	
	getMemberData();

	// Layout
	const gridbutton = document.querySelector("#grid");
	const listbutton = document.querySelector("#list");
	const display = document.querySelector(".display");

	gridbutton.addEventListener("click", () => {
		display.classList.add("container-directory");
		display.classList.remove("list");

		gridbutton.classList.add("button-active");
		listbutton.classList.remove("button-active");
	});

	listbutton.addEventListener("click", () => {
		display.classList.add("list");
		display.classList.remove("container-directory");
		
		listbutton.classList.add("button-active");
		gridbutton.classList.remove("button-active");
	});

}