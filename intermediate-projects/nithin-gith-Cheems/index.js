input = document.querySelector('.input')
output = document.querySelector('.output')

input.addEventListener('click',()=>{
    input.value=""
})

input.addEventListener("keyup", function(e) {
    text = input.value.toLowerCase().split(' ')
    if(text!="")document.querySelector('.after').innerHTML=""
    for (i = 0; i < text.length; i++) {
        if(text[i].length<=3)continue;
        for(j =0;j<text[i].length;j++){
            if(isVowel(text[i][j])){
                if(j==text[i].length-1)continue;
                if( isVowel(text[i][j+1])||text[i][j+1]=='m')continue;
                text[i]=setchar(text[i],j+1,'m')
                break;
            }
        }
    }
    output.innerHTML = text.join(' ')
})

function setchar(string,index,char){
    return string.substring(0,index)+char+string.substring(index)
}

function isVowel(char){
    return char=='a'||char=='e'||char=='i'||char=='o'||char=='u'
}

button = document.querySelector('.btn')
button.onclick = function(){
    var copy= document.querySelector('.output').innerHTML
    if(copy==""){
        document.querySelector('.after').innerHTML="<h1>CHEEMS is amgry!!!, tmype some temxt</h1>"
        return
    }
    navigator.clipboard.writeText(copy);

    document.querySelector('.after').innerHTML="<h6>COMPIED TO CLIMPBOARD!!!</h6>"
    document.querySelector('.after-image').style.display = "block"
    setTimeout(()=>{
        document.querySelector('.after-image').style.display = "none"
        document.querySelector('.after').innerHTML=""
    },2000)  
}


