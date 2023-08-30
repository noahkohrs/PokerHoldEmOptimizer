
import { Card } from './Card.js';
import { Value, Suit } from './CardEnum.js';

const DEFAULT_SUIT = Suit.CLUBS;
const DEFAULT_VALUE = 0;
export class MyHand {
    constructor() {
        this.reset();
        }
    reset() {
        this.card1 = new Card(DEFAULT_SUIT, DEFAULT_VALUE);
        this.card2 = new Card(DEFAULT_SUIT, DEFAULT_VALUE);
      }
    addCard(card) {
        if (this.card1.value === DEFAULT_VALUE) {
            this.card1 = card;
            return this.card2.value !== DEFAULT_VALUE;
        }
        else if (this.card2.value === DEFAULT_VALUE) {
            this.card2 = card;
            return true;
        }
        return false ;
    }
}

