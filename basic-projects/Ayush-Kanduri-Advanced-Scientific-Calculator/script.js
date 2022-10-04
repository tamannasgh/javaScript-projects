var buttons = $("button");
var dot = 0;
var para = document.getElementsByTagName("p");
var operand1;
var operand2;
var operator = "";
var check = 0;
var temp = 0;
var toggle = "+";
var etoggle = "+";
var switching = 0;
const regex = new RegExp("^0");
var exponent = false;
var pi = 0;

//For ButtonClick Operation
buttons.on("click", function () {
	var value = this.getAttribute("data-value");
	//OPERATORS
	if (
		value == "+" ||
		value == "-" ||
		value == "*" ||
		value == "/" ||
		value == "%"
	) {
		pi = 0;
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			console.log(
				"Operand1 = " +
					operand1 +
					", Operand2 = " +
					operand2 +
					", Operator = " +
					operator
			);
			return;
		}
		if (exponent == true) {
			let splits = para[0].innerText.split("E");
			if (Number.isInteger(parseFloat(splits[1]))) {
				let result =
					parseFloat(splits[0]) * Math.pow(10, parseFloat(splits[1]));
				result = Number.isInteger(result) ? result : result.toFixed(4);
				console.log("Exponent = ", result);
				console.log(operator, operand1, operand2);
				if (operator != "") {
					operand2 = result;
					let result2 = eval(operand1 + " " + operator + " " + operand2);
					result2 = parseFloat(result2);
					result2 = Number.isInteger(result2)
						? result2
						: result2.toFixed(5);
					console.log(result2);
					operand1 = result2;
				} else {
					operand1 = result;
				}
				operator = value;
				console.log(operator, operand1, operand2);
				para[0].innerText = "";
				exponent = false;
				etoggle = "+";
				toggle = "+";
			} else {
				alert("Error: Not Allowed!!");
				return;
			}
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			console.log(
				"Operand1 = " +
					operand1 +
					", Operand2 = " +
					operand2 +
					", Operator = " +
					operator
			);
			return;
		} else if (check == 1) {
			switching = 1;
			operator = value;
			if ((operator == "/") & (operand2 == 0)) {
				alert("Cannot Divide by Zero !!");
				para[0].innerText = "";
				operand1 = 0;
				operand2 = 0;
				operator = "";
				check = 0;
				dot = 0;
				return;
			}
			para[0].innerText = "";
			dot = 0;
			console.log(
				"Operand1 = " +
					operand1 +
					", Operand2 = " +
					operand2 +
					", Operator = " +
					operator
			);
			check = 0;
		} else {
			switching = 1;
			if (para[0].innerText == "-0") {
				para[0].innerText == "0";
			}
			if (operator != "") {
				operand2 = parseFloat(para[0].innerText);
				if ((operator == "/") & (operand2 == 0)) {
					alert("Cannot Divide by Zero !!");
					para[0].innerText = "";
					operand1 = 0;
					operand2 = 0;
					operator = "";
					check = 0;
					dot = 0;
					return;
				}
				para[0].innerText = "";
				var result = eval(operand1 + " " + operator + " " + operand2);
				result = parseFloat(result);
				result = Number.isInteger(result) ? result : result.toFixed(5);
				console.log(result);
				operand1 = result;
				operator = value;
				console.log(
					"Operand1 = " +
						operand1 +
						", Operand2 = " +
						operand2 +
						", Operator = " +
						operator
				);
				dot = 0;
			} else {
				operator = value;
				operand1 = parseFloat(para[0].innerText);
				para[0].innerText = "";
				dot = 0;
				console.log(
					"Operand1 = " +
						operand1 +
						", Operand2 = " +
						operand2 +
						", Operator = " +
						operator
				);
			}
			toggle == "+";
		}
	}
	//SQUARE CALCULATION
	else if (value == "sqr") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (operator != "") {
				let result = Math.pow(parseFloat(para[0].innerText), 2);
				result = Number.isInteger(result) ? result : result.toFixed(5);
				console.log("Square = ", result);
				para[0].innerText = result;
				operand2 = result;
			} else {
				let result = Math.pow(parseFloat(para[0].innerText), 2);
				result = Number.isInteger(result) ? result : result.toFixed(5);
				console.log("Square = ", result);
				para[0].innerText = result;
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//CUBE CALCULATION
	else if (value == "cube") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.pow(parseFloat(para[0].innerText), 3);
			result = Number.isInteger(result) ? result : result.toFixed(5);
			console.log("Cube = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//ABSOLUTE CALCULATION
	else if (value == "abs") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (parseFloat(para[0].innerText) < 0) {
				if (operator != "") {
					let result = Math.abs(parseFloat(para[0].innerText));
					console.log("Absolute = ", result);
					para[0].innerText = result;
					operand2 = result;
				} else {
					let result = parseFloat(para[0].innerText) * -1;
					console.log("Absolute = ", result);
					para[0].innerText = result;
					operand1 = result;
				}
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//FACTORIAL CALCULATION
	else if (value == "fact") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let fact = 1;
			if (parseFloat(para[0].innerText) > 0) {
				// if(Math.floor(number) === number){}
				if (Number.isInteger(parseFloat(para[0].innerText))) {
					for (let i = 1; i <= parseFloat(para[0].innerText); i++) {
						fact *= i;
					}
					if (operator != "") {
						let result = fact * 1;
						console.log("Factorial = ", result);
						para[0].innerText = result;
						operand2 = result;
					} else {
						let result = fact * 1;
						console.log("Factorial = ", result);
						para[0].innerText = result;
						operand1 = result;
					}
				} else {
					alert("Only Positive Integers allowed !!");
					return;
				}
			} else if (parseFloat(para[0].innerText) == 0) {
				if (operator != "") {
					let result = 1;
					console.log("Factorial = ", result);
					para[0].innerText = result;
					operand2 = result;
				} else {
					let result = 1;
					console.log("Factorial = ", result);
					para[0].innerText = result;
					operand1 = result;
				}
			} else {
				alert("Only Positive Integers allowed !!");
				return;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// 10 RAISED TO POWER (n)
	else if (value == "10-raised-to-power(n)") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.pow(10, parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("10-raised-to-power(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// SQUARE ROOT (n)
	else if (value == "sqrt") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (
				parseFloat(para[0].innerText) == 0 ||
				parseFloat(para[0].innerText) > 0
			) {
				let result = Math.sqrt(parseFloat(para[0].innerText));
				result = Number.isInteger(result) ? result : result.toFixed(7);
				console.log("Square Root(n) = ", result);
				para[0].innerText = result;
				if (operator != "") {
					operand2 = result;
				} else {
					operand1 = result;
				}
			} else {
				alert("Invalid Square Root !!");
				return;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// CUBE ROOT (n)
	else if (value == "cubert") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.cbrt(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("Cube Root(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// LN(n)
	else if (value == "ln") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (parseFloat(para[0].innerText) <= 0) {
			alert("INVALID");
			return;
		} else {
			let result = Math.log(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("ln(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// LOG10(n)
	else if (value == "log") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (parseFloat(para[0].innerText) <= 0) {
			alert("INVALID");
			return;
		} else {
			let result = Math.log10(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("log10(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// 1 DIVIDED BY (n)
	else if (value == "n-raised-to-power(-1)") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (parseFloat(para[0].innerText) != 0) {
				let result = Math.pow(parseFloat(para[0].innerText), -1);
				result = Number.isInteger(result) ? result : result.toFixed(7);
				console.log("1 Divided by (n) = ", result);
				para[0].innerText = result;
				if (operator != "") {
					operand2 = result;
				} else {
					operand1 = result;
				}
			} else {
				alert("Cannot Divide by Zero !!");
				return;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// EXPONENT
	else if (value == "exponent") {
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (parseFloat(para[0].innerText) == 0) {
				alert("Error : Not Allowed !!");
			} else {
				if (exponent == false) {
					para[0].innerText += "E";
					exponent = true;
				} else {
				}
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// SIN(n)
	else if (value == "sin") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.sin(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("Sin(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// COS(n)
	else if (value == "cos") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.cos(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("Cos(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	// TAN(n)
	else if (value == "tan") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			let result = Math.tan(parseFloat(para[0].innerText));
			result = Number.isInteger(result) ? result : result.toFixed(7);
			console.log("Tan(n) = ", result);
			para[0].innerText = result;
			if (operator != "") {
				operand2 = result;
			} else {
				operand1 = result;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//CLEAR SCREEN
	else if (value == "clear") {
		console.log("Clear Screen PRESSED");
		para[0].innerText = "";
		dot = 0;
		operand2 = 0;
		operand1 = 0;
		operator = "";
		temp = 0;
		check = 0;
		toggle = "+";
		etoggle = "+";
		exponent = false;
		switching = 0;
		pi = 0;
	}
	//NEGATION
	else if (value == "+/-") {
		if (exponent == true) {
			if (!para[0].innerText.endsWith("E")) {
				alert("Error: Not Allowed!!");
				etoggle = "+";
				return;
			} else {
				if (etoggle == "+") {
					para[0].innerText += "-";
					etoggle = "-";
					return;
				}
			}
		}
		if (switching == 1) {
			para[0].innerText = "-";
			toggle = "+";
		}
		if (para[0].innerText == "" && toggle == "+") {
			para[0].innerText = "-";
			toggle = "-";
			console.log("NEGATIVE INTEGER INCOMING");
		} else if (para[0].innerText == "-" && toggle == "-") {
			para[0].innerText = "";
			toggle = "+";
			console.log("POSITIVE INTEGER INCOMING");
		}
	}
	//DECIMAL POINT
	else if (value == ".") {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		let operand = value;
		if (para[0].innerText == "") {
			dot = 1;
			para[0].innerText = "0.";
		} else if (para[0].innerText == "+" || para[0].innerText == "-") {
			alert("NOT ALLOWED WITH +/-");
			return;
		} else if (para[0].innerText != "") {
			if (dot == 1) {
				return;
			} else {
				para[0].innerText += operand;
				dot = 1;
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//RESULT
	else if (value == "=") {
		pi = 0;
		if (exponent == true) {
			let splits = para[0].innerText.split("E");
			if (Number.isInteger(parseFloat(splits[1]))) {
				let result =
					parseFloat(splits[0]) * Math.pow(10, parseFloat(splits[1]));
				result = Number.isInteger(result) ? result : result.toFixed(4);
				console.log("Exponent = ", result);
				if (operator != "") {
					operand2 = result;
					let result2 = eval(operand1 + " " + operator + " " + operand2);
					result2 = parseFloat(result2);
					result2 = Number.isInteger(result2)
						? result2
						: result2.toFixed(5);
					console.log(result2);
					operand1 = result2;
				} else {
					operand1 = result;
				}
				para[0].innerText = operand1;
				exponent = false;
				etoggle = "+";
				return;
			} else {
				alert("Error: Not Allowed!!");
				return;
			}
		}
		if (para[0].innerText == "" || para[0].innerText == "-") {
			return;
		}
		if (operator == "" || operator == NaN || operator == undefined) {
			return;
		} else {
			operand2 = parseFloat(para[0].innerText);
			dot = 0;
			console.log(operand2);
			if (operator == "/") {
				if (operand2 == 0) {
					alert("Cannot Divide by Zero !!");
					para[0].innerText = "";
					operand1 = 0;
					operand2 = 0;
					operator = "";
					check = 0;
					dot = 0;
					return;
				}
			}
			var result = eval(operand1 + " " + operator + " " + operand2);
			result = parseFloat(result);
			result = Number.isInteger(result) ? result : result.toFixed(2);
			para[0].innerText = result;
			operator = "";
			operand1 = result;
			console.log(
				"Operand1 = " +
					operand1 +
					", Operand2 = " +
					operand2 +
					", Operator = " +
					operator
			);
			check = 1;
		}
		toggle = "+";
		exponent = false;
		etoggle = "+";
		switching = 0;
	}
	//DIGITS
	else {
		if ((value == "pi") & (pi == 0)) {
			value = "3.141";
			pi = 1;
		} else if ((value == "pi") & (pi == 1)) {
			return;
		}
		if (check == 1) {
			check = 0;
			operand1 = 0;
			operand2 = 0;
			operator = "";
			para[0].innerText = "";
			dot = 0;
		}
		let operand = value;
		if (para[0].innerText == "-") {
			if (operand == "0") {
				para[0].innerText = "-0";
				return;
			} else {
				para[0].innerText = "";
				para[0].innerText += -1 * parseFloat(operand);
			}
		} else {
			para[0].innerText += operand;
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
});

//For KeyDown Operation
$(document).keydown(function (event) {
	var key = event.keyCode;
	//CLEAR SCREEN (ESC or <==)
	if (key == 27 || key == 8) {
		console.log("Clear Screen PRESSED");
		para[0].innerText = "";
		dot = 0;
		operand2 = 0;
		operand1 = 0;
		operator = "";
		check = 0;
		temp = 0;
		toggle = "+";
		etoggle = "+";
		exponent = false;
		switching = 0;
		pi = 0;
	}
});

//For KeyPress Operation
$(document).keypress(function (event) {
	var key = event.keyCode;
	// EXPONENT e
	if (key == 101) {
		if (para[0].innerText == "") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (para[0].innerText == "-") {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else {
			if (parseFloat(para[0].innerText) == 0) {
				alert("Error : Not Allowed !!");
			} else {
				if (exponent == false) {
					para[0].innerText += "E";
					exponent = true;
				}
			}
		}
		console.log(
			"Operand1 = " +
				operand1 +
				", Operand2 = " +
				operand2 +
				", Operator = " +
				operator
		);
	}
	//DIGITS (1 2 3 4 5 6 7 8 9 0)
	else if ((key >= 48 && key <= 57) || key == 112) {
		let operand = String.fromCharCode(key);
		if ((operand == "p") & (pi == 0)) {
			operand = 3.141;
			pi = 1;
		} else if ((operand == "p") & (pi == 1)) {
			return;
		}
		if (check == 1) {
			check = 0;
			operand1 = 0;
			operand2 = 0;
			operator = "";
			para[0].innerText = "";
			dot = 0;
		}
		if (operand2 == "ERROR") {
			if (String.fromCharCode(key) == 0) {
				alert("ERROR");
				para[0].innerText = "";
				operand1 = 0;
				operand2 = 0;
				operator = "";
				check = 0;
				dot = 0;
				return;
			}
		}
		if (para[0].innerText == "-") {
			if (operand == 0) {
				para[0].innerText = "-0";
				return;
			} else {
				para[0].innerText = "";
				para[0].innerText += -1 * parseFloat(operand);
			}
		} else {
			para[0].innerText += operand;
		}
		console.log(operand, "PRESSED");
	}
	//OPERATORS 42* 43+ 45- 47/ 37%
	else if (key == 43 || key == 45 || key == 42 || key == 47 || key == 37) {
		pi = 0;
		if ((exponent == true) & (key == 45)) {
			if (para[0].innerText.endsWith(".")) {
				alert("Error: Not Allowed!!");
				etoggle = "+";
				return;
			} else if (para[0].innerText.endsWith("-")) {
				alert("Error: Not Allowed!!");
				etoggle = "+";
				return;
			} else if (!para[0].innerText.endsWith("E")) {
			} else if (para[0].innerText.endsWith("E")) {
				if (etoggle == "+") {
					para[0].innerText += "-";
					etoggle = "-";
					return;
				}
			} else {
			}
		}
		if (para[0].innerText == "" && key == 45 && toggle == "+") {
			para[0].innerText = "-";
			toggle = "-";
			console.log("NEGATIVE INTEGER INCOMING");
		} else if (
			para[0].innerText == "-" &&
			(key == 45 || key == 43) &&
			toggle == "-"
		) {
			para[0].innerText = "";
			toggle = "+";
			console.log("POSITIVE INTEGER INCOMING");
		} else if (exponent == true) {
			let splits = para[0].innerText.split("E");
			if (Number.isInteger(parseFloat(splits[1]))) {
				let result =
					parseFloat(splits[0]) * Math.pow(10, parseFloat(splits[1]));
				result = Number.isInteger(result) ? result : result.toFixed(4);
				console.log("Exponent = ", result);
				console.log(operator, operand1, operand2);
				if (operator != "") {
					operand2 = result;
					let result2 = eval(operand1 + " " + operator + " " + operand2);
					result2 = parseFloat(result2);
					result2 = Number.isInteger(result2)
						? result2
						: result2.toFixed(5);
					console.log(result2);
					operand1 = result2;
				} else {
					operand1 = result;
				}
				operator = String.fromCharCode(key);
				console.log(operator, operand1, operand2);
				para[0].innerText = "";
				exponent = false;
				etoggle = "+";
				toggle = "+";
			} else {
				alert("Error: Not Allowed!!");
				return;
			}
		} else if (
			para[0].innerText == "" &&
			(key == 43 || key == 42 || key == 47 || key == 37)
		) {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (
			para[0].innerText == "-" &&
			(key == 42 || key == 47 || key == 37)
		) {
			alert("NOT ALLOWED WITHOUT OPERAND");
			return;
		} else if (check == 1) {
			switching = 1;
			operator = String.fromCharCode(key);
			if ((operator == "/") & (operand2 == 0)) {
				alert("Cannot Divide by Zero !!");
				para[0].innerText = "";
				operand1 = 0;
				operand2 = 0;
				operator = "";
				check = 0;
				dot = 0;
				return;
			}
			para[0].innerText = "";
			dot = 0;
			console.log(operator, "PRESSED", ", Operand1 = ", operand1);
			check = 0;
		} else {
			switching = 1;
			if (para[0].innerText == "-0") {
				para[0].innerText == "0";
			}
			if (operator != "") {
				operand2 = parseFloat(para[0].innerText);
				if ((operator == "/") & (operand2 == 0)) {
					alert("Cannot Divide by Zero !!");
					para[0].innerText = "";
					operand1 = 0;
					operand2 = 0;
					operator = "";
					check = 0;
					dot = 0;
					return;
				}
				para[0].innerText = "";
				var result = eval(operand1 + " " + operator + " " + operand2);
				result = parseFloat(result);
				result = Number.isInteger(result) ? result : result.toFixed(5);
				console.log(result);
				operand1 = result;
				operator = String.fromCharCode(key);
				console.log(
					"Operand1 = " +
						operand1 +
						", Operand2 = " +
						operand2 +
						", Operator = " +
						operator
				);
				dot = 0;
			} else {
				operator = String.fromCharCode(key);
				operand1 = parseFloat(para[0].innerText);
				para[0].innerText = "";
				dot = 0;
				console.log(operator, "PRESSED", ", Operand1 = ", operand1);
			}
			toggle == "+";
		}
	}
	//DECIMAL POINT
	else if (key == 46) {
		if (exponent == true) {
			alert("Error: Not Allowed!!");
			return;
		}
		let operand = String.fromCharCode(key);
		if (para[0].innerText == "" && key == 46) {
			dot = 1;
			para[0].innerText = "0.";
		} else if (para[0].innerText == "+" || para[0].innerText == "-") {
			alert("NOT ALLOWED WITH +/-");
			return;
		} else if (para[0].innerText != "") {
			if (dot == 1) {
				return;
			} else {
				para[0].innerText += operand;
				dot = 1;
			}
		}
		console.log(operand, "PRESSED");
	}
	//RESULT
	else if (key == 13 || key == 10) {
		pi = 0;
		if (exponent == true) {
			let splits = para[0].innerText.split("E");
			if (Number.isInteger(parseFloat(splits[1]))) {
				let result =
					parseFloat(splits[0]) * Math.pow(10, parseFloat(splits[1]));
				result = Number.isInteger(result) ? result : result.toFixed(4);
				console.log("Exponent = ", result);
				if (operator != "") {
					operand2 = result;
					let result2 = eval(operand1 + " " + operator + " " + operand2);
					result2 = parseFloat(result2);
					result2 = Number.isInteger(result2)
						? result2
						: result2.toFixed(5);
					console.log(result2);
					operand1 = result2;
				} else {
					operand1 = result;
				}
				para[0].innerText = operand1;
				exponent = false;
				etoggle = "+";
				return;
			} else {
				alert("Error: Not Allowed!!");
				return;
			}
		}
		if (para[0].innerText == "" || para[0].innerText == "-") {
			return;
		}
		if (operator == "" || operator == NaN || operator == undefined) {
			return;
		} else {
			operand2 = parseFloat(para[0].innerText);
			dot = 0;
			console.log(operand2);
			if (operator == "/") {
				if (operand2 == 0) {
					alert("Cannot Divide by Zero !!");
					para[0].innerText = "";
					operand1 = 0;
					operand2 = 0;
					operator = "";
					check = 0;
					dot = 0;
					return;
				}
			}
			var result = eval(operand1 + " " + operator + " " + operand2);
			result = parseFloat(result);
			result = Number.isInteger(result) ? result : result.toFixed(2);
			para[0].innerText = result;
			operator = "";
			operand1 = result;
			console.log(
				"=",
				"PRESSED",
				", Operand2 = ",
				operand2,
				", RESULT = ",
				result
			);
			check = 1;
		}
		toggle = "+";
		exponent = false;
		etoggle = "+";
		switching = 0;
	}
	//INVALID CHARACTERS
	else {
		alert(
			"THIS CHARACTER IS NOT ALLOWED !!! Characters Allowed Are: +, -, *, /, %, 1-9, enter, escape, backspace, =, ."
		);
		return;
	}
});
