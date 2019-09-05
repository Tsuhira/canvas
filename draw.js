function draw() {

    class Card {
        constructor(mark, number){
            this.mark = mark;
            this.number = number;
            this.left = null;
            this.top = null;
            this.initializePosition();
        }

        initializePosition(){
            let x, y;
            switch(this.mark){
            case "spade":
                x = 1;
                break;
            case "club":
                x = 3;
                break;
            case "diamond":
                x = 2;
                break;
            case "heart":
                x = 0;
                break;
            default:
                this.left = Card.joker_left;
                this.top = Card.joker_top;
                return;
            }

            if(this.number / 7 > 1)
                x += 4;

            y = (this.number - 1) % 7;

            this.left = x * Card.width;
            this.top = y * Card.height;
        }

        drawImage(left, top) {
            context.clearRect(left, top, Card.width, Card.height);
            context.drawImage(Card.sprite,
                                this.left, this.top, Card.width, Card.height,
                                left, top, Card.width, Card.height);
        }
    }
    Card.sprite = new Image();
    Card.sprite.src = "img/cards.png";
    Card.width = 60;
    Card.height = 90;
    Card.back_left = 420;
    Card.back_top = 540;
    Card.joker_left = 240;
    Card.joker_top = 540;

    class Deck {
		constructor(left, top) {
			this.left = left;
			this.top = top;
			this.width = Card.width;
			this.height = Card.height;

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

    let deck = new Deck(120, 50);

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

        card.drawImage(deck.left, deck.top);

        console.log(card.mark + " " + card.number);

        context.fillStyle = "black";
        context.font = "13px MSゴシック";
        context.textAlign = "right";
        context.textBaseLine = "center"
        context.fillText(deck.cards.length, deck.left + deck.width, deck.top + 13);
    }

    function initizalize() {
        canvas.addEventListener("click", onClick, false);

        context.drawImage(Card.sprite, 
                            Card.back_left, Card.back_top, 
                            Card.width, Card.height,
                            deck.left, deck.top,
                            deck.width, deck.height);
    }

    Card.sprite.onload = initizalize;
}
draw();