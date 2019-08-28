function mouseover_out2() {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");

	let targetFlag = false;
	let rect = null;

	let w = canvas.width;
	let h = canvas.height;

	function onMouseOver(e) {
		rect = e.target.getBoundingClientRect();
		canvas.addEventListener("mousemove", onMouseMove, false);
	}

	function onMouseOut() {
		canvas.removeEventListener("mousemove", onMouseMove, false);
	}

	function onMouseMove(e) {
		moveActions.updateTargetFlag(e);

		if (targetFlag) {
			moveActions.throttle(moveActions.over, 50);
		} else {
			moveActions.throttle(moveActions.out, 50);
		}
	}

	let moveActions = {
		timer: null,
		updateTargetFlag: function(e) {
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			let a = (x > w / 2 - 50);
			let b = (x < w / 2 + 50);
			let c = (y > h / 2 - 50);
			let d = (y < h / 2 + 50);

			targetFlag = (a && b && c && d);
		},
		throttle: function(targetFunc, time) {
			let _time = time || 100;
			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				targetFunc();
			}, _time);
		},
		out: function() {
			drawRect();
		},
		over: function() {
			drawRectIsHover();
		}
	};

	function drawRect(color) {
		let _col = color || 'black';
		context.clearRect(0, 0, w, h);
		context.beginPath();
		context.fillStyle = _col;
		context.fillRect(w / 2 - 50, h / 2 - 50, 100, 100);
	}

	function drawRectIsHover() {
		drawRect("blue");
	}

	canvas.addEventListener("mouseover", onMouseOver, false);
	canvas.addEventListener("mouseout", onMouseOut, false);

	drawRect();
}

mouseover_out2();
