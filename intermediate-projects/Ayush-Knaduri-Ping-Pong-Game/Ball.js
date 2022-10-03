const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;

//--------------------------------------------------------------
//Random Number Generator Function//
let randomNumberGenerator = (max, min) => {
	return Math.random() * (max - min) + min;
};
//--------------------------------------------------------------
//Ball Class//
export default class Ball {
	constructor(ball) {
		//Ball element
		this.ball = ball;
		//Game OFF in the beginning
		this.GAME_ON = false;
		//Reset everything in the beginning
		this.reset();
	}
	//Get Ball X Position Function//
	get positionX() {
		return parseFloat(
			getComputedStyle(this.ball).getPropertyValue("--ball-x-position")
		);
	}
	//Set Ball X Position Function//
	set positionX(value) {
		this.ball.style.setProperty("--ball-x-position", value);
	}
	//Get Ball Y Position Function//
	get positionY() {
		return parseFloat(
			getComputedStyle(this.ball).getPropertyValue("--ball-y-position")
		);
	}
	//Set Ball Y Position Function//
	set positionY(value) {
		this.ball.style.setProperty("--ball-y-position", value);
	}
	//Get Ball Rects Function//
	get rect() {
		return this.ball.getBoundingClientRect();
	}
	//Move the Ball Function//
	move() {
		/*To ensure that the ball reaches to the extreme points in horizontal and vertical view, we have |x| <= 0.2 && |x| >= 0.9, so that it stays in the range of 0 & 1 for sin cos and have extreme positions as well for the ball to move.*/
		while (
			Math.abs(this.direction.x) <= 0.2 ||
			Math.abs(this.direction.x) >= 0.9
		) {
			const angle = randomNumberGenerator(0, 2 * Math.PI);
			//Resolution of Vectors & Trignometric Ratios for the direction
			this.direction = { x: Math.cos(angle), y: Math.sin(angle) };
		}
		this.velocity = INITIAL_VELOCITY;
	}
	//Get Score Function//
	get score() {
		return "";
	}
	//Set Score Function//
	set score(value) {
		this.paddleTopScoreElement = value[0];
		this.paddleBottomScoreElement = value[1];
	}
	//Reset Function//
	reset() {
		this.positionX = 50;
		this.positionY = 50;
		this.GAME_ON = false;
		this.direction = { x: 0, y: 0 };
		this.move();
		this.paddleTopScore = 0;
		this.paddleBottomScore = 0;
	}
	//Check Collision Function//
	isCollision = (paddleRect, ballRect) => {
		//Ball Mid Position
		const midPos = (ballRect.left + ballRect.right) / 2;
		//If ball strikes paddle
		if (
			paddleRect.left <= midPos &&
			paddleRect.right >= midPos &&
			paddleRect.top <= ballRect.bottom &&
			paddleRect.bottom >= ballRect.top
		) {
			//If top paddle
			if (paddleRect.top < 50) {
				this.paddleTopScore += 100;
				this.paddleTopScoreElement.innerText = this.paddleTopScore;
				return true;
			}
			//If bottom paddle
			else {
				this.paddleBottomScore += 100;
				this.paddleBottomScoreElement.innerText = this.paddleBottomScore;
				return true;
			}
		}
	};
	//Update Ball Animation Frame Function//
	updateAnimationFrame(delta, paddleRects) {
		//Resolution of Vectors => X_velocity_vector = |X_velocity|.cosA => velocity * X_direction
		//Delta makes the animation frame smooth with negligible gaps
		//Increase velocity at every delta animation frame
		this.positionX += this.velocity * this.direction.x * delta;
		this.positionY += this.velocity * this.direction.y * delta;
		this.velocity += VELOCITY_INCREASE * delta;
		//Bounce the Ball on walls and paddles
		const ballRect = this.rect;
		if (ballRect.right >= window.innerWidth || ballRect.left <= 0) {
			this.direction.x *= -1;
		}
		if (
			paddleRects.some((paddleRect) =>
				this.isCollision(paddleRect, ballRect)
			)
		) {
			this.direction.y *= -1;
		}
	}
}
//--------------------------------------------------------------
