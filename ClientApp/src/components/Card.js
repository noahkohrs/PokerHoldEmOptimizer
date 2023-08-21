export class Card {
    suit;
    value;
    imageRef;
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imageRef = this.getImageRef();
    }
    getImageRef(suit, value) {
        return "../assets/cards/" + this.value + "_of_" + this.suit + ".png";
    }
    getImage() {
        return this.imageRef;
    }

}