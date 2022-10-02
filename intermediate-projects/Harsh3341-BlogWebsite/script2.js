const Save = JSON.parse(localStorage.getItem("blogContent"));
const Posts = document.querySelector(".Posts");
const test = document.querySelector(".divRight");

const post = document.createElement("div");
post.classList.add("content");
post.innerHTML = `
 <h2>${Save.title}</h2>
 <p>${Save.description}</p>
 <button class="debtn">Delete</button>
`;

Posts.appendChild(post);

const deleteBtn = document.querySelectorAll(".debtn");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("blogContent");
    window.location.href = "home.html";
  });
});
