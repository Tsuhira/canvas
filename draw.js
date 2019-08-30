function draw() {

    class Card {
        constructor(mark, number){
            this.mark = mark;
            this.number = number;
        }
    }

    class Deck {
		constructor(left, top, width, height) {
			this.left = left;
			this.top = top;
			this.width = width;
			this.height = height;

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

			this.flg_click = false;
		}

		onClick(x, y) {
			let a = x > this.left;
			let b = x < this.left + this.width;
			let c = y > this.top;
			let d = y < this.top + this.height;

			if (a && b && c && d) {
				this.flg_click = true;
			} else {
				this.flg_click = false;
			}   
		}

        drawCard() {
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

    let deck = new Deck(100, 50, 100, 100);

    function onClick(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

		deck.onClick(x, y);

		if (deck.flg_click) {
			drawDeck();
		}
    }

    function drawDeck() {
        let card = deck.drawCard();

        let text = card.mark + " " + card.number;
        context.fillStyle = "black";
        context.font = "15px MSゴシック";
        context.textAlign = "center";
        context.textBaseline = "center";
        context.clearRect(deck.left, deck.top, deck.width, deck.height);
        context.fillText(text, deck.left + deck.width / 2, deck.top + deck.height / 2);

        context.textAlign = "right";
        context.textBaseLine = "center"
        context.fillText(deck.cards.length, deck.left + deck.width, deck.top + 15);
    }

    canvas.addEventListener("click", onClick, false);

    context.beginPath();
    context.rect(deck.left, deck.top, deck.width, deck.height);
    context.stroke();
}
draw();