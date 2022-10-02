const content = document.querySelectorAll(".form-control");
const button = document.querySelector("#btn");
const Save = JSON.parse(localStorage.getItem("blogContent"));

button.addEventListener("click", function (e) {
  e.preventDefault();

  const data = {
    title: content[0].value,
    description: content[1].value,
  };

  localStorage.setItem("blogContent", JSON.stringify(data));

  window.location.href = "home.html";
});
