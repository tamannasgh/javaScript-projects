//--------------------------------------------------------------
//Paddle Class//
export default class Paddle {
	constructor(paddle) {
		//paddle element
		this.paddle = paddle;
		//Reset paddle
		this.reset();
	}
	//Reset Function//
	reset() {
		this.positionX = 42;
	}
	//Get Paddle Rects Function//
	get rect() {
		return this.paddle.getBoundingClientRect();
	}
	//Get Paddle X Position Function//
	get positionX() {
		return parseFloat(
			getComputedStyle(this.paddle).getPropertyValue("--paddle-position")
		);
	}
	//Set Paddle X Position Function//
	set positionX(value) {
		this.paddle.style.setProperty("--paddle-position", value);
	}
}
//--------------------------------------------------------------
