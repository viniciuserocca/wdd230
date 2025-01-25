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

	//====================== LocalStorage ======================//

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