function draw() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    const deck_left = 100;
    const deck_top = 50;
    const deck_width = 100;
    const deck_height = 100;

    function onClick(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let a = x > deck_left;
        let b = x < deck_left + deck_width;
        let c = y > deck_top;
        let d = y < deck_top + deck_height;

        if (a && b && c && d) {
            drawDeck();
        }        
    }

    function drawDeck() {
        let index = Math.round(Math.random() * 52);
        let mark = function(mark) {
            switch(mark){
            case 0:
                return "spade"
            case 1:
                return "club"
            case 2:
                return "diamond"
            case 3:
                return "heart"
            default:
                return "joker"
            };
        }(parseInt(index / 13));
        let number = index % 13 + 1;

        let text = mark + " " + number;
        context.fillStyle = "black";
        context.font = "15px MSゴシック";
        context.textAlign = "center";
        context.textBaseline = "center";
        context.clearRect(deck_left, deck_top, deck_width, deck_height);
        context.fillText(text, deck_left + deck_width / 2, deck_top + deck_height / 2);
    }

    canvas.addEventListener("click", onClick, false);

    context.beginPath();
    context.rect(deck_left, deck_top, deck_width, deck_height);
    context.stroke();
}
draw();