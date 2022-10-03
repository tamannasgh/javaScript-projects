import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ballElement = document.getElementById("ball");
const paddleTopElement = document.getElementsByClassName("paddle")[0];
const paddleBottomElement = document.getElementsByClassName("paddle")[1];
const paddleTopScoreElement = document.getElementById("rod1");
const paddleBottomScoreElement = document.getElementById("rod2");
const ball = new Ball(ballElement);
const paddleTop = new Paddle(paddleTopElement);
const paddleBottom = new Paddle(paddleBottomElement);

ball.score = [paddleTopScoreElement, paddleBottomScoreElement];

let maxScore;
let maxRod;
let whoWon = "";
let windowHeight = window.innerHeight;
let score = 0;

//--------------------------------------------------------------
//Welcome Function//
(function () {
	maxScore = localStorage.getItem("maxScore");
	maxRod = localStorage.getItem("maxRod");
	if (maxRod === null || maxScore === null) {
		alert(
			"This is the first time you are playing this game.\nLET'S START !!!"
		);
		maxScore = 0;
		maxRod = "Rod 1";
		return;
	} else {
		alert(`${maxRod} has maximum score of ${maxScore}`);
		return;
	}
})();
//--------------------------------------------------------------
//Animation Update Function//
/*There are lags in between the frames. Request animation checks for whenever there's a change in the animation on the screen and runs.*/
/*setInterval((time) => {
update(time)
}, 10);*/

//currentTime is how much time has passed till now. At what time we are now.
// previousTime is the last moment of time before the change in the animation frame.
// delta is the time frame between the last frame and the new frame.
//--------------------------------------------------------------
//Animation Update Function//
let previousTime;
let clearFrame,
	clearFrame2,
	animation = true;
let updateAnimationFrame = (currentTime) => {
	if (previousTime != null) {
		//Δ Negligible amount of Time
		const delta = currentTime - previousTime;
		//Calling another animation function in Ball with Delta for variation & paddles for the collision
		ball.updateAnimationFrame(delta, [paddleTop.rect, paddleBottom.rect]);
		//Hue variation wrt Delta
		const hue = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue("--hue")
		);
		document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
		// If Lost the match?
		if (lost()) {
			//Game is OFF
			ball.GAME_ON = false;
			//Stop Animation
			animation = false;
		} else {
			//Continue Game
			ball.GAME_ON = true;
			//Continue Animation
			animation = true;
		}
	}
	//If animation is over?
	if (!animation) {
		//Cancel the animation frame
		window.cancelAnimationFrame(clearFrame);
		//End the Match
		matchEnds();
		console.log("clearFrame1: ", clearFrame);
		//Fetch Local Stoarge
		const localScore = localStorage.getItem("maxScore");
		const localRod = localStorage.getItem("maxRod");
		alert(
			`${whoWon} wins with a score of ${score}\nMax Score is: ${localScore} by ${localRod}`
		);
	} else {
		//Current Time will become Previous Time, so that the time moves forward
		previousTime = currentTime;
		//Fetching clearframe ID & start the animation loop
		clearFrame = window.requestAnimationFrame(updateAnimationFrame);
		console.log("RUNNING....");
	}
};
//--------------------------------------------------------------
//Match Lost Deciding Function//
let lost = () => {
	const ballRect = ball.rect;
	//Ball goes beyond bottom
	if (ballRect.bottom >= windowHeight) {
		whoWon = "Rod 1";
		ball.paddleTopScore += 100;
	}
	//Ball goes beyond top
	else if (ballRect.top <= 0) {
		whoWon = "Rod 2";
		ball.paddleBottomScore += 100;
	}
	return ballRect.bottom >= windowHeight || ballRect.top <= 0;
};
//--------------------------------------------------------------
//Local Storage Function//
let storeScore = (maxScore, score, whoWon) => {
	if (maxScore < score) {
		maxScore = score;
		maxRod = whoWon;
		//Storing in Local Storage
		localStorage.setItem("maxScore", maxScore);
		localStorage.setItem("maxRod", maxRod);
		console.log(maxScore, score, whoWon);
	}
};
//--------------------------------------------------------------
//Handling the Match Lose Function//
let matchEnds = () => {
	maxScore = localStorage.getItem("maxScore");
	if (maxScore === null) {
		maxScore = 0;
	}
	if (whoWon === "Rod 1") {
		score = ball.paddleTopScore;
	} else if (whoWon === "Rod 2") {
		score = ball.paddleBottomScore;
	}
	//Store the score and reset everything else
	storeScore(maxScore, score, whoWon);
	ball.reset();
	paddleTop.reset();
	paddleBottom.reset();
	ball.paddleTopScoreElement.innerText = 0;
	ball.paddleBottomScoreElement.innerText = 0;
};
//--------------------------------------------------------------
// D A ENTER - Keypress Events//
window.addEventListener("keypress", (event) => {
	let paddlePositionX = paddleTop.positionX;
	//Move the Paddle Right
	if (event.keyCode === 100 && paddlePositionX < 86) {
		paddleTop.positionX = paddlePositionX + 2;
		paddleBottom.positionX = paddlePositionX + 2;
	}
	//Move the Paddle Left
	else if (event.keyCode === 97 && paddlePositionX > 0) {
		paddleTop.positionX = paddlePositionX - 2;
		paddleBottom.positionX = paddlePositionX - 2;
	}
	//Start the Game & Move the Ball
	else if (event.keyCode === 13 && ball.GAME_ON === false) {
		//Clear the Initial Animation Frame
		window.cancelAnimationFrame(clearFrame2);
		console.log("clearFrame2: ", clearFrame2);
		//Game ON
		ball.GAME_ON = true;
		//Previous Time is null, so that the animation loop starts from the very first beginning as it has only the current time at the start
		previousTime = null;
		//Animation ON
		animation = true;
		//Reset everything else
		ball.reset();
		paddleTop.reset();
		paddleBottom.reset();
		paddleTopScoreElement.innerText = 0;
		paddleBottomScoreElement.innerText = 0;
		//Fetching clearframe ID & start the animation loop
		clearFrame2 = window.requestAnimationFrame(updateAnimationFrame);
	}
});
//--------------------------------------------------------------
// <== ==> - Keydown Events//
window.addEventListener("keydown", (event) => {
	let paddlePositionX = paddleTop.positionX;
	//Move the Paddle Right
	if (event.keyCode === 39 && paddlePositionX < 86) {
		paddleTop.positionX = paddlePositionX + 2;
		paddleBottom.positionX = paddlePositionX + 2;
	}
	//Move the Paddle Left
	else if (event.keyCode === 37 && paddlePositionX > 0) {
		paddleTop.positionX = paddlePositionX - 2;
		paddleBottom.positionX = paddlePositionX - 2;
	}
});
//--------------------------------------------------------------
