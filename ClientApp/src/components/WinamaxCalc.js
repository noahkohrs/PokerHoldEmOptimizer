import React, { Component } from 'react';
import { Card } from './Card.js';
import { Value, Suit } from './ValueEnum.js';



export class WinamaxCalc extends Component {
  static displayName = WinamaxCalc.name;
  card = new Card(Suit.CLUBS, Value.TWO);
  render() {
    return (
      <div>
        <h1>WinamaxCalc</h1>
         {/* Button that is also the image at  assets\cards\2_of_clubs.png with a small relative size*/}
        <button type="button" class="btn btn-primary">
          <img src={process.env.PUBLIC_URL + this.card.getImage()} alt={process.env.PUBLIC_URL} width="58" height="80" />
        </button>
        </div>
    );
  }
}
