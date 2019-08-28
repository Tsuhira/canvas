function mouseover_out2() {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");

	let targetFlag = false;

	let w = canvas.width;
	let h = canvas.height;

	class MouseOverBox {
		constructor(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.targetFlag = false;

			this.drawRect();
		}

		updateTargetFlag(e) {
			let rect = e.target.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			let a = x > this.x;
			let b = x < this.x + this.width;
			let c = y > this.y;
			let d = y < this.y + this.height;

			this.targetFlag = a && b && c & d;
		}

		onMouseMove(e) {
			this.updateTargetFlag(e);

			if (this.targetFlag) {
				this.over();
			} else {
				this.out();
			}
		}

		throttle(targetFunc, time) {
			let _time = time || 100;
			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				targetFunc();
			}, _time);
		}

		out() {
			drawRect();
		}

		over() {
			drawRectIsHover();
		}

		drawRect(color) {
			let _col = color || 'black';
			context.fillStyle = _col;
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	
		drawRectIsHover() {
			drawRect("blue");
		}
	}

	let box1 = new MouseOverBox(25, 100, 100, 100);
	let box2 = new MouseOverBox(175, 100, 100, 100);
}

mouseover_out2();
