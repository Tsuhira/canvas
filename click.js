function click() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    let x = 0;
    let y = 0;

    function onClick(e) {
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.fillRect(x, y, 10, 10);
    }

    canvas.addEventListener("dblclick", onClick, false);
}

click();