const inputs = document.querySelectorAll("input");
console.log(inputs);

inputs.forEach( input => input.addEventListener("input", handler));

function handler(e){
    
    let prefix;
    if(this.name === "--color") prefix = "";
    else if(this.name === "--radius") prefix = "px";
    else prefix = "%";

    document.documentElement.style.setProperty(this.name, this.value + prefix);
}
