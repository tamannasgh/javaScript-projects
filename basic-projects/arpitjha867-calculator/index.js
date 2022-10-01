console.log('welcome')

let btn=document.getElementsByClassName(`btn`)
let screen=document.getElementById('screen')

console.log(btn)

let screenValue=""

for(let ele of btn){
    ele.addEventListener(`click`,(e)=>{
        let buttonText =e.target.innerText
        console.log(`button is `,buttonText)
        if(buttonText=='='){
            screen.value=eval(screenValue)
        }else if(buttonText=='C'){
            screenValue=""
            screen.value=screenValue
        }else{
            screenValue+=buttonText
            screen.value=screenValue
        }
        
    })
}



