document.addEventListener("keydown", (e) => {
    const audio = document.querySelector(`audio[data-key="${e.key.toLowerCase()}"`)

    if(!audio) return;

    audio.currentTime = 0;
    audio.play();

    const div = document.querySelector(`div[data-key="${e.key.toLowerCase()}"]`)
    div.classList.add("playing");
});

let keys = document.querySelectorAll(".key");

keys.forEach( key => key.addEventListener("transitionend", (e) => {
    if(e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
}))
