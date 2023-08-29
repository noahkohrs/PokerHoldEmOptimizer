
import { Card } from './Card.js';
import { Value, Suit } from './ValueEnum.js';

export class MyHand {
    constructor() {
        this.card1 = new Card(0, 0);
        this.card2 = new Card(0, 0);
        }
    reset() {
        this.card1 = new Card(0, 0);
        this.card2 = new Card(0, 0);
      }
    addCard(card) {
        if (this.card1.value === 0) {
            this.card1 = card;
        } else if (this.card2.value === 0) {
            this.card2 = card;
            return true ;
        } else 
        return this.card2 !== new Card(0,0);
    }
}

