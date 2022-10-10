let btn = document.getElementById('some');
btn.addEventListener('click', get);

function get() {
    let url = 'https://api.adviceslip.com/advice';
    fetch(url).then((response) => {
        return response.text();
    }).then((data) => {
        let v = JSON.parse(data)
        let p = document.getElementById('advice');
        let str = '';
        str = `<h4>ADVICE #${v.slip.id}</h4>
                <p>${v.slip.advice}</p>`

        p.innerHTML = str;
    })
}

// let body = document.body;
// window.addEventListener('resize', f);

// function f() {
//     // if(body.style.width<='1300px')
//     // {
//     // }
//     console.log('resizing the window');

//     let w = document.documentElement.clientWidth;
//     if (w <= 1300) 
//     {
//         // console.log('<1300px');
//         let e = document.getElementById('icon');
//         e.style.width = '400px';
//         let e1 = document.getElementById('pause-icon');
//         e1.style.width = '333';
//     }

// }