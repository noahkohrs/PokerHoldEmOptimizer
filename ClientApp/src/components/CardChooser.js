import React, { Component } from "react";
import { Card } from "./Card.js";
import { Value, Suit } from "./ValueEnum.js";
import { MyHand } from "./MyHand";

export class CardChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      diamonds: [],
      hearts: [],
      spades: [],
    };

    // Fusion des boucles pour rendre le code plus propre.
    for (let i = 2; i < 15; i++) 
      this.state.clubs.push(new Card(Suit.CLUBS, i));
    for (let i = 2; i < 15; i++)
      this.state.diamonds.push(new Card(Suit.DIAMONDS, i));
    for (let i = 2; i < 15; i++)
      this.state.hearts.push(new Card(Suit.HEARTS, i));
    for (let i = 2; i < 15; i++)
      this.state.spades.push(new Card(Suit.SPADES, i));
  }

  handleCardClick(card) {
      this.props.onCardClick(card);
  }

  render() {
    return (
      <div className="card-chooser">
        {this.state.clubs.map(card => (
            <img 
              src={process.env.PUBLIC_URL + card.getImage()} 
              alt={`${card}`} 
              onClick={() => this.handleCardClick(card)}
              width="40"
              height="55"
              class="pointer"
            />
        ))}
        <br />
        {this.state.diamonds.map(card => (
            <img 
              src={process.env.PUBLIC_URL + card.getImage()} 
              alt={`${card}`} 
              onClick={() => this.handleCardClick(card)}
              width="40"
              height="55"
              class= "pointer"
            />
        ))}
        <br />
        {this.state.hearts.map(card => (
            <img 
              src={process.env.PUBLIC_URL + card.getImage()} 
              alt={`${card}`} 
              onClick={() => this.handleCardClick(card)}
              width="40"
              height="55"
              class = "pointer"
            />
        ))}
        <br />
        {this.state.spades.map(card => (
            <img 
              src={process.env.PUBLIC_URL + card.getImage()} 
              alt={`${card}`} 
              onClick={() => this.handleCardClick(card)}
              width="40"
              height="55"
              class="pointer"
            />
        ))}
      </div>
    );
  }
}
