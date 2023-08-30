import React, { Component } from "react";
import { Card } from "../models/Card";
import { Value, Suit } from "../models/CardEnum";
import { MyHand } from "../models/MyHand.js";

export class CardChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      diamonds: [],
      hearts: [],
      spades: [],
    };

    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];

    for (let suitKey of suits) {
      for (let i = 2; i < 15; i++) {
        this.state[suitKey].push(new Card(Suit[suitKey.toUpperCase()], i));
      }
    }
  }

  handleCardClick(card) {
      this.props.onCardClick(card);
  }

  renderASuit(suit) {
    return (
      <>
        {this.state[suit].map(card => (
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
      </>
    );
  }
  render() {
    return (
      <div className="card-chooser">
        <div className="card-chooser-suit">{this.renderASuit("clubs")}</div>
        <div className="card-chooser-suit">{this.renderASuit("diamonds")}</div>
        <div className="card-chooser-suit">{this.renderASuit("hearts")}</div>
        <div className="card-chooser-suit">{this.renderASuit("spades")}</div>
      </div>
    );
  }
}
