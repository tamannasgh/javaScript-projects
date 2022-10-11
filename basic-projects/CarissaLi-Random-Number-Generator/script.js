const pickNumber = document.querySelector('.randomize');
const showNumber = document.querySelector('.show-number');
const clearNumbers = document.querySelector('.clear');

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function pickNum() {
	
	if (numbers.length < 1) {
		showNumber.innerHTML = 'All done!';
		showNumber.classList.add('done');
	} else {
		let item = numbers[Math.floor(Math.random()*numbers.length)];
		let index = numbers.indexOf(item);
 
		if (index > -1) {
		   numbers.splice(index, 1);
		}
		
		showNumber.innerHTML = item;
	}
}

function reset() {
	numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	
	showNumber.innerHTML = '';
	showNumber.classList.remove('done');
}

pickNumber.addEventListener('click', pickNum);
clearNumbers.addEventListener('click', reset);