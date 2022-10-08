function checklover(){
    let name = document.getElementById("name").value
    let lname = document.getElementById("lname").value

    if (name == ""){
        alert("Please enter your name")
    } else if (name.length <=2) {
        alert("Min length is 3")
    } else if (!isNaN(name)){
        alert("Numbers are not allowed")
    } else if(lname == ""){
        alert("Please enter your love name")
    } else if (lname.length <=2) {
        alert("Min length is 3")
    } else if (!isNaN(lname)){
        alert("Numbers are not allowed")
    } else {
        let lovedata = Math.random() * 100
        lovedata = Math.floor(lovedata)
        document.getElementById("lovescore").value = lovedata + "%"
    }
}

window.onload = function() {
    document.getElementById("my_audio").play();
}
