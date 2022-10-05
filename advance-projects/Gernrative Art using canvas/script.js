window.onload = () => {
 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");
 
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 const drawTree = (startX,startY,len,angle,branchWidth,color1,color2) =>
 {
     ctx.beginPath();
     ctx.save();
     ctx.strokeStyle = color1;
     ctx.fillStyle = color2;
     ctx.lineWidth = branchWidth;
     ctx.translate(startX,startY);
     ctx.rotate(angle * Math.PI/180)
     ctx.moveTo(0,0);
     ctx.lineTo(0,-len);
     ctx.stroke();
     
     
     if(len > 10)
     {
         ctx.restore();
         return
     }
     
     
     
     drawTree(0,-len * 0.75,angle + 5,branchWidth);
     
     drawTree(0,-len * 0.75,angle - 5,branchWidth);
     
     ctx.restore()
     
 }
 
 drawTree(canvas.width/2,canvas.height -80,120,2,2,'brown','green')

}
