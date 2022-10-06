function getRandomColor(){
    const randomColor =  `rgb(${ getRandomNumInRange(255) }, ${ getRandomNumInRange(255) }, ${ getRandomNumInRange(255) })`;

    return randomColor;
}

function getRandomNumInRange(start, end){
    if(arguments.length === 1){
        end = start;
        start = 1;
    }
    const randomNum = Math.floor( Math.random() * (end - start) + start);

    return randomNum;
}


document.querySelector("button")
    .addEventListener("click", (e) => {
        const randomColor = getRandomColor();

        const body = document.body;
        body.style.backgroundColor = randomColor;

        const colorText = document.querySelector("span");
        colorText.textContent = randomColor;
        
    });