import React, { Component } from 'react';
import { Card } from './Card.js';
import { Value, Suit } from './ValueEnum.js';
import { MyHand } from './MyHand'



export class Hand extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      myHand: props.choosenHand 
    };
  }

  render() {
    return (
      <div>
        <button type="button" class="btn">
          <img src={process.env.PUBLIC_URL + this.state.myHand.card1.getImage()} alt={this.state.myHand.card1.getImage()} width="90" height="120" />
        </button>
        <button type="button" class="btn">
          <img src={process.env.PUBLIC_URL + this.state.myHand.card2.getImage()} alt={this.state.myHand.card2.getImage()} width="90" height="120" />
        </button>
        </div>
    );
  }
}
