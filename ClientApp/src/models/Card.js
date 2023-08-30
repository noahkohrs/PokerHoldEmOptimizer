export class Card {
  suit;
  value;
  imageRef;
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.imageRef = this.getImageRef();
  }
  getImageRef() {
    
    // If the card is not in enum, return the place holder image
    if (this.suit == null || this.value == null) {
        return "assets/cards/place_holder.png";
    }
    var suit ;
    switch (this.suit) {
        case 0:
            suit = "clubs";
            break;
        case 1:
            suit = "diamonds";
            break;
        case 2:
            suit = "hearts";
            break;
        case 3:
            suit = "spades";
            break;
        default:
            return "assets/cards/place_holder.png";
    }
    if (this.value > 14 || this.value < 2) {
        return "assets/cards/place_holder.png";
    }
    if (this.value < 11)
        return "assets/cards/" + this.value + "_of_" + suit + ".png";

    switch (this.value) {
        case 11:
            return "assets/cards/jack_of_" + suit + ".png";
        case 12:
            return "assets/cards/queen_of_" + suit + ".png";
        case 13:
            return "assets/cards/king_of_" + suit + ".png";
        case 14:
            return "assets/cards/ace_of_" + suit + ".png";
        default:
            return "assets/cards/place_holder.png";
    }
  }
  getImage() {
    return this.imageRef;
  }

  equals(card) {
    return this.suit === card.suit && this.value === card.value;
  }
}
