function draw() {

    class Card {
        constructor(mark, number){
            this.mark = mark;
            this.number = number;
        }
    }

    class Deck {
        constructor() {
            this.cards = Array(52);
            for (let i = 0; i < 52; i++) {
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
                }(parseInt(i / 13));
                let number = i % 13 + 1;

                this.cards[i] = new Card(mark, number);
            }
        }

        draw() {
            if (this.cards.length == 0)
                return new Card("joker", "0");
            let index = parseInt(Math.random() * this.cards.length);
            let drawn_card = this.cards[index];
            this.cards.splice(index, 1);
            return drawn_card;
        }
    }

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    const deck_left = 100;
    const deck_top = 50;
    const deck_width = 100;
    const deck_height = 100;

    let deck = new Deck();

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
        let card = deck.draw();

        let text = card.mark + " " + card.number;
        context.fillStyle = "black";
        context.font = "15px MSゴシック";
        context.textAlign = "center";
        context.textBaseline = "center";
        context.clearRect(deck_left, deck_top, deck_width, deck_height);
        context.fillText(text, deck_left + deck_width / 2, deck_top + deck_height / 2);

        context.textAlign = "right";
        context.textBaseLine = "center"
        context.fillText(deck.cards.length, deck_left + deck_width, deck_top + 15);
    }

    canvas.addEventListener("click", onClick, false);

    context.beginPath();
    context.rect(deck_left, deck_top, deck_width, deck_height);
    context.stroke();
}
draw();