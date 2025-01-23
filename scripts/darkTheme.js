const themeBtn = document.querySelector("#themeBtn");
const main = document.querySelector("main");
const section2 = document.querySelector(".section2");

themeBtn.addEventListener("click", () => {
	main.classList.toggle('dark');
	section2.classList.toggle('dark');
});
