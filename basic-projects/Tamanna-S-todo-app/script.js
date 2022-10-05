const form = document.querySelector("form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const input = e.target[0];  //input
    console.log(input.value);
    if(input.value.trim() === ""){
        console.log("please add a real todo");
        return;
    }

    const ul = document.querySelector("ul");

    const li = document.createElement("li");

    li.innerHTML = 
    `<input type="checkbox" name="done">
    <span>${input.value}</span>
    <i class="fa fa-trash-o delete"></i>`;

    ul.append(li);
    input.value = "";

});

const list = document.querySelector("ul");

list.addEventListener("click", (e) => {
    console.dir(e.target);

    if( e.target.name === "done"){
        console.log("checked");

        const task = e.target.nextElementSibling;
        console.log(task);       
        task.style.textDecoration = task.style.textDecoration === "line-through" ? "none" : "line-through";

    }

    if( e.target.classList.contains("delete") ){
        console.log("delete");
        const li = e.target.parentElement;
        li.remove();
    }

});


