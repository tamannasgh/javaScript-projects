function createHex() {
    var hexCode1 = "";
    var hexValues1 = "0123456789abcdef";
    for (var i = 0; i < 6; i++) {
        hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
    }
    return hexCode1;
}
function generate() {
    var deg = Math.floor(Math.random() * 360);
    var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() + ")";
    document.getElementById("output").innerHTML = gradient;
    document.getElementById("bg").style.background = gradient;
    console.log(hexCode1, hexCode2);
}
document.onload = generate();