function mouseover_out() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    function onMouseOver() {
        draw();
    }

    function onMouseOut() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw(){
        let text = "Mouse Over";
        context.fillStyle = "black";
        context.font = "30px MSゴシック";
        context.textAlign = "center";
        context.textBaseline = "center";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    canvas.addEventListener("mouseover", onMouseOver, false);
    canvas.addEventListener("mouseout", onMouseOut, false);
}

mouseover_out();