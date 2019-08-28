function mousedown_up() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    function onMouseDown() {
        drawOn();
    }

    function onMouseUp() {
        drawOff();
    }

    function drawOn() {
        let text = "Mouse Down";
        context.fillStyle = "black";
        context.font = "30px MSゴシック";
        context.textAlign = "center";
        context.textBaseline = "center";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    function drawOff() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
}

mousedown_up();