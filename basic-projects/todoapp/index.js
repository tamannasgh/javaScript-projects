//create element takes 3 arguments 
//1) type of html element
//2) properties/ configuration
//3)children

/* <h1> hello world</h1>

//element node = h1
// text node is children of h1 */

const h1element = React.createElement("h1",null, "Hello World");
console.log(h1element)