const visitsDisplay = document.querySelector(".visits");
let count = Number(window.localStorage.getItem("pageVisits-ls")) || 0;

if (count !== 0) {
	visitsDisplay.textContent = count;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
    count++;
}

count++;

localStorage.setItem("pageVisits-ls", count);


