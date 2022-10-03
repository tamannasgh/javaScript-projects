const $ = (s) => document.getElementById(s);
const but = $("button").style;
const main = $("main").style;
function setWhite() {
  but.zIndex = "1";
  main.backgroundColor = "#fff";
  main.color = "#000";
}
function setBlack() {
  but.zIndex = "100";
  main.backgroundColor = "#000";
  main.color = "#fff";
}
