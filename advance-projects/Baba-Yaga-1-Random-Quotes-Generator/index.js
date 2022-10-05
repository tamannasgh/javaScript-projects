let quotes = document.getElementById("quotes");
let writer = document.getElementById("writer");
let btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";

let getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      quotes.innerText = item.content;
      writer.innerText = item.author;
    });
};

window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);