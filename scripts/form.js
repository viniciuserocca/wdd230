const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("range");

range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".wf1");
  const password1 = document.getElementById("pssword1");
  const password2 = document.getElementById("pssword2");

  function validatePasswords() {
      if (password1.value !== password2.value && password2.value.length > 0) {
          password2.style.borderRight = "solid 8px var(--color-red)";
      } else {
          password2.style.borderRight = "solid 8px var(--color-green)";
      }
  }

  password2.addEventListener("input", validatePasswords);

  form.addEventListener("submit", function (event) {
      if (password1.value !== password2.value) {
          event.preventDefault();
          alert("Passwords don't match! Please try again.");
          password1.value = "";
          password2.value = "";
          password2.style.borderRight = "none";
          password1.focus();
      }
  });
});
