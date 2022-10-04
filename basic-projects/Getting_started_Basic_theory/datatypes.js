//   there are two major forms of data types in javascript:
//   1. primitive data types: 
//   -Number
let x=9.069;
//   -String
let y = "apple"
``  //back tick
//   -Boolean(T/f)
let isHoliday = true
//   -Null
let a = null;
//   -Undefined
let z;
console.log(typeof z)
//   -Symbol
let firstvalue = Symbol("apple"); //unique // same vae pani false dekhaucha
let secondValue = Symbol("apple");
console.log(firstValue === secondValue); // === checks value and datatype, == checks only value
//   -BigInt
     let num = 1n; //n-bigint
     let anotherNUmber = 1; //NOt a bigint but a number 
     console.log(num === anotherNUmber); //false because it checks datatype too

//   2. (non-primitive) reference data types:
//   -Object
let myObj = {
    firstname : "Aashutosh",
    age : 20,

}
//   -Array
let arr1 = ['string', 56,['another array'], null, undefined]


let arr = [1, 2, 3, 4, 5 ]
let arr2 = arr
arr2[1] = 'changed value'

console.log(arr)
console.log(arr2)


let array1 = [1, 2, 3, 4, 5 ]
let array2 = {...array1} //spread operator
array2[1] = 'changed value'

console.log(array1)
console.log(array2)

//fucntions
// types of function : parameterized function and non parameterized
// DRY principle

/* types of function in JS
  1. Function declaration -- hoisted
   2. Funtion expression -- might be hoisted if used var
    3. Arrow function --    ''    ''    ''   ''  ''  '' */

    // Function declaration
    function func1() {  // func1 is identifier

    }

    // fucntion expression -- function lai vcariable ma store garne
       let func2 = function() { 

       }

       // arrow function 
        let func3 = () => {
         
        }

function greet() {
 return 'Namaste';
}
console.log(greet());
greet();

function greeting() {
 let greetValue = 'Good Morning'
 console.log(greetValue);
}
greeting();


//function expression 
let greetOne = function () {
 return 'Hello';
}
console.log(greetOne());

//arrowfunction -- 
let greetTwo = () => {
 return 'Namaskar';
}
console.log(greetTwo())

let greetThree = () => 'Hello-1'
console.log(greetThree())

/////////////////////////////////////////////////////////////////////////////////////////////////////

function myAge(birthYear) { //parameter
 return 2022 - birthYear;
}
console.log(myAge(2000))  //pass an argument
console.log('Your age is '+ (myAge(2000)))

// same prog in arrow funciton
const yourAge = (yearofBirth) => 2022 - yearofBirth
console.log(yourAge(1950))


////////////////////////////////////////////////////////////////////////////////////////////////////////


function arithmeticOperatios(num1, num2){
 return `
     Sum is ${num1+num2}, 
     Diff is ${num1-num2}, 
     Mul is ${num1*num2}, 
     Div is ${num1/num2}, 
 `
}
console.log(arithmeticOperatios(7,2))

