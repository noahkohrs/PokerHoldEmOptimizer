import React, { Component } from 'react';
import { Card } from '../models/Card.js';

export class Hand extends Component {
  
  renderCard(card, cardKey) {
    return (
      <button type="button" className="btn" onClick={() => this.handleResetCard(cardKey)}>
        <img 
          src={process.env.PUBLIC_URL + card.getImage()} 
          alt={card.getImage()} 
          width="90" 
          height="120" 
        />
      </button>
    );
  }

  handleResetCard(cardKey) {
    this.props.choosenHand[cardKey] = new Card(0, 0);
    this.forceUpdate();  // To re-render the component and reflect the changes
  }

  render() {
    const { choosenHand } = this.props;

    return (
      <div>
        {this.renderCard(choosenHand.card1, 'card1')}
        {this.renderCard(choosenHand.card2, 'card2')}
      </div>
    );
  }
}
