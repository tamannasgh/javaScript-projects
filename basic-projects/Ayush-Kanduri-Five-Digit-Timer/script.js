var countInterval;

function startCounter() {
	var number = parseInt(document.getElementById("number").value);

	if (isNaN(number)) {
		alert("Please enter a number");
		clearInterval(countInterval);
		return;
	}
	if (number < 1 || number > 99999) {
		alert("Range out of bounds");
		clearInterval(countInterval);
		return;
	}

	var currentNos = document.querySelectorAll(".counter .current");
	var nextNos = document.querySelectorAll(".counter .next");
	var count = 0;

	resetNumbers(currentNos, nextNos, 5);

	clearInterval(countInterval);

	countInterval = setInterval(function () {
		if (count === number) {
			clearInterval(countInterval);
			alert("Counter has stopped");
			return;
		}
		increaseCount(currentNos, nextNos, 4);
		count++;
	}, 1000);
}

function resetNumbers(currentNos, nextNos, end) {
	for (let i = 0; i < end; ++i) {
		currentNos[i].innerText = 0;
		nextNos[i].innerText = 1;
	}
}

function increaseCount(currentNos, nextNos, index) {
	let current = currentNos[index];
	let next = nextNos[index];

	if (current.innerText == 9) {
		increaseCount(currentNos, nextNos, index - 1);
	}

	next.classList.add("animate");

	setTimeout(function () {
		current.innerText = next.innerText;
		next.classList.remove("animate");
		next.innerText = parseInt(next.innerText) + 1;
		if (next.innerText > 9) {
			next.innerText = 0;
		}
	}, 500);
}
