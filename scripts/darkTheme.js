const themeBtn = document.querySelector("#themeBtn");
const main = document.querySelector("main");

themeBtn.addEventListener("click", () => {
	main.classList.toggle('dark');
});
