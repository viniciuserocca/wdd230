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


// Discover Page
if(window.location.pathname.indexOf('discover.html') != -1){

	//====================== Calendar ======================//

	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth();

	function createCalendar(year, month) {
	const calendarDiv = document.querySelector(".calendar");
	calendarDiv.innerHTML = ""; // Clear existing content

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const date = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayIndex = date.getDay();

	// Display current month and year
	document.getElementById("currentMonthYear").textContent = 
		`${date.toLocaleString("default", { month: "long" })} ${year}`;

	// Add day headers
	daysOfWeek.forEach(day => {
		const dayHeader = document.createElement("div");
		dayHeader.textContent = day;
		dayHeader.classList.add("day");
		calendarDiv.appendChild(dayHeader);
	});

	// Add empty days for alignment
	for (let i = 0; i < firstDayIndex; i++) {
		const emptyDiv = document.createElement("div");
		emptyDiv.classList.add("day");
		calendarDiv.appendChild(emptyDiv);
	}

	// Add days of the month
	for (let day = 1; day <= daysInMonth; day++) {
		const dayDiv = document.createElement("div");
		dayDiv.textContent = day;
		dayDiv.classList.add("day");
		calendarDiv.appendChild(dayDiv);
	}
	}

	// Add event listeners for navigation buttons
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

	// Initialize calendar
	createCalendar(currentYear, currentMonth);

	

	const message = document.querySelector(".display-message");

	// Get the current date and time
	const now = new Date();

	// Get the last visit date from localStorage
	const lastVisit = localStorage.getItem("lastVisit");

	if (!lastVisit) {
		// First-time visit
		message.textContent = "Welcome! Let us know if you have any questions.";
	} 
		
	else {
		// Calculate the time difference in milliseconds
		const lastVisitDate = new Date(lastVisit);
		const diffTime = now - lastVisitDate;
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
		// Less than a day
		message.textContent = "Back so soon! Awesome!";
		} else if (diffDays === 1) {
			// Exactly one day
			message.textContent = "You last visited 1 day ago.";
		} else {
		// More than one day
		message.textContent = `You last visited ${diffDays} days ago.`;
		}
	}

	// Store the current visit date in localStorage
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

	const url = '';
	const container = document.querySelector('.container-directory');

	async function getMemberData() {
		const response = await fetch(url);
		const data = await response.json();
		displayMembers(data);
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
	
		fullName.textContent = `${prophet.name} ${prophet.lastname}`;

		portrait.setAttribute('src', prophet.imageurl);
		portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
		portrait.setAttribute('loading', 'lazy');
		portrait.setAttribute('width', '340');
		portrait.setAttribute('height', '440');
	
		card.appendChild(name); 
		card.appendChild(address);
		card.appendChild(phone);
		card.appendChild(link);
		card.appendChild(logo);
		card.appendChild(membership);
		
		container.appendChild(card);
		});
	}
	
	getMemberData();

}