function drawLoopSquare() {
    let canvas  = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let x = 0;

    function render() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.strokeRect(x, 0, 10, 10);

        if (x > canvas.width) {
            x = 0;
        } else {
            x += 1;
        }
    }
    setInterval(render, 100);
}
drawLoopSquare();
