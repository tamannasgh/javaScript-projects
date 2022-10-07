function formatMoney(value){
    console.log(value);
    value=Math.ceil(value*100)/100;
    console.log(value);
    value=value.toFixed(2);
    return "$"+value;
}
function formatSplit(value){
    if(value==1)
    return value+" person";
    return value+" people";
}
function update(){
    // console.log("function called");
    let bill =Number(document.getElementById("yourBill").value);
    let tipPercent =document.getElementById("tipInput").value;
    let split =document.getElementById("splitInput").value;

    console.log({bill,tipPercent,split});

    let tipValue=bill*(tipPercent/100);
    let tipEach=tipValue/split;
    let newbillEach=(bill+tipValue)/split;
    //  console.log(typeof bill);
    // console.log(newbillEach);

    document.getElementById("tipPercent").innerHTML=tipPercent+"%";
    document.getElementById("tipValue").innerHTML=formatMoney(tipValue);
    document.getElementById("totalWithTip").innerHTML=formatMoney(bill+tipValue);
    document.getElementById("splitValue").innerHTML=formatSplit(split);
    document.getElementById("billEach").innerHTML=formatMoney(newbillEach);
    document.getElementById("tipEach").innerHTML=formatMoney(tipEach);
    

}
let container=document.getElementById("container");
    container.addEventListener('input',update);

    