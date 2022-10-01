const notes = JSON.parse(localStorage.getItem("notes"));

const Title = document.getElementById("title_area");
const Content = document.getElementById("content_area");
const addBtn = document.getElementById("add_btn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const note = document.createElement("div");

  note.innerHTML = `
    <div class="note">
        <h3>${Title.value}</h3><br>
        <p>${Content.value}</p>
        <button class="delete_btn">Delete</button>
    </div>
    `;

  const deleteBtn = note.querySelector(".delete_btn");
  deleteBtn.addEventListener("click", () => {
    note.remove();
  });
  const data = {
    id: Date.now(),
    title: Title.value,
    content: Content.value,
  };

  const notes = [];
  notes.push(data);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.body.appendChild(note);
  Title.value = "";
  Content.value = "";
});
