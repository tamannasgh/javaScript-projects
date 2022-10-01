document.querySelector(".buttons")
    .addEventListener("click", (e) => {

        let countText = document.querySelector(".count");
        let btn = e.target;

        let count = Number(countText.textContent);  //or +countText.textContent

        if( btn.classList.contains("reset") ){
            count = 0;
        }

        else if( btn.classList.contains("increase") ){
            count = ++count;
        }

        else if( btn.classList.contains("decrease") ){
            count = --count;
        }

        countText.textContent = count;
    });
    